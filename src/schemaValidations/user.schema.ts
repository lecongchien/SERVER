// Schema validation cho user endpoints using Zod
import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username phải có ít nhất 3 ký tự')
    .max(20, 'Username không được quá 20 ký tự')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username chỉ được chứa chữ cái, số và dấu gạch dưới'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  fullName: z.string().min(1, 'Tên đầy đủ không được để trống').max(50, 'Tên đầy đủ không được quá 50 ký tự')
})

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống')
})

export const userParamsSchema = z.object({
  userId: z.string().regex(/^[0-9]+$/, 'User ID phải là số')
})

export const searchUsersSchema = z.object({
  q: z.string().min(1, 'Từ khóa tìm kiếm không được để trống').max(100, 'Từ khóa tìm kiếm không được quá 100 ký tự')
})

// Export types for TypeScript
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UserParams = z.infer<typeof userParamsSchema>
export type SearchUsersQuery = z.infer<typeof searchUsersSchema>
