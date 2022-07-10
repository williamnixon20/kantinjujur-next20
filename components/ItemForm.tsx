import React from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { NEXT_URL } from "../lib/urlVercel";
import { formatToBase64 } from "../lib/formatterHelper";

export default function ItemForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const create = async (data: any) => {
        try {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            data["photoFile"] = await formatToBase64(data["photoFile"][0]);
            data["price"] = parseFloat(data["price"]);
            await axios.post(
                `${NEXT_URL}/api/item`,
                JSON.stringify(data),
                configData
            );
        } catch (error: any) {
            throw new Error(error);
        }
    };
    const onSubmit = async (data: any) => {
        try {
            await toast.promise(
                create(data),
                {
                    loading: "Posting...",
                    success: "Barangmu sudah terinput di kantin jujur!",
                    error: "Oops, ada yang sesuatu yang salah.",
                },
                {
                    duration: 5000,
                }
            );
            router.push({
                pathname: "/",
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className="max-w-md mx-auto px-4">
            <Toaster />
            <h1 className="font-bold text-3xl md:text-4xl text-white tracking-wide mb-10 text-center">
                Tertarik menjual barang di kantin jujur?
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6 shadow-lg p-10 bg-white rounded-lg"
            >
                <div>
                    <label htmlFor="Nama Barang" className="sr-only">
                        Nama Barang
                    </label>
                    <div className="relative">
                        <input
                            {...register("name", {
                                required: true,
                            })}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nama Barang"
                            className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                                errors.name && "bg-red-200"
                            }`}
                        />
                        {errors.name && <>{errors.name.message}</>}
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Harga Barang"
                        {...register("price", {
                            required: true,
                            min: 0,
                            max: 9999999999,
                        })}
                        name="price"
                        id="price"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.price && "bg-red-200"
                        }`}
                    />
                </div>
                <input
                    {...register("photoFile", {
                        required: true,
                    })}
                    type="file"
                    accept="image/*"
                    placeholder="URL Foto Barang"
                    name="photoFile"
                    id="photoFile"
                    className="hidden"
                />
                <label
                    htmlFor="photoFile"
                    className={`font-bold w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                        errors.photoFile && "bg-red-200"
                    }`}
                >
                    <h1 className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-gray-600 hover:bg-gray-400 text-sm rounded-md text-white px-3 py-3 cursor-pointer">
                        {!watch("photoFile") || watch("photoFile").length === 0
                            ? "Upload foto barangmu!"
                            : watch("photoFile")[0].name}
                    </h1>
                </label>

                <textarea
                    placeholder="Deskripsikan barangmu!"
                    {...register("description", {
                        required: true,
                        maxLength: 120,
                    })}
                    name="description"
                    id="description"
                    className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                        errors.description && "bg-red-200"
                    }`}
                />
                <motion.button
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.2 },
                    }}
                    type="submit"
                    value="Submit"
                    className="w-full justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Submit
                </motion.button>
            </form>
        </div>
    );
}
