import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const getLinkInput = z.object({
  code: z.string(),
})

type GetLinkInput = z.input<typeof getLinkInput>

export async function getLink(input: GetLinkInput) {
  const { code } = getLinkInput.parse(input)

  const link = await db.query.links.findFirst({
    where: eq(links.code, code),
  })

  return link
}