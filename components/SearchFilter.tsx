import { motion } from "framer-motion";

const SearchFilter = ({
    setSortName,
    setSortDate,
    sortName,
    sortDate,
    setItems,
    items,
}: any) => {
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
    return (
        <div className="lg:col-span-12 col-span-1 bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
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
                {sortDate ? <>Date Ascending</> : <>Date Descending</>}
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
                {sortName ? <>Name Ascending</> : <>Name Descending</>}
            </motion.button>
        </div>
    );
};

export default SearchFilter;
