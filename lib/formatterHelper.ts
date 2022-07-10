export const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
});

export const formatToBase64 = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
};
