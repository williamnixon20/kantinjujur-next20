import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import  authenticate from "../../../lib/authHelper";

export default authenticate(async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const items = await prisma.item.findMany({
                where: {
                    isSold: false,
                },
            });
            return res.status(200).json({ message: "Successfully fetched", data: items });
        } catch (error) {
            res.status(400).json({ error });
        }
    } else if (req.method === "POST") {
        try {
            const itemData: Prisma.ItemCreateInput = JSON.parse(JSON.stringify(req.body));
            await prisma.item.create({
                data: itemData
            });
            res.status(201).json({ message: "Submitted successfully." });
        } catch (error: any) {
            console.log(error.message);
            res.status(400).json({ error });
        }
    } else {
        res.status(404).json({ message: "Not Found" });
    }
}, ["POST"])