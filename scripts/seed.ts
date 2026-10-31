/**
 * Fills a local database with sample data for UI work: `bun run db:seed`.
 *
 * Every seeded row hangs off a seeded user (ids start with `seed_`), so deleting those users
 * cascades to their products, ships, launches, tried-it rows and credits. Running it twice
 * starts from a clean slate instead of duplicating rows. Real rows are never touched.
 */
import { loadEnvConfig } from "@next/env";
import { eq, inArray, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../src/db/schema";

if (process.env.NODE_ENV === "production") {
  console.error("Refusing to seed: NODE_ENV is production.");
  process.exit(1);
}

loadEnvConfig(process.cwd());

// Same fallback as drizzle.config.ts (the Docker database).
const connectionString =
  process.env.DATABASE_URL_UNPOOLED ??
  process.env.DATABASE_URL ??
  "postgres://shipdaily:shipdaily@localhost:5432/shipdaily";

// .env.local often points at a hosted database (e.g. a Neon branch); don't fill it with fake users by accident.
const host = new URL(connectionString).hostname;
const isLocal = ["localhost", "127.0.0.1", "::1", "db"].includes(host);
if (!isLocal && process.env.SEED_ALLOW_REMOTE !== "1") {
  console.error(`Refusing to seed ${host}: not a local database. Set SEED_ALLOW_REMOTE=1 to seed it anyway.`);
  process.exit(1);
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const daysAgo = (n: number) => new Date(now - n * DAY);

// Deterministic pseudo-random numbers so every run produces the same graph.
let rngState = 42;
const rand = () => {
  rngState = (rngState * 1664525 + 1013904223) % 2 ** 32;
  return rngState / 2 ** 32;
};

function mondayOf(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

const USERS = [
  { handle: "ada", name: "Ada Okafor" },
  { handle: "lin", name: "Lin Wei" },
  { handle: "sam", name: "Sam Rivera" },
  { handle: "noor", name: "Noor Haddad" },
  { handle: "jules", name: "Jules Martin" },
  { handle: "kai", name: "Kai Tanaka" },
].map((u) => ({
  id: `seed_user_${u.handle}`,
  name: u.name,
  handle: `seed-${u.handle}`,
  email: `${u.handle}@seed.shipdaily.local`,
  emailVerified: true,
}));

const PRODUCTS = [
  { owner: "ada", slug: "inboxzero", name: "InboxZero", tagline: "Triage email in two minutes a day" },
  { owner: "lin", slug: "pagepulse", name: "PagePulse", tagline: "Uptime checks with a human-readable status page" },
  { owner: "sam", slug: "invoicely", name: "Invoicely", tagline: "Invoices freelancers actually enjoy sending" },
  { owner: "noor", slug: "snippetbox", name: "SnippetBox", tagline: "Searchable code snippets for your whole team" },
  { owner: "jules", slug: "habitloop", name: "HabitLoop", tagline: "A habit tracker that doesn't guilt-trip you" },
].map((p) => ({
  id: `seed_product_${p.slug}`,
  ownerId: `seed_user_${p.owner}`,
  slug: `seed-${p.slug}`,
  name: p.name,
  tagline: p.tagline,
  description: `${p.name} is sample data from the seed script.`,
  url: `https://example.com/${p.slug}`,
}));

const SHIP_TITLES = [
  "Faster onboarding",
  "Dark mode",
  "Fixed CSV export",
  "New pricing page",
  "Keyboard shortcuts",
  "Mobile layout polish",
  "Team invites",
  "Search is 3x faster",
];

async function clear() {
  const seededUsers = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(like(schema.user.id, "seed_%"));
  if (seededUsers.length > 0) {
    // Cascades to products, ships, launches, tried-it rows, credits and badges.
    await db.delete(schema.user).where(
      inArray(
        schema.user.id,
        seededUsers.map((u) => u.id),
      ),
    );
  }
  // Launch weeks don't belong to a user; remove the seeded one only if nothing else uses it.
  const seededWeeks = await db
    .select({ id: schema.launchWeek.id })
    .from(schema.launchWeek)
    .where(like(schema.launchWeek.id, "seed_%"));
  for (const week of seededWeeks) {
    const [inUse] = await db
      .select({ id: schema.launch.id })
      .from(schema.launch)
      .where(eq(schema.launch.launchWeekId, week.id))
      .limit(1);
    if (!inUse) await db.delete(schema.launchWeek).where(eq(schema.launchWeek.id, week.id));
  }
}

async function seed() {
  await db.insert(schema.user).values(USERS);
  await db.insert(schema.product).values(PRODUCTS);

  // Ships spread over the last year: busier products ship more often, a few majors in between.
  const ships: (typeof schema.ship.$inferInsert)[] = [];
  PRODUCTS.forEach((product, i) => {
    const count = 40 - i * 6;
    for (let n = 0; n < count; n++) {
      const shippedAt = daysAgo(Math.floor(rand() * 364));
      ships.push({
        id: `seed_ship_${product.slug}_${n}`,
        productId: product.id,
        authorId: product.ownerId,
        kind: rand() < 0.12 ? "major" : "update",
        title: SHIP_TITLES[Math.floor(rand() * SHIP_TITLES.length)],
        proofUrl: `${product.url}/changelog`,
        shippedAt,
      });
    }
    // The first launch, about a year ago.
    ships.push({
      id: `seed_ship_${product.slug}_launch`,
      productId: product.id,
      authorId: product.ownerId,
      kind: "launch",
      title: `${product.name} is live`,
      proofUrl: product.url,
      shippedAt: daysAgo(364 - i * 20),
    });
  });
  await db.insert(schema.ship).values(ships);

  // A live Launch Week for this week. Reuse a real one if it already exists.
  const startsOn = mondayOf(new Date(now));
  let [week] = await db
    .select({ id: schema.launchWeek.id })
    .from(schema.launchWeek)
    .where(eq(schema.launchWeek.startsOn, startsOn));
  if (!week) {
    [week] = await db
      .insert(schema.launchWeek)
      .values({ id: `seed_week_${startsOn}`, startsOn, status: "live" })
      .returning({ id: schema.launchWeek.id });
  }

  const launches = PRODUCTS.map((product, i) => ({
    id: `seed_launch_${product.slug}`,
    productId: product.id,
    launchWeekId: week.id,
    kind: i === 0 ? ("relaunch" as const) : ("launch" as const),
    status: "live" as const,
    shipId: i === 0 ? `seed_ship_${product.slug}_0` : null,
    creditsCharged: i === 0 ? 30 : 50,
  }));
  await db.insert(schema.launch).values(launches);

  // Every seeded user tries most launches except their own.
  const reactions = ["would_use", "would_pay", "confusing", "not_for_me"] as const;
  const triedIt: (typeof schema.triedIt.$inferInsert)[] = [];
  for (const launch of launches) {
    const ownerId = PRODUCTS.find((p) => p.id === launch.productId)!.ownerId;
    for (const user of USERS) {
      if (user.id === ownerId || rand() < 0.25) continue;
      const clickedAt = daysAgo(rand() * 3);
      triedIt.push({
        id: `seed_tried_${launch.id}_${user.id}`,
        launchId: launch.id,
        userId: user.id,
        clickedAt,
        reaction: reactions[Math.floor(rand() * reactions.length)],
        comment: "Signed up and poked around. Onboarding was clear, pricing page took a second to find.",
        submittedAt: new Date(clickedAt.getTime() + 5 * 60 * 1000),
        helpful: rand() < 0.3,
      });
    }
  }
  await db.insert(schema.triedIt).values(triedIt);

  // Ledger matching the activity above: badge, tries, helpful marks, launch spend.
  const credits: (typeof schema.creditTransaction.$inferInsert)[] = [];
  for (const user of USERS) {
    credits.push({ userId: user.id, amount: 25, reason: "badge", refId: user.id, createdAt: daysAgo(30) });
  }
  for (const t of triedIt) {
    credits.push({ userId: t.userId, amount: 10, reason: "tried_it", refId: t.id, createdAt: t.submittedAt! });
    if (t.helpful) {
      credits.push({ userId: t.userId, amount: 5, reason: "helpful", refId: t.id, createdAt: t.submittedAt! });
    }
  }
  for (const launch of launches) {
    const ownerId = PRODUCTS.find((p) => p.id === launch.productId)!.ownerId;
    credits.push({
      userId: ownerId,
      amount: -launch.creditsCharged,
      reason: launch.kind,
      refId: launch.id,
      createdAt: daysAgo(4),
    });
  }
  await db.insert(schema.creditTransaction).values(credits);

  await db
    .insert(schema.badgeVerification)
    .values(
      USERS.map((u) => ({
        userId: u.id,
        siteUrl: `https://example.com/${u.handle}`,
        status: "verified" as const,
        verifiedAt: daysAgo(30),
        lastCheckedAt: daysAgo(1),
      })),
    );

  return { users: USERS.length, products: PRODUCTS.length, ships: ships.length, triedIt: triedIt.length };
}

try {
  await clear();
  const counts = await seed();
  console.log(
    `Seeded ${counts.users} users, ${counts.products} products, ${counts.ships} ships, ` +
      `1 live Launch Week with ${counts.products} launches, ${counts.triedIt} tried-it reactions.`,
  );
  console.log(`Seeded users sign in by email: ${USERS.map((u) => u.email).join(", ")}`);
} finally {
  await pool.end();
}
