import { createLink } from '@/app/functions/create-link'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { LinkAlreadyExistsError } from '@/app/errors/link-already-exists-error'

export async function createLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/links',
    {
      schema: {
        body: z.object({
          code: z.string().min(3),
          url: z.string().url(),
        }),
        response: {
          201: z.object({
            linkId: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code, url } = request.body

      try {
        const { id } = await createLink({ code, url })

        return reply.status(201).send({ linkId: id })
      } catch (error) {
        if (error instanceof LinkAlreadyExistsError) {
          return reply.status(409).send({ message: error.message })
        }

        console.error(error)

        return reply.status(500).send({ message: 'Error interno do servidor.' })
      }
    },
  )
}