import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { deleteLinkRoute } from './routes/delete-link'
import { getLinksRoute } from './routes/get-all-links'
import { redirectRoute } from './routes/redirect'
import { exportLinksRoute } from './routes/export-links'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Rotas específicas
app.register(createLinkRoute)
app.register(getLinksRoute)
app.register(deleteLinkRoute)
app.register(exportLinksRoute)

// Rota genérica
app.register(redirectRoute)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })