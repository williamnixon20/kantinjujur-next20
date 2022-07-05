import { RegisterForm } from "../components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const addItem = () => {
    return (
        <div className="container mx-auto ">
            <div className="lg:col-span-12 col-span-1 bg-gray-700 shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                <RegisterForm></RegisterForm>
            </div>
        </div>
    );
};

export default addItem;
