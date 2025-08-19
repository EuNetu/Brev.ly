CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"visit_count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "links_code_unique" UNIQUE("code")
);
