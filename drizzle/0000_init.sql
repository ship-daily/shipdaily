CREATE TYPE "public"."badge_status" AS ENUM('pending', 'verified', 'removed');--> statement-breakpoint
CREATE TYPE "public"."credit_reason" AS ENUM('badge', 'badge_removed', 'tried_it', 'helpful', 'flag_penalty', 'referral', 'pro_monthly', 'launch', 'relaunch', 'refund');--> statement-breakpoint
CREATE TYPE "public"."launch_kind" AS ENUM('launch', 'relaunch');--> statement-breakpoint
CREATE TYPE "public"."launch_status" AS ENUM('queued', 'live', 'closed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."launch_week_status" AS ENUM('upcoming', 'live', 'closed');--> statement-breakpoint
CREATE TYPE "public"."reaction" AS ENUM('would_use', 'confusing', 'would_pay', 'not_for_me');--> statement-breakpoint
CREATE TYPE "public"."ship_kind" AS ENUM('update', 'major', 'launch');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "badge_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"site_url" text NOT NULL,
	"status" "badge_status" DEFAULT 'pending' NOT NULL,
	"verified_at" timestamp with time zone,
	"last_checked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "badge_verification_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "credit_transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"reason" "credit_reason" NOT NULL,
	"ref_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "launch" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"launch_week_id" text,
	"kind" "launch_kind" NOT NULL,
	"status" "launch_status" DEFAULT 'queued' NOT NULL,
	"ship_id" text,
	"credits_charged" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "launch_week" (
	"id" text PRIMARY KEY NOT NULL,
	"starts_on" date NOT NULL,
	"status" "launch_week_status" DEFAULT 'upcoming' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "launch_week_starts_on_unique" UNIQUE("starts_on")
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_id" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"logo_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "ship" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"author_id" text NOT NULL,
	"kind" "ship_kind" DEFAULT 'update' NOT NULL,
	"title" text NOT NULL,
	"body" text,
	"proof_url" text,
	"github_release_id" text,
	"shipped_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ship_github_release_id_unique" UNIQUE("github_release_id")
);
--> statement-breakpoint
CREATE TABLE "tried_it" (
	"id" text PRIMARY KEY NOT NULL,
	"launch_id" text NOT NULL,
	"user_id" text NOT NULL,
	"clicked_at" timestamp with time zone NOT NULL,
	"reaction" "reaction",
	"comment" text,
	"submitted_at" timestamp with time zone,
	"helpful" boolean DEFAULT false NOT NULL,
	"flagged" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"handle" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badge_verification" ADD CONSTRAINT "badge_verification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credit_transaction" ADD CONSTRAINT "credit_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch" ADD CONSTRAINT "launch_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch" ADD CONSTRAINT "launch_launch_week_id_launch_week_id_fk" FOREIGN KEY ("launch_week_id") REFERENCES "public"."launch_week"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "launch" ADD CONSTRAINT "launch_ship_id_ship_id_fk" FOREIGN KEY ("ship_id") REFERENCES "public"."ship"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ship" ADD CONSTRAINT "ship_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ship" ADD CONSTRAINT "ship_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tried_it" ADD CONSTRAINT "tried_it_launch_id_launch_id_fk" FOREIGN KEY ("launch_id") REFERENCES "public"."launch"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tried_it" ADD CONSTRAINT "tried_it_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "credit_transaction_user_id_idx" ON "credit_transaction" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "credit_transaction_reason_ref_idx" ON "credit_transaction" USING btree ("user_id","reason","ref_id");--> statement-breakpoint
CREATE UNIQUE INDEX "launch_product_week_idx" ON "launch" USING btree ("product_id","launch_week_id");--> statement-breakpoint
CREATE INDEX "launch_week_id_idx" ON "launch" USING btree ("launch_week_id");--> statement-breakpoint
CREATE INDEX "product_owner_id_idx" ON "product" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ship_product_shipped_at_idx" ON "ship" USING btree ("product_id","shipped_at");--> statement-breakpoint
CREATE INDEX "ship_author_shipped_at_idx" ON "ship" USING btree ("author_id","shipped_at");--> statement-breakpoint
CREATE UNIQUE INDEX "tried_it_launch_user_idx" ON "tried_it" USING btree ("launch_id","user_id");--> statement-breakpoint
CREATE INDEX "tried_it_user_id_idx" ON "tried_it" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");