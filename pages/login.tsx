import { LoginForm } from "../components";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateClient } from "../lib/authHelper";

const addItem = () => {
    return (
        <div className="container mx-auto my-5">
            <div className="lg:col-span-12 col-span-1 bg-gray-700 shadow-lg rounded-lg pt-6 pb-6">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
};

export default addItem;

export async function getServerSideProps({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    let loggedIn = await authenticateClient(req);

    if (loggedIn) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}
