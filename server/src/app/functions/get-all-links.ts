import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas'
import { desc } from 'drizzle-orm'

export async function getAllLinks() {
  const allLinks = await db.select().from(links).orderBy(desc(links.createdAt))

  return allLinks
}