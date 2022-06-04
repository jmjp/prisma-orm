import { Request, Response } from "express";
import { prismaClient } from "../database/database";

class UserController {
    async find(req: Request, res: Response) {
        try {
            var response = await prismaClient.user.findMany({});
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to find users" })
        }
    }
    async create(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            var response = await prismaClient.user.create({
                data: {
                    email: email,
                    username: username,
                    password: password
                },
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to create user" });
        }
    }
    async update(req: Request, res: Response) {
        const id = req.params.id
        const { username, email } = req.body;
        try {
            var response = await prismaClient.user.update({
                where: { id: id },
                data: {
                    email: email,
                    username: username,
                }
            })
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ code: error.code, message: "failed to update user" });
        }
    }
}

export { UserController }