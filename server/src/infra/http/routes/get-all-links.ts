import { getAllLinks } from '@/app/functions/get-all-links'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getLinksRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/links',
    {
      schema: {
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                code: z.string(),
                originalUrl: z.string().url(),
                createdAt: z.date(),
                visitCount: z.number().int(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const links = await getAllLinks()

      return reply.send({ links })
    },
  )
}