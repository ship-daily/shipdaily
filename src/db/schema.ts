import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/* ------------------------------------------------------------------ */
/* Auth (Better Auth core schema)                                       */
/* ------------------------------------------------------------------ */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  // Public profile handle for /u/[handle]; chosen during onboarding.
  handle: text("handle").unique(),
  ...timestamps,
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
    scope: text("scope"),
    password: text("password"),
    ...timestamps,
  },
  (t) => [index("account_user_id_idx").on(t.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);

/* ------------------------------------------------------------------ */
/* Products and ships                                                   */
/* ------------------------------------------------------------------ */

export const product = pgTable(
  "product",
  {
    id: id(),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    tagline: text("tagline").notNull(),
    description: text("description"),
    url: text("url").notNull(),
    logoUrl: text("logo_url"),
    ...timestamps,
  },
  (t) => [index("product_owner_id_idx").on(t.ownerId)],
);

// A ship is one square on the ship graph. Weight comes from the kind:
// update = 1, major = 3, launch = first launch (special color).
export const shipKind = pgEnum("ship_kind", ["update", "major", "launch"]);

export const ship = pgTable(
  "ship",
  {
    id: id(),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    kind: shipKind("kind").notNull().default("update"),
    title: text("title").notNull(),
    body: text("body"),
    // Screenshot, video or link proving the ship. Required by the app, nullable for GitHub-synced ships.
    proofUrl: text("proof_url"),
    githubReleaseId: text("github_release_id").unique(),
    shippedAt: timestamp("shipped_at", { withTimezone: true }).notNull().defaultNow(),
    ...timestamps,
  },
  (t) => [
    index("ship_product_shipped_at_idx").on(t.productId, t.shippedAt),
    index("ship_author_shipped_at_idx").on(t.authorId, t.shippedAt),
  ],
);

/* ------------------------------------------------------------------ */
/* Launch Weeks                                                         */
/* ------------------------------------------------------------------ */

export const launchWeekStatus = pgEnum("launch_week_status", ["upcoming", "live", "closed"]);

export const launchWeek = pgTable("launch_week", {
  id: id(),
  // Always a Monday.
  startsOn: date("starts_on").notNull().unique(),
  status: launchWeekStatus("status").notNull().default("upcoming"),
  ...timestamps,
});

export const launchKind = pgEnum("launch_kind", ["launch", "relaunch"]);
export const launchStatus = pgEnum("launch_status", ["queued", "live", "closed", "refunded"]);

export const launch = pgTable(
  "launch",
  {
    id: id(),
    productId: text("product_id")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    // Null while queued and waiting for a cohort with room.
    launchWeekId: text("launch_week_id").references(() => launchWeek.id),
    kind: launchKind("kind").notNull(),
    status: launchStatus("status").notNull().default("queued"),
    // The ship that describes what's new (required for relaunches).
    shipId: text("ship_id").references(() => ship.id),
    // Credits are charged only when the launch is placed in a cohort.
    creditsCharged: integer("credits_charged").notNull().default(0),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("launch_product_week_idx").on(t.productId, t.launchWeekId),
    index("launch_week_id_idx").on(t.launchWeekId),
  ],
);

/* ------------------------------------------------------------------ */
/* "Tried it" feedback                                                  */
/* ------------------------------------------------------------------ */

export const reaction = pgEnum("reaction", ["would_use", "confusing", "would_pay", "not_for_me"]);

export const triedIt = pgTable(
  "tried_it",
  {
    id: id(),
    launchId: text("launch_id")
      .notNull()
      .references(() => launch.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // Set when the tester clicks through to the product; used for the minimum-time check.
    clickedAt: timestamp("clicked_at", { withTimezone: true }).notNull(),
    reaction: reaction("reaction"),
    comment: text("comment"),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    helpful: boolean("helpful").notNull().default(false),
    flagged: boolean("flagged").notNull().default(false),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("tried_it_launch_user_idx").on(t.launchId, t.userId),
    index("tried_it_user_id_idx").on(t.userId),
  ],
);

/* ------------------------------------------------------------------ */
/* Credits                                                              */
/* ------------------------------------------------------------------ */

// Append-only ledger; a user's balance is the sum of their transactions.
export const creditReason = pgEnum("credit_reason", [
  "badge",
  "badge_removed",
  "tried_it",
  "helpful",
  "flag_penalty",
  "referral",
  "pro_monthly",
  "launch",
  "relaunch",
  "refund",
]);

export const creditTransaction = pgTable(
  "credit_transaction",
  {
    id: id(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    // Positive = earned, negative = spent or penalized.
    amount: integer("amount").notNull(),
    reason: creditReason("reason").notNull(),
    // Id of the related row (launch, tried_it, …), for auditing and idempotency.
    refId: text("ref_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("credit_transaction_user_id_idx").on(t.userId),
    uniqueIndex("credit_transaction_reason_ref_idx").on(t.userId, t.reason, t.refId),
  ],
);

export const badgeStatus = pgEnum("badge_status", ["pending", "verified", "removed"]);

export const badgeVerification = pgTable("badge_verification", {
  id: id(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),
  siteUrl: text("site_url").notNull(),
  status: badgeStatus("status").notNull().default("pending"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  ...timestamps,
});
