// Controller cho nghiệp vụ user social app dùng Fastify
import { FastifyRequest, FastifyReply } from 'fastify'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import envConfig from '@/config'
import { RegisterInput, LoginInput, UserParams, SearchUsersQuery } from '@/schemaValidations/user.schema'

export const register = async (request: FastifyRequest<{ Body: RegisterInput }>, reply: FastifyReply) => {
  try {
    const { username, email, password, fullName } = request.body

    // Kiểm tra user đã tồn tại
    // const existingUser = await prisma.user.findFirst({
    //   where: { OR: [{ email }, { username }] }
    // });
    // if (existingUser) {
    //   return reply.status(400).send({ message: 'Email hoặc username đã tồn tại' });
    // }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Tạo user mới
    // const user = await prisma.user.create({
    //   data: {
    //     username,
    //     email,
    //     password: hashedPassword,
    //     fullName,
    //     avatar: null,
    //     bio: '',
    //     isVerified: false
    //   }
    // });

    reply.status(201).send({
      message: 'Đăng ký thành công',
      user: { id: 1, username, email, fullName }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
  try {
    const { email, password } = request.body

    // Tìm user
    // const user = await prisma.user.findUnique({
    //   where: { email }
    // });
    // if (!user || !await bcrypt.compare(password, user.password)) {
    //   return reply.status(401).send({ message: 'Email hoặc mật khẩu không đúng' });
    // }

    // Tạo JWT token
    const token = jwt.sign({ userId: 1, email }, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })

    reply.send({
      message: 'Đăng nhập thành công',
      token,
      user: { id: 1, username: 'demo', email, fullName: 'Demo User' }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const getProfile = async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  try {
    const { userId } = request.params

    // Lấy thông tin user
    // const user = await prisma.user.findUnique({
    //   where: { id: parseInt(userId) },
    //   select: {
    //     id: true,
    //     username: true,
    //     email: true,
    //     fullName: true,
    //     avatar: true,
    //     bio: true,
    //     isVerified: true,
    //     _count: {
    //       select: {
    //         posts: true,
    //         followers: true,
    //         following: true
    //       }
    //     }
    //   }
    // });

    reply.send({
      user: {
        id: parseInt(userId),
        username: 'demo',
        email: 'demo@example.com',
        fullName: 'Demo User',
        avatar: null,
        bio: 'This is a demo user',
        isVerified: false,
        postsCount: 0,
        followersCount: 0,
        followingCount: 0
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const followUser = async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  try {
    const { userId } = request.params
    const currentUserId = 1 // Lấy từ JWT token

    // Kiểm tra không thể follow chính mình
    if (parseInt(userId) === currentUserId) {
      return reply.status(400).send({ message: 'Không thể follow chính mình' })
    }

    // Tạo follow relationship
    // await prisma.follow.create({
    //   data: {
    //     followerId: currentUserId,
    //     followingId: parseInt(userId)
    //   }
    // });

    reply.send({ message: 'Đã follow user thành công' })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const unfollowUser = async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  try {
    const { userId } = request.params
    const currentUserId = 1 // Lấy từ JWT token

    // Xóa follow relationship
    // await prisma.follow.delete({
    //   where: {
    //     followerId_followingId: {
    //       followerId: currentUserId,
    //       followingId: parseInt(userId)
    //     }
    //   }
    // });

    reply.send({ message: 'Đã unfollow user thành công' })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const searchUsers = async (request: FastifyRequest<{ Querystring: SearchUsersQuery }>, reply: FastifyReply) => {
  try {
    const { q } = request.query

    // Tìm kiếm user theo username hoặc fullName
    // const users = await prisma.user.findMany({
    //   where: {
    //     OR: [
    //       { username: { contains: q, mode: 'insensitive' } },
    //       { fullName: { contains: q, mode: 'insensitive' } }
    //     ]
    //   },
    //   select: {
    //     id: true,
    //     username: true,
    //     fullName: true,
    //     avatar: true,
    //     isVerified: true
    //   }
    // });

    reply.send({
      users: [
        {
          id: 1,
          username: 'demo',
          fullName: 'Demo User',
          avatar: null,
          isVerified: false
        }
      ]
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}
