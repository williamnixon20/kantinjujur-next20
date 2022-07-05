import * as jwt from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const authenticate = (fn : NextApiHandler, methods : string[]) => 
async (req: NextApiRequest, res: NextApiResponse) => {
    if (methods.includes(<string> req.method )) {
        try {
            const jwtToken = req.cookies["token"];
            if (!jwtToken) {
                throw Error();
            }
            let decodedJwt = await jwt.verify(jwtToken, <string>process.env.SECRET);
            return await fn(req, res);
        } catch (error){
            res.status(500).json({ message: "Unauthorized "})
        }
    } else {
        return await fn(req, res);
    }
}
export default authenticate