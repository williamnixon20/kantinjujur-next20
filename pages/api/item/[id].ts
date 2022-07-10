import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../lib/authHelper";

export default authenticate(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        const itemId = <string>req.query.id;
        if (req.method === "GET") {
            try {
                const items = await prisma.item.findUnique({
                    where: {
                        id: itemId,
                    },
                });
                return res
                    .status(200)
                    .json({ message: "Successfully fetched", data: items });
            } catch (error) {
                res.status(400).json({ error });
            }
        } else if (req.method === "PUT") {
            try {
                const body = JSON.parse(JSON.stringify(req.body));
                const item = await prisma.item.update({
                    where: {
                        id: itemId,
                    },
                    data: {
                        isSold: body.isSold,
                    },
                });

                return res
                    .status(200)
                    .json({ message: "Successfully deleted", data: item });
            } catch (error) {
                console.log(error);
                res.status(400).json({ error });
            }
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    },
    ["PUT"]
);
