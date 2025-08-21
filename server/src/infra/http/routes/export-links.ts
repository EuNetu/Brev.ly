import { exportLinks } from '@/app/functions/export-links'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function exportLinksRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/links/export',
    {
      schema: {
        response: {
          200: z.object({
            reportUrl: z.string().url(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { reportUrl } = await exportLinks()

        return reply.send({ reportUrl })
      } catch (error) {
        console.error(error)

        return reply.status(500).send({ message: 'Internal server error.' })
      }
    },
  )
}