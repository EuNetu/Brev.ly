import { LinkNotFoundError } from '@/app/errors/link-not-found-error'
import { deleteLink } from '@/app/functions/delete-link'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function deleteLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/links/:linkId',
    {
      schema: {
        params: z.object({
          linkId: z.string(),
        }),
        response: {
          204: z.null(),
          404: z.object({
              message: z.string(),
          }),
          500: z.object({
              message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { linkId } = request.params

      try {
        await deleteLink({ linkId })

        return reply.status(204).send()
      } catch (error) {
        if (error instanceof LinkNotFoundError) {
          return reply.status(404).send({ message: error.message })
        }

        console.error(error)

        return reply.status(500).send({ message: 'Internal server error.' })
      }
    },
  )
}