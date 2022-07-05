import { motion } from "framer-motion";
import { Header, Balance, ItemCard, AddItem } from "../components";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

import { Item } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { NEXT_URL } from "../lib/urlVercel";
interface props {
    data: Item[];
    message: string;
}

const Home = ({ data }: props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [balance, setBalance] = useState(0);
    const [items, setItems] = useState(data);
    const [sortName, setSortName] = useState(false);
    const [sortDate, setSortDate] = useState(false);

    const toggleSortName = () => {
        setSortName(!sortName);
        const sortedName = [...items].sort((a, b) =>
            sortName
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
        setItems(sortedName);
    };
    const toggleSortDate = () => {
        setSortDate(!sortDate);
        let sortedDate;
        if (sortDate) {
            sortedDate = [...items].sort(
                (a, b) =>
                    //@ts-ignore
                    new Date(a.createdAt) - new Date(b.createdAt)
            );
        } else {
            sortedDate = [...items].sort(
                (b, a) =>
                    //@ts-ignore
                    new Date(a.createdAt) - new Date(b.createdAt)
            );
        }
        setItems(sortedDate);
    };

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
                setLoggedIn(true);
            } catch (err) {
                setLoggedIn(false);
            }
        };
        const fetchBalance = async () => {
            const configData = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            try {
                const { data } = await axios.get(
                    `${NEXT_URL}/api/balance`,
                    configData
                );
                const amount = data.data;
                setBalance(amount);
            } catch (err) {
                setBalance(0);
            }
        };
        verify();
        fetchBalance();
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>Kantin Jujur</title>
                <meta name="description" content="Kantin Jujur Compfest" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 grid-flow-row-dense">
                    <Header loggedIn={loggedIn}></Header>
                    {loggedIn && <Balance balance={balance}></Balance>}
                    {loggedIn && <AddItem></AddItem>}
                    <div className="lg:col-span-12 col-span-1 bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 },
                            }}
                            className="w-full justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={toggleSortDate}
                        >
                            {sortDate ? (
                                <>Date Ascending</>
                            ) : (
                                <>Date Descending</>
                            )}
                        </motion.button>
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 },
                            }}
                            whileTap={{
                                scale: 0.9,
                                transition: { duration: 0.2 },
                            }}
                            className="w-full justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={toggleSortName}
                        >
                            {sortName ? (
                                <>Name Ascending</>
                            ) : (
                                <>Name Descending</>
                            )}
                        </motion.button>
                    </div>
                    {items.map((item, index) => (
                        <ItemCard item={item} key={index} loggedIn={loggedIn} />
                    ))}
                </div>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
};

export default Home;

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await axios.get(`${NEXT_URL}/api/item`);
    const dataRes = res.data.data;
    // Pass data to the page via props
    return { props: { data: dataRes } };
}
