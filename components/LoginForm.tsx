import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Prisma, Item, PrismaClient } from "@prisma/client";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { NEXT_URL } from "../lib/urlVercel";

const validateId = (studentId: number) => {
    let stringId = studentId.toString();

    if (stringId.length !== 5 || stringId.includes(".")) {
        return false;
    }

    if (
        Number(stringId[0]) + Number(stringId[1]) + Number(stringId[2]) ===
        Number(stringId.slice(3))
    ) {
        return true;
    } else {
        return false;
    }
};

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data: any) => {
        try {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios.post(
                `${NEXT_URL}/api/auth/login`,
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
                    success: "Welcome Back!",
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
            <h1 className="font-bold text-3xl md:text-4xl text-white tracking-wide mb-10 text-center">
                Selamat datang kembali! Kamu siswa di sini bukan?
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
                                required: true,
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
                </div>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                        name="password"
                        id="password"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.password && "bg-red-200"
                        }`}
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
