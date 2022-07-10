import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const Header = ({ loggedIn }) => {
    const router = useRouter();
    const handleRegister = () => {
        router.push({
            pathname: "/register",
        });
    };
    const handleLogin = () => {
        router.push({
            pathname: "/login",
        });
    };
    const handleLogout = () => {
        deleteCookie("token");
        router.reload();
    };
    return (
        <div className="lg:col-span-12 col-span-1 rounded-lg p-8 lg:p-8 pb-3 mb-2">
            {!loggedIn ? (
                <>
                    <motion.button
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{
                            scale: 0.9,
                            transition: { duration: 0.2 },
                        }}
                        onClick={handleRegister}
                        className="justify-center float-right py-3 px-4 mx-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Register
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
                        onClick={handleLogin}
                        className="justify-center float-right py-3 mx-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </motion.button>
                </>
            ) : (
                <motion.button
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.2 },
                    }}
                    onClick={handleLogout}
                    className="justify-center float-right py-3 mx-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Logout
                </motion.button>
            )}
        </div>
    );
};

export default Header;
