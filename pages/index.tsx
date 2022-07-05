import type { GetServerSideProps } from "next";
import { Header, Balance, ItemCard, AddItem } from "../components";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { Item } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface props {
    data: Item[];
    message: string;
}

const Home = ({ data }: props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [balance, setBalance] = useState(0);

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
                    "http://localhost:3000/api/balance",
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
                    "http://localhost:3000/api/balance",
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
                    {data.map((item, index) => (
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
    const res = await axios.get(`http://localhost:3000/api/item`);
    const dataRes = res.data.data;
    // Pass data to the page via props
    return { props: { data: dataRes } };
}
