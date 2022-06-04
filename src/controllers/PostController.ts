import { Request, Response } from "express";
import { prismaClient } from "../database/database";

class PostController {
    async find(req: Request, res: Response) {
        try {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 10);
            var response = await prismaClient.post.findMany({
                include: {
                    user: true,
                    content: true,
                },
                take: limit,
                skip: (page - 1) * limit,
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to find posts" });
        }
    }
    async findOne(req: Request, res: Response) {
        try {
            await prismaClient.post.update({
                where: {
                    id: req.params.id
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            })
            var response = await prismaClient.post.findUnique({
                where: {
                    id: req.params.id
                },
                include: {
                    user: {
                        include:{
                            avatar: true
                        }
                    },
                    content: true,
                    comments: {
                        orderBy: {
                            createdAt: "desc"
                        },
                        take: 5
                    },
                    likes: {
                        include:{
                            user: true
                        },
                        take: 3
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true
                        }
                    }
                },
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to find post" });
        }
    }
    async create(req: Request, res: Response) {
        const { title, user, content } = req.body;
        try {
            var response = await prismaClient.post.create({
                data: {
                    title: title,
                    content: {
                        create: {
                            fileId: content.fileId,
                            name: content.name,
                            url: content.url,
                            thumbnailUrl: content.thumbnailUrl
                        }
                    },
                    user: {
                        connect: {
                            id: user
                        }
                    }
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({error});
        }
    }
    async delete(req: Request, res: Response) {
        try {
            var response = await prismaClient.post.delete({
                where: {
                    id: req.params.id
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }
    async update(req: Request, res: Response) {
        try {
            var response = await prismaClient.post.update({
                where: {
                    id: req.params.id
                },
                data: {
                    title: req.body.title,
                    content: {
                        update: {
                            name: "12312312",
                            url: "https://www.google.com",
                            thumbnailUrl: "321321312"
                        }
                    }
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }
}
export { PostController }