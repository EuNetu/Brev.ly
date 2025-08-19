import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from '../errors/link-not-found-error'

const deleteLinkInput = z.object({
  linkId: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(input: DeleteLinkInput) {
  const { linkId } = deleteLinkInput.parse(input)

  const [link] = await db
    .delete(links)
    .where(eq(links.id, linkId))
    .returning()

  if (!link) {
    throw new LinkNotFoundError()
  }

  return link
}