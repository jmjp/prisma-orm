import { Request, Response } from "express";
import { prismaClient } from "../database/database";

class LikesController {
    async find(req: Request, res: Response) {
        try {
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 10);
            var response = await prismaClient.like.findMany({
                include: {
                    user: true,
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
        const { post, user } = req.body;
        try {
            var response = await prismaClient.like.create({
                data: {
                    post:{
                        connect:{
                            id: post
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
            return res.status(400).json(error);
        }
    }
    async delete(req: Request, res: Response) {
        try {
            var response = await prismaClient.like.delete({
                where: {
                    id: req.params.id
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json(error);
        }
    }
}
export { LikesController }