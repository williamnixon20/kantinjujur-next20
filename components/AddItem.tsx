import React from "react";
import { useRouter } from "next/router";

const AddItem = ({}) => {
    const router = useRouter();
    const handleTransaction = () => {
        router.push({
            pathname: "/additem",
        });
    };
    return (
        <>
            <div className="lg:col-span-12 col-span-1 bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h1
                    className="transition duration-700 text-center mb-8 cursor-pointer
        hover:text-pink-600 text-1xl font-semibold "
                >
                    <h1 className="font-bold text-3xl md:text-4xl text-black tracking-wide mb-10 text-center">
                        Berminat untuk menjual barangmu?
                    </h1>
                </h1>
                <div className="justify-around flex">
                    <button
                        className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 hover:bg-pink-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
                        onClick={handleTransaction}
                    >
                        Yes please!
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddItem;
