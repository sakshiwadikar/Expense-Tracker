export const validateEmail = (email) => {
    const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");

    let initials="";

    for(let i=0; i<Math.min(words.length,2); i++){
        initials += words[i][0];
    }
    return initials.toUpperCase();
};

// export const addThousandSeparator = (num) => {
//     if (num === null || isNaN(num)) return "";

//     const [integerPart, decimalPart] = num.toString().split(".");
//     const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//     return fractionalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
// };

export const addThousandSeparator = (num) => {
    if (num === null || isNaN(num)) return "0";

    const [integerPart, decimalPart] = num.toString().split(".");

    const formattedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

    return decimalPart
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
};