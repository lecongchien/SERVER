// Schema validation cho post endpoints using Zod
import { z } from 'zod'

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'Nội dung bài viết không được để trống')
    .max(2000, 'Nội dung bài viết không được quá 2000 ký tự'),
  imageUrl: z.string().url('URL hình ảnh không hợp lệ').optional()
})

export const postParamsSchema = z.object({
  postId: z.string().regex(/^[0-9]+$/, 'Post ID phải là số')
})

export const feedQuerySchema = z.object({
  page: z
    .string()
    .regex(/^[0-9]+$/, 'Page phải là số')
    .optional()
    .default('1')
})

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Nội dung comment không được để trống')
    .max(500, 'Nội dung comment không được quá 500 ký tự')
})

export const commentParamsSchema = z.object({
  postId: z.string().regex(/^[0-9]+$/, 'Post ID phải là số')
})

export const commentsQuerySchema = z.object({
  page: z
    .string()
    .regex(/^[0-9]+$/, 'Page phải là số')
    .optional()
    .default('1')
})

// Export types for TypeScript
export type CreatePostInput = z.infer<typeof createPostSchema>
export type PostParams = z.infer<typeof postParamsSchema>
export type FeedQuery = z.infer<typeof feedQuerySchema>
export type CommentInput = z.infer<typeof commentSchema>
export type CommentParams = z.infer<typeof commentParamsSchema>
export type CommentsQuery = z.infer<typeof commentsQuerySchema>
