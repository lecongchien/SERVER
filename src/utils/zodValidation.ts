// Utility để tạo Zod schema validation cho Fastify
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FastifyInstance } from 'fastify'

export type ZodFastifyInstance = FastifyInstance & {
  withTypeProvider: () => FastifyInstance & ZodTypeProvider
}

export const createZodValidation = (schema: any) => ({
  schema: {
    body: schema
  }
})

export const createZodParamsValidation = (schema: any) => ({
  schema: {
    params: schema
  }
})

export const createZodQueryValidation = (schema: any) => ({
  schema: {
    querystring: schema
  }
})

export const createZodBodyAndParamsValidation = (bodySchema: any, paramsSchema: any) => ({
  schema: {
    body: bodySchema,
    params: paramsSchema
  }
})

export const createZodParamsAndQueryValidation = (paramsSchema: any, querySchema: any) => ({
  schema: {
    params: paramsSchema,
    querystring: querySchema
  }
})
