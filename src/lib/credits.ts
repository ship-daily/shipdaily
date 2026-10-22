import "server-only";

import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { creditTransaction } from "@/db/schema";

/** Current credit balance: the sum of the user's ledger entries. */
export async function getBalance(userId: string): Promise<number> {
  const [row] = await getDb()
    .select({ balance: sql<number>`coalesce(sum(${creditTransaction.amount}), 0)::int` })
    .from(creditTransaction)
    .where(eq(creditTransaction.userId, userId));
  return row?.balance ?? 0;
}
