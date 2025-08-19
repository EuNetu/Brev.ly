import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkAlreadyExistsError } from '../errors/link-already-exists-error'

const createLinkInput = z.object({
  code: z.string().min(3),
  url: z.string().url(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(input: CreateLinkInput) {
  const { code, url } = createLinkInput.parse(input)

  const linkWithSameCode = await db.query.links.findFirst({
    where: eq(links.code, code),
  })

  if (linkWithSameCode) {
    throw new LinkAlreadyExistsError()
  }

  const [link] = await db
    .insert(links)
    .values({
      code,
      originalUrl: url,
    })
    .returning({
      id: links.id,
    })

  return link
}