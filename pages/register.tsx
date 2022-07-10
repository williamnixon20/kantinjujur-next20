import { RegisterForm } from "../components";
import { authenticateClient } from "../lib/authHelper";
import { NextApiRequest, NextApiResponse } from "next";

const addItem = () => {
    return (
        <div className="container mx-auto my-5">
            <div className="lg:col-span-12 col-span-1 bg-gray-700 shadow-lg rounded-lg pt-6 pb-6">
                <RegisterForm></RegisterForm>
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
