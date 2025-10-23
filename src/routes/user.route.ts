// Route cho nghiệp vụ user social app dùng Fastify
import { FastifyInstance } from 'fastify'
import { register, login, getProfile, followUser, unfollowUser, searchUsers } from '../controllers/user.controller'
import { registerSchema, loginSchema, userParamsSchema, searchUsersSchema } from '../schemaValidations/user.schema'

export default async function userRoutes(fastify: FastifyInstance) {
  // Đăng ký
  fastify.post('/register', async (request, reply) => {
    try {
      const validatedBody = registerSchema.parse(request.body)
      request.body = validatedBody
      return await register(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Đăng nhập
  fastify.post('/login', async (request, reply) => {
    try {
      const validatedBody = loginSchema.parse(request.body)
      request.body = validatedBody
      return await login(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Lấy thông tin user
  fastify.get('/users/:userId', async (request, reply) => {
    try {
      const validatedParams = userParamsSchema.parse(request.params)
      request.params = validatedParams
      return await getProfile(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Follow user
  fastify.post('/users/:userId/follow', async (request, reply) => {
    try {
      const validatedParams = userParamsSchema.parse(request.params)
      request.params = validatedParams
      return await followUser(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Unfollow user
  fastify.post('/users/:userId/unfollow', async (request, reply) => {
    try {
      const validatedParams = userParamsSchema.parse(request.params)
      request.params = validatedParams
      return await unfollowUser(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Tìm kiếm user
  fastify.get('/users/search', async (request, reply) => {
    try {
      const validatedQuery = searchUsersSchema.parse(request.query)
      request.query = validatedQuery
      return await searchUsers(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })
}
