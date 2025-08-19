import { getLink } from '@/app/functions/get-link'
import { trackVisit } from '@/app/functions/track-visit'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function redirectRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:code',
    {
      schema: {
        params: z.object({
          code: z.string().min(3),
        }),
      },
    },
    async (request, reply) => {
      const { code } = request.params

      const link = await getLink({ code })

      if (!link) {
        return reply.status(404).send({ message: 'Link não encontrado.' })
      }

      // Executa o rastreamento da visita sem bloquear o redirecionamento
      trackVisit({ linkId: link.id }).catch((error) => {
        console.error(`Failed to track visit for link ${link.id}`, error)
      })

      return reply.redirect( link.originalUrl, 301)
    },
  )
}