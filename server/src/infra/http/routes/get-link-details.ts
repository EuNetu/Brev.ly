import { LinkNotFoundError } from '@/app/errors/link-not-found-error'
import { getLink } from '@/app/functions/get-link'
import { trackVisit } from '@/app/functions/track-visit'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function getLinkDetailsRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/api/links/:code', // Usamos /api para diferenciar da rota de redirect
    {
      schema: {
        params: z.object({
          code: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string().url(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.params

      try {
        const link = await getLink({ code })

        if (!link) {
          throw new LinkNotFoundError()
        }

        await trackVisit({ linkId: link.id })

        return reply.send({ originalUrl: link.originalUrl })
      } catch (error) {
        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }
        throw error
      }
    },
  )
}