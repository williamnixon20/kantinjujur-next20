import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Prisma, Item, PrismaClient } from "@prisma/client";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function ItemForm() {
    const router = useRouter();
    const [balance, setBalance] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchBalance = async () => {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            try {
                const { data } = await axios.get(
                    "http://localhost:3000/api/balance",
                    configData
                );
                const amount = data.data;
                setBalance(amount);
            } catch (err) {
                setBalance(0);
            }
        };
        fetchBalance();
    }, []);

    const create = async (data: any) => {
        try {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            data["amount"] = parseFloat(data["amount"]);
            await axios.post(
                "http://localhost:3000/api/balance",
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
                    success: "Transaksi berhasil!",
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
                Saldo kantin jujur sekarang adalah Rp. {balance}.
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6 shadow-lg p-10 bg-white rounded-lg"
            >
                <Toaster />
                <div className="relative">
                    <input
                        type="number"
                        placeholder="Nominal ( + (ambil) / - (tarik))"
                        {...register("amount", {
                            required: true,
                            min: -balance,
                        })}
                        name="amount"
                        id="amount"
                        className={`font-bold block w-full shadow-sm py-3 px-4 mb-2 placeholder-gray-500 rounded-md ${
                            errors.amount && "bg-red-200"
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
