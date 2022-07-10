export const validateId = (studentId: number) => {
    let stringId = studentId.toString();

    if (stringId.length !== 5 || stringId.includes(".")) {
        return "Id harus numerik dan memiliki 5 digit";
    }

    if (
        Number(stringId[0]) + Number(stringId[1]) + Number(stringId[2]) ===
        Number(stringId.slice(3))
    ) {
        return true;
    } else {
        return "Tidak memenuhi syarat!";
    }
};
