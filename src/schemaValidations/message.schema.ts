// Schema validation cho message endpoints using Zod
import { z } from 'zod'

export const sendMessageSchema = z.object({
  receiverId: z.number().min(1, 'Receiver ID phải lớn hơn 0'),
  content: z
    .string()
    .min(1, 'Nội dung tin nhắn không được để trống')
    .max(1000, 'Nội dung tin nhắn không được quá 1000 ký tự'),
  messageType: z.enum(['text', 'image', 'file']).optional().default('text')
})

export const conversationParamsSchema = z.object({
  userId: z.string().regex(/^[0-9]+$/, 'User ID phải là số')
})

export const messagesQuerySchema = z.object({
  page: z
    .string()
    .regex(/^[0-9]+$/, 'Page phải là số')
    .optional()
    .default('1')
})

// Export types for TypeScript
export type SendMessageInput = z.infer<typeof sendMessageSchema>
export type ConversationParams = z.infer<typeof conversationParamsSchema>
export type MessagesQuery = z.infer<typeof messagesQuerySchema>
