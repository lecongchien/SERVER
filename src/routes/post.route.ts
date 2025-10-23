// Route cho nghiệp vụ post social app dùng Fastify
import { FastifyInstance } from 'fastify'
import { createPost, getFeed, likePost, commentPost, getPostComments } from '../controllers/post.controller'
import {
  createPostSchema,
  postParamsSchema,
  feedQuerySchema,
  commentSchema,
  commentsQuerySchema
} from '../schemaValidations/post.schema'

export default async function postRoutes(fastify: FastifyInstance) {
  // Tạo bài viết
  fastify.post('/posts', async (request, reply) => {
    try {
      const validatedBody = createPostSchema.parse(request.body)
      request.body = validatedBody
      return await createPost(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Lấy feed
  fastify.get('/feed', async (request, reply) => {
    try {
      const validatedQuery = feedQuerySchema.parse(request.query)
      request.query = validatedQuery
      return await getFeed(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Like/Unlike bài viết
  fastify.post('/posts/:postId/like', async (request, reply) => {
    try {
      const validatedParams = postParamsSchema.parse(request.params)
      request.params = validatedParams
      return await likePost(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Comment bài viết
  fastify.post('/posts/:postId/comments', async (request, reply) => {
    try {
      const validatedBody = commentSchema.parse(request.body)
      const validatedParams = postParamsSchema.parse(request.params)
      request.body = validatedBody
      request.params = validatedParams
      return await commentPost(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Lấy danh sách comment
  fastify.get('/posts/:postId/comments', async (request, reply) => {
    try {
      const validatedParams = postParamsSchema.parse(request.params)
      const validatedQuery = commentsQuerySchema.parse(request.query)
      request.params = validatedParams
      request.query = validatedQuery
      return await getPostComments(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })
}
