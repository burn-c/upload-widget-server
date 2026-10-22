import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { FastifyInstance } from 'fastify'
import { log } from '../infra/logger'

const packageJsonPath = resolve(process.cwd(), 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { version?: string }

const API_VERSION = packageJson.version

export async function healthCheckRoute(app: FastifyInstance) {
  app.get('/health', async (_request, reply) => {
    log.info(
      {
        status: 'healthy',
        apiVersion: API_VERSION,
        hash: 'ifmsid89famfa89sjdfj29rm390awef90ajwerq03e9r0j',
      },
      'Acessei a rota e deu certo',
    )

    await reply.status(200).send({
      status: 'healthy',
      apiVersion: API_VERSION,
      timestamp: new Date().toISOString(),
      hash: 'ifmsid89famfa89sjdfj29rm390awef90ajwerq03e9r0j'
    })
  })
}
