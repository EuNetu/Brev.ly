import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const links = pgTable('links', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  code: text('code').notNull().unique(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  visitCount: integer('visit_count').default(0).notNull(),
})