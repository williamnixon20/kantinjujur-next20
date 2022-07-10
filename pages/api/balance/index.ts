import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "../../../lib/authHelper";

async function getAggregate() {
    const accountBalance = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },
    });
    return accountBalance._sum;
}
export default authenticate(
    async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === "GET") {
            try {
                const accountBalance = await getAggregate();
                return res
                    .status(200)
                    .json({
                        message: "Successfully fetched",
                        data: accountBalance.amount,
                    });
            } catch (error) {
                res.status(400).json({ error });
            }
        } else if (req.method === "POST") {
            try {
                console.log(req.body);
                const transactionData: Prisma.TransactionCreateInput = req.body;
                if (transactionData.amount < 0) {
                    const accountBalance = await getAggregate();
                    if (accountBalance.amount) {
                        if (
                            transactionData.amount + accountBalance.amount <
                            0
                        ) {
                            throw Error(
                                "Balance not enough for this transaction."
                            );
                        }
                    } else {
                        throw Error("Balance not enough for this transaction.");
                    }
                }
                await prisma.transaction.create({
                    data: transactionData,
                });
                res.status(201).json({ message: "Submitted successfully." });
            } catch (error: any) {
                console.log(error);
                res.status(400).json({ error });
            }
        } else {
            res.status(404).json({ message: "Not Found" });
        }
    },
    ["GET", "POST"]
);
