// Deve ser o primeiro import: registra a instrumentação antes do resto da app.
import './otel'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { uploadImageRoute } from './routes/upload-image'
import { fastifyMultipart } from '@fastify/multipart'
import { healthCheckRoute } from './routes/health-check'

const server = fastify()

server.register(fastifyCors, {
  origin: '*',
})

server.register(fastifyMultipart)
server.register(uploadImageRoute)
server.register(healthCheckRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})