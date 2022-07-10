import React from "react";
import axios from "axios";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { NEXT_URL } from "../lib/urlVercel";
import { formatToBase64 } from "../lib/formatterHelper";
import { ErrorMessage } from "@hookform/error-message";

export default function ItemForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

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
                                required: "Nama barang harus diisi",
                                minLength: {
                                    value: 2,
                                    message: "Ayo lebih deskriptif lagi!",
                                },
                            })}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nama Barang"
                            className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                                errors.name && "bg-red-200"
                            }`}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ messages }) =>
                                messages &&
                                Object.entries(messages).map(
                                    ([type, message]) => (
                                        <p key={type}>{message}</p>
                                    )
                                )
                            }
                        />
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Harga Barang"
                        {...register("price", {
                            required: "Harga barang harus diisi",
                            min: {
                                value: 0,
                                message: "Kamu jualan atau bagi-bagi duit?",
                            },
                            max: {
                                value: 9999999999,
                                message: "Ini kantin bukan tender stadiun!",
                            },
                        })}
                        name="price"
                        id="price"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.price && "bg-red-200"
                        }`}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="price"
                        render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                        }
                    />
                </div>
                <div className="relative">
                    <input
                        {...register("photoFile", {
                            required: "Photo wajib diupload",
                        })}
                        type="file"
                        accept="image/*"
                        placeholder="URL Foto Barang"
                        name="photoFile"
                        id="photoFile"
                        className="hidden"
                    />
                    <label htmlFor="photoFile">
                        <h1
                            className={`${
                                errors.photoFile
                                    ? "bg-red-300 hover:bg-red-400 text-gray-500"
                                    : "bg-gray-600 hover:bg-gray-400 text-white "
                            } font-bold transition duration-500 ease transform hover:-translate-y-1 inline-block text-sm rounded-md px-3 py-3 cursor-pointer`}
                        >
                            {!watch("photoFile") ||
                            watch("photoFile").length === 0
                                ? "Upload foto barangmu!"
                                : watch("photoFile")[0].name}
                        </h1>
                    </label>
                    <ErrorMessage
                        errors={errors}
                        name="photoFile"
                        render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                        }
                    />
                </div>
                <div className="relative">
                    <textarea
                        placeholder="Deskripsikan barangmu!"
                        {...register("description", {
                            required: "Deskripsi harus diisi.",
                            maxLength: {
                                value: 200,
                                message: "Gausah panjang-panjang :D",
                            },
                        })}
                        name="description"
                        id="description"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.description && "bg-red-200"
                        }`}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="description"
                        render={({ messages }) =>
                            messages &&
                            Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                        }
                    />
                </div>

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
