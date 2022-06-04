import { Request, Response } from "express";
import { prismaClient } from "../database/database";

class CommentsController {
    async find(req: Request, res: Response) {
        try {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 10);
            var response = await prismaClient.comment.findMany({
                include: {
                    user: {
                        include:{
                            avatar: true
                        }
                    },
                },
                take: limit,
                skip: (page - 1) * limit,
                where:{
                    post:{
                        id: req.params.id
                    }
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to find comments" });
        }
    }
    async create(req: Request, res: Response) {
        try {
            var response = await prismaClient.comment.create({
                data: {
                    comment: req.body.comment,
                    post:{
                        connect:{
                            id: req.body.post
                        }
                    },
                    user: {
                        connect: {
                            id: req.body.user
                        }
                    }
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }
    async delete(req: Request, res: Response) {
        try {
            var response = await prismaClient.comment.delete({
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
            var response = await prismaClient.comment.update({
                where: {
                    id: req.params.id
                },
                data: {
                    comment: req.body.comment,
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }
}
export { CommentsController }