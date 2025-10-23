// Controller cho nghiệp vụ nhắn tin social app dùng Fastify
import { FastifyRequest, FastifyReply } from 'fastify'
import { SendMessageInput, ConversationParams, MessagesQuery } from '@/schemaValidations/message.schema'

export const sendMessage = async (request: FastifyRequest<{ Body: SendMessageInput }>, reply: FastifyReply) => {
  try {
    const { receiverId, content, messageType = 'text' } = request.body
    const senderId = 1 // Lấy từ JWT token

    // Kiểm tra không thể gửi tin nhắn cho chính mình
    if (receiverId === senderId) {
      return reply.status(400).send({ message: 'Không thể gửi tin nhắn cho chính mình' })
    }

    // Tạo tin nhắn mới
    // const message = await prisma.message.create({
    //   data: {
    //     senderId,
    //     receiverId,
    //     content,
    //     messageType,
    //     isRead: false
    //   },
    //   include: {
    //     sender: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true
    //       }
    //     },
    //     receiver: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true
    //       }
    //     }
    //   }
    // });

    // Emit socket event để realtime
    // request.server.io.to(`user_${receiverId}`).emit('new_message', message);

    reply.status(201).send({
      message: 'Gửi tin nhắn thành công',
      data: {
        id: 1,
        content,
        messageType,
        createdAt: new Date(),
        isRead: false,
        sender: {
          id: 1,
          username: 'demo',
          fullName: 'Demo User',
          avatar: null
        },
        receiver: {
          id: receiverId,
          username: 'receiver',
          fullName: 'Receiver User',
          avatar: null
        }
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const getConversations = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = 1 // Lấy từ JWT token

    // Lấy danh sách cuộc hội thoại
    // const conversations = await prisma.message.findMany({
    //   where: {
    //     OR: [
    //       { senderId: userId },
    //       { receiverId: userId }
    //     ]
    //   },
    //   include: {
    //     sender: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true
    //       }
    //     },
    //     receiver: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true
    //       }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   distinct: ['senderId', 'receiverId']
    // });

    reply.send({
      conversations: [
        {
          id: 1,
          lastMessage: 'Hello!',
          lastMessageTime: new Date(),
          unreadCount: 0,
          user: {
            id: 2,
            username: 'friend',
            fullName: 'Friend User',
            avatar: null
          }
        }
      ]
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const getMessages = async (
  request: FastifyRequest<{ Params: ConversationParams; Querystring: MessagesQuery }>,
  reply: FastifyReply
) => {
  try {
    const { userId: otherUserId } = request.params
    const currentUserId = 1 // Lấy từ JWT token
    const page = parseInt(request.query.page || '1')
    const limit = 50
    const offset = (page - 1) * limit

    // Lấy tin nhắn giữa 2 user
    // const messages = await prisma.message.findMany({
    //   where: {
    //     OR: [
    //       { senderId: currentUserId, receiverId: parseInt(otherUserId) },
    //       { senderId: parseInt(otherUserId), receiverId: currentUserId }
    //     ]
    //   },
    //   include: {
    //     sender: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true
    //       }
    //     }
    //   },
    //   orderBy: { createdAt: 'asc' },
    //   skip: offset,
    //   take: limit
    // });

    // Đánh dấu tin nhắn đã đọc
    // await prisma.message.updateMany({
    //   where: {
    //     senderId: parseInt(otherUserId),
    //     receiverId: currentUserId,
    //     isRead: false
    //   },
    //   data: { isRead: true }
    // });

    reply.send({
      messages: [
        {
          id: 1,
          content: 'Hello!',
          messageType: 'text',
          createdAt: new Date(),
          isRead: true,
          sender: {
            id: 2,
            username: 'friend',
            fullName: 'Friend User',
            avatar: null
          }
        }
      ],
      pagination: {
        page,
        limit,
        totalPages: 1
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const markAsRead = async (request: FastifyRequest<{ Params: ConversationParams }>, reply: FastifyReply) => {
  try {
    const { userId: otherUserId } = request.params
    const currentUserId = 1 // Lấy từ JWT token

    // Đánh dấu tất cả tin nhắn từ user khác đã đọc
    // await prisma.message.updateMany({
    //   where: {
    //     senderId: parseInt(otherUserId),
    //     receiverId: currentUserId,
    //     isRead: false
    //   },
    //   data: { isRead: true }
    // });

    reply.send({ message: 'Đã đánh dấu tin nhắn đã đọc' })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}
