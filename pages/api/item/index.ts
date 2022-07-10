import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { authenticate } from "../../../lib/authHelper";
import upload from "../../../lib/uploadHelper";

export default authenticate(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === "GET") {
            try {
                const items = await prisma.item.findMany({
                    where: {
                        isSold: false,
                    },
                });
                return res
                    .status(200)
                    .json({ message: "Successfully fetched", data: items });
            } catch (error) {
                res.status(400).json({ error });
            }
        } else if (req.method === "POST") {
            try {
                let itemData = JSON.parse(JSON.stringify(req.body));
                itemData["photoUrl"] = await upload(
                    itemData.name + itemData.price,
                    itemData.photoFile
                );

                await prisma.item.create({
                    data: {
                        name: itemData["name"],
                        photoUrl: itemData["photoUrl"],
                        description: itemData["description"],
                        price: itemData["price"],
                    },
                });
                res.status(201).json({ message: "Submitted successfully." });
            } catch (error: any) {
                res.status(400).json({ error });
            }
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    },
    ["POST"]
);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "4mb", // Set desired value here
        },
    },
};
