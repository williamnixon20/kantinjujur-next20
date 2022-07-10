import { ItemForm } from "../components";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateClient } from "../lib/authHelper";

const AddItem = () => {
    return (
        <div className="container mx-auto my-5">
            <div className="lg:col-span-12 col-span-1 bg-gray-700 shadow-lg rounded-lg pt-6 pb-6">
                <ItemForm></ItemForm>
            </div>
        </div>
    );
};

export async function getServerSideProps({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    let loggedIn = await authenticateClient(req);

    if (!loggedIn) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    } else {
        return {
            props: {},
        };
    }
}

export default AddItem;
