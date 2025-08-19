import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const trackVisitInput = z.object({
  linkId: z.string(),
})

type TrackVisitInput = z.input<typeof trackVisitInput>

export async function trackVisit(input: TrackVisitInput) {
  const { linkId } = trackVisitInput.parse(input)

  await db
    .update(links)
    .set({
      visitCount: sql`${links.visitCount} + 1`,
    })
    .where(eq(links.id, linkId))
}