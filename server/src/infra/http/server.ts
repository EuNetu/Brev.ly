import fastify from 'fastify'

const app = fastify()

app.get('/testando', () => {
  return { status: 'ok' }
})

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('server rodando na porta http://localhost:3333')
  })