import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Prisma, Item, PrismaClient } from "@prisma/client";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { NEXT_URL } from "../lib/urlVercel";
import { ErrorMessage } from "@hookform/error-message";
import { validateId } from "../lib/validateHelper";

export default function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
    });

    const create = async (data: any) => {
        try {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.post(
                `${NEXT_URL}/api/auth/register`,
                JSON.stringify(data),
                configData
            );
        } catch (error: any) {
            throw new Error(error.response.data.error);
        }
    };
    const onSubmit = async (data: any) => {
        console.log("received!");
        try {
            await toast.promise(
                create(data),
                {
                    loading: "Posting...",
                    success: "Welcome! Silahkan login.",
                    error: "Oops, ada yang sesuatu yang salah.",
                },
                {
                    duration: 5000,
                }
            );
            router.push({
                pathname: "/login",
            });
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className="max-w-md mx-auto px-4">
            <h1 className="font-bold text-3xl md:text-4xl text-white tracking-wide mb-10 text-center">
                Silahkan isi form berikut untuk jadi member!
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6 shadow-lg p-10 bg-white rounded-lg"
            >
                <Toaster />
                <div>
                    <label htmlFor="studentId" className="sr-only">
                        Student ID
                    </label>
                    <div className="relative">
                        <input
                            {...register("studentId", {
                                required: "studentId wajib diisi!",
                                validate: validateId,
                            })}
                            type="number"
                            name="studentId"
                            id="studentId"
                            placeholder="Student Id"
                            className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                                errors.studentId && "bg-red-200"
                            }`}
                        />
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="studentId"
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
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: "Username wajib diisi!",
                        })}
                        name="username"
                        id="username"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.username && "bg-red-200"
                        }`}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="username"
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
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password wajib diisi!",
                        })}
                        name="password"
                        id="password"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.password && "bg-red-200"
                        }`}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="password"
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
