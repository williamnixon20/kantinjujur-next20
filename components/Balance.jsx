import { useRouter } from "next/router";
import { formatter } from "../lib/formatterHelper";
const Balance = ({ balance }) => {
    const router = useRouter();
    const handleTransaction = () => {
        router.push({
            pathname: "/transaction",
        });
    };
    return (
        <div className="lg:col-span-12 col-span-1 bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h1 className="text-center mb-8 text-1xl font-semibold ">
                <h1 className="font-bold text-3xl md:text-4xl text-black tracking-wide mb-10 text-center">
                    Kotak Uang
                </h1>
            </h1>
            <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
                <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                    <div className="font-medium text-gray-700">
                        <h1 className="text-1xl">Saldo di kantin: </h1>
                        <span className="align-middle text-3xl">
                            {formatter.format(balance)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="justify-around flex">
                <button
                    className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 hover:bg-pink-900 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
                    onClick={handleTransaction}
                >
                    Ambil/Deposit Uang
                </button>
            </div>
        </div>
    );
};

export default Balance;
