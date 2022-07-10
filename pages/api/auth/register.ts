import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { validateId } from "../../../lib/validateHelper";
import * as bcrypt from "bcrypt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { studentId, username, password } = req.body;
            const existingUser = await prisma.user.findFirst({
                where: {
                    studentId: studentId,
                },
            });
            if (existingUser) {
                throw Error("Id registered!");
            }
            if (validateId(studentId) !== true) {
                throw Error("Id invalid!");
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    studentId: studentId,
                    password: hashedPassword,
                },
            });

            res.status(201).json({
                message: "User registered successfully.",
                data: newUser,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
}
