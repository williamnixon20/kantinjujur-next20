import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";

import { NextApiRequest, NextApiResponse } from "next";
import React, { useEffect, useState } from "react";
import { NEXT_URL } from "../lib/urlVercel";
import {
    Header,
    Balance,
    ItemCard,
    AddItem,
    SearchFilter,
} from "../components";
import { Item } from "@prisma/client";
import { authenticateClient } from "../lib/authHelper";

interface HomeProps {
    dataProp: Item[];
    loggedInProp: boolean;
}

const Home = ({ dataProp, loggedInProp }: HomeProps) => {
    const [loggedIn, setLoggedIn] = useState(loggedInProp);
    const [balance, setBalance] = useState(0);
    const [items, setItems] = useState(dataProp);
    const [sortName, setSortName] = useState(false);
    const [sortDate, setSortDate] = useState(false);
    const [hasMounted, setHasMounted] = React.useState(false);

    useEffect(() => {
        setHasMounted(true);
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
        fetchBalance();
    }, []);

    if (!hasMounted) {
        return null;
    }
    return (
        <div className="container mx-auto px-10 mb-8">
            <Head>
                <title>Kantin Jujur</title>
                <meta name="description" content="Kantin Jujur" />
                <link rel="icon" href="/cash.png" />
            </Head>
            <main>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 grid-flow-row-dense">
                    <Header loggedIn={loggedIn}></Header>
                    {loggedIn && <Balance balance={balance}></Balance>}
                    {loggedIn && <AddItem></AddItem>}
                    <SearchFilter
                        items={items}
                        sortName={sortName}
                        sortDate={sortDate}
                        setSortName={setSortName}
                        setSortDate={setSortDate}
                        setItems={setItems}
                    ></SearchFilter>
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

export async function getServerSideProps({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    let loggedIn = await authenticateClient(req);
    // Fetch data from external API
    const { data } = await axios.get(`${NEXT_URL}/api/item`);
    const dataRes = data.data;
    // Pass data to the page via props
    return { props: { dataProp: dataRes, loggedInProp: loggedIn } };
}
