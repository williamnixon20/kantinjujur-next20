import { ItemForm } from "../components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../lib/urlVercel";

const AddItem = () => {
    const router = useRouter();

    useEffect(() => {
        const verify = async () => {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            try {
                const res = await axios.get(
                    `${NEXT_URL}/api/balance`,
                    configData
                );
            } catch (err) {
                router.push({
                    pathname: "/",
                });
            }
        };
        verify();
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="lg:col-span-12 col-span-1 bg-gray-700 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                <ItemForm></ItemForm>
            </div>
        </div>
    );
};

export default AddItem;
