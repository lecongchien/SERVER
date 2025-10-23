// Controller cho nghiệp vụ post social app dùng Fastify
import { FastifyRequest, FastifyReply } from 'fastify'
import {
  CreatePostInput,
  PostParams,
  FeedQuery,
  CommentInput,
  CommentParams,
  CommentsQuery
} from '@/schemaValidations/post.schema'

export const createPost = async (request: FastifyRequest<{ Body: CreatePostInput }>, reply: FastifyReply) => {
  try {
    const { content, imageUrl } = request.body
    const userId = 1 // Lấy từ JWT token

    // Tạo post mới
    // const post = await prisma.post.create({
    //   data: {
    //     content,
    //     imageUrl,
    //     authorId: userId
    //   },
    //   include: {
    //     author: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     },
    //     _count: {
    //       select: {
    //         likes: true,
    //         comments: true
    //       }
    //     }
    //   }
    // });

    reply.status(201).send({
      message: 'Tạo bài viết thành công',
      post: {
        id: 1,
        content,
        imageUrl,
        createdAt: new Date(),
        author: {
          id: 1,
          username: 'demo',
          fullName: 'Demo User',
          avatar: null,
          isVerified: false
        },
        likesCount: 0,
        commentsCount: 0,
        isLiked: false
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const getFeed = async (request: FastifyRequest<{ Querystring: FeedQuery }>, reply: FastifyReply) => {
  try {
    const page = parseInt(request.query.page || '1')
    const limit = 10
    const offset = (page - 1) * limit

    // Lấy danh sách bài viết từ những user mà user hiện tại đang follow
    // const posts = await prisma.post.findMany({
    //   where: {
    //     OR: [
    //       { authorId: currentUserId }, // Bài viết của chính mình
    //       {
    //         author: {
    //           followers: {
    //             some: { followerId: currentUserId }
    //           }
    //         }
    //       }
    //     ]
    //   },
    //   include: {
    //     author: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     },
    //     _count: {
    //       select: {
    //         likes: true,
    //         comments: true
    //       }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   skip: offset,
    //   take: limit
    // });

    reply.send({
      posts: [
        {
          id: 1,
          content: 'This is a sample post',
          imageUrl: null,
          createdAt: new Date(),
          author: {
            id: 1,
            username: 'demo',
            fullName: 'Demo User',
            avatar: null,
            isVerified: false
          },
          likesCount: 5,
          commentsCount: 2,
          isLiked: false
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

export const likePost = async (request: FastifyRequest<{ Params: PostParams }>, reply: FastifyReply) => {
  try {
    const { postId } = request.params
    const userId = 1 // Lấy từ JWT token

    // Kiểm tra đã like chưa
    // const existingLike = await prisma.like.findUnique({
    //   where: {
    //     userId_postId: {
    //       userId,
    //       postId: parseInt(postId)
    //     }
    //   }
    // });

    // if (existingLike) {
    //   // Nếu đã like thì unlike
    //   await prisma.like.delete({
    //     where: { id: existingLike.id }
    //   });
    //   return reply.send({ message: 'Đã bỏ like', isLiked: false });
    // } else {
    //   // Nếu chưa like thì like
    //   await prisma.like.create({
    //     data: {
    //       userId,
    //       postId: parseInt(postId)
    //     }
    //   });
    //   return reply.send({ message: 'Đã like bài viết', isLiked: true });
    // }

    reply.send({ message: 'Đã like bài viết', isLiked: true })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const commentPost = async (
  request: FastifyRequest<{ Body: CommentInput; Params: CommentParams }>,
  reply: FastifyReply
) => {
  try {
    const { postId } = request.params
    const { content } = request.body
    const userId = 1 // Lấy từ JWT token

    // Tạo comment mới
    // const comment = await prisma.comment.create({
    //   data: {
    //     content,
    //     userId,
    //     postId: parseInt(postId)
    //   },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     }
    //   }
    // });

    reply.status(201).send({
      message: 'Đã thêm comment thành công',
      comment: {
        id: 1,
        content,
        createdAt: new Date(),
        user: {
          id: 1,
          username: 'demo',
          fullName: 'Demo User',
          avatar: null,
          isVerified: false
        }
      }
    })
  } catch (error) {
    reply.status(500).send({ message: 'Lỗi server', error })
  }
}

export const getPostComments = async (
  request: FastifyRequest<{ Params: PostParams; Querystring: CommentsQuery }>,
  reply: FastifyReply
) => {
  try {
    const { postId } = request.params
    const page = parseInt(request.query.page || '1')
    const limit = 20
    const offset = (page - 1) * limit

    // Lấy danh sách comment
    // const comments = await prisma.comment.findMany({
    //   where: { postId: parseInt(postId) },
    //   include: {
    //     user: {
    //       select: {
    //         id: true,
    //         username: true,
    //         fullName: true,
    //         avatar: true,
    //         isVerified: true
    //       }
    //     }
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   skip: offset,
    //   take: limit
    // });

    reply.send({
      comments: [
        {
          id: 1,
          content: 'This is a sample comment',
          createdAt: new Date(),
          user: {
            id: 1,
            username: 'demo',
            fullName: 'Demo User',
            avatar: null,
            isVerified: false
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
