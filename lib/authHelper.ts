import * as jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const authenticate =
    (fn: NextApiHandler, methods: string[]) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        if (methods.includes(<string>req.method)) {
            try {
                const jwtToken = req.cookies["token"];
                if (!jwtToken) {
                    throw Error();
                }
                let decodedJwt = await jwt.verify(
                    jwtToken,
                    <string>process.env.SECRET
                );
                return await fn(req, res);
            } catch (error) {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            return await fn(req, res);
        }
    };

export const authenticateClient = async (req: NextApiRequest) => {
    let loggedIn = false;
    if (req.cookies["token"]) {
        let decodedJwt = await jwt.verify(
            req.cookies["token"],
            <string>process.env.SECRET
        );
        if (decodedJwt) {
            loggedIn = true;
        }
    }
    return loggedIn;
};
