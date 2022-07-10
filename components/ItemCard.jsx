import React from "react";
import moment from "moment";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import { NEXT_URL } from "../lib/urlVercel";
import { formatter } from "../lib/formatterHelper";

const ItemCard = ({ item, loggedIn }) => {
    const router = useRouter();

    const deleteId = async (id) => {
        try {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            await axios.put(
                `${NEXT_URL}/api/item/${id}`,
                JSON.stringify({ isSold: true }),
                configData
            );
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    };
    const handleBuy = async (event) => {
        console.log("received!");
        try {
            await toast.promise(
                deleteId(event.target.value),
                {
                    loading: "Sedang dibeli...",
                    success: "Barang telah di beli!",
                    error: "Oops, ada yang sesuatu yang salah.",
                },
                {
                    duration: 5000,
                }
            );
            router.reload();
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className="lg:col-span-4 col-span-1 bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <Toaster></Toaster>
            <div className="relative overflow-hidden shadow-md pb-40 mb-6">
                <img
                    src={item.photoUrl}
                    alt={item.name}
                    layout="fill"
                    className="object-top absolute h-100 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
                ></img>
            </div>
            <h1 className="transition duration-700 text-center mb-2 text-1xl font-semibold ">
                {item.name}
            </h1>
            <h1 className="transition duration-700 text-center mb-8 text-1xl font-semibold ">
                {formatter.format(item.price)}
            </h1>
            <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                    <div className="font-medium text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline mr-2 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="align-middle">
                            {moment(item.createdAt).format("DD-MMM-YYYY")}
                        </span>
                    </div>
                </div>
            </div>
            <p className="text-center text-lg text-gray-700 font-normal px-4 mb-5">
                {item.description}
            </p>
            <div className="text-center">
                {loggedIn ? (
                    <button
                        onClick={handleBuy}
                        value={item.id}
                        className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 hover:bg-pink-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
                    >
                        Saya mau beli!
                    </button>
                ) : (
                    <button
                        disabled
                        className="inline-block bg-gray-400 text-lg font-medium rounded-full text-white px-8 py-3"
                    >
                        Login dulu ya
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemCard;
