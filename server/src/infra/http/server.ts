import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createLinkRoute } from './routes/create-link'
import { redirectRoute } from './routes/redirect'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Rotas específicas primeiro
app.register(createLinkRoute)

// Rota genérica de redirecionamento por último
app.register(redirectRoute)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })