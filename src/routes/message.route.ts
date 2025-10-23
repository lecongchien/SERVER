// Route cho nghiệp vụ message social app dùng Fastify
import { FastifyInstance } from 'fastify'
import { sendMessage, getConversations, getMessages, markAsRead } from '../controllers/message.controller'
import { sendMessageSchema, conversationParamsSchema, messagesQuerySchema } from '../schemaValidations/message.schema'

export default async function messageRoutes(fastify: FastifyInstance) {
  // Gửi tin nhắn
  fastify.post('/messages', async (request, reply) => {
    try {
      const validatedBody = sendMessageSchema.parse(request.body)
      request.body = validatedBody
      return await sendMessage(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Lấy danh sách cuộc hội thoại
  fastify.get('/conversations', getConversations)

  // Lấy tin nhắn với một user
  fastify.get('/messages/:userId', async (request, reply) => {
    try {
      const validatedParams = conversationParamsSchema.parse(request.params)
      const validatedQuery = messagesQuerySchema.parse(request.query)
      request.params = validatedParams
      request.query = validatedQuery
      return await getMessages(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })

  // Đánh dấu tin nhắn đã đọc
  fastify.post('/messages/:userId/read', async (request, reply) => {
    try {
      const validatedParams = conversationParamsSchema.parse(request.params)
      request.params = validatedParams
      return await markAsRead(request as any, reply)
    } catch (error: any) {
      reply.status(400).send({ message: 'Validation error', errors: error.errors })
    }
  })
}
