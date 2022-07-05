import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { studentId, password } = req.body;
            const existingUser = await prisma.user.findFirst({
                where: {
                    studentId: studentId
                }
            })
            if (!existingUser) {
                throw Error("Student with the id doesn't exist");
            }
    
            const match = await bcrypt.compare(password, existingUser.password);
            if (!match) {
                throw Error("Password invalid!")
            }
            const secretKey = <string> process.env.SECRET;
            const token = jwt.sign({ sub: studentId }, secretKey, { expiresIn: '7d' });
            // res.cookies.set("token", token, { httpOnly: true })
            setCookie('token', token, { req, res })
            // res.setHeader('Set-Cookie', token);
            res.status(201).json({ message: "Sucessfully authorized.", data: { token: token}});
        } catch (error: any) {
            console.log(error)
            res.status(400).json({ error: error.message});
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
}