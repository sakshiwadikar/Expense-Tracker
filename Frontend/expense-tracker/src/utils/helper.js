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


export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));
};


// export const prepareIncomeBarChartData =(data=[])=>{
//     const sortedData=[...data].sort((a,b)=> new Date(a.date)-new Date(b.date));
//     const chartData= sortedData.map((item)=>({
//         month: moment(item?.date).format('Do MMM'),
//         amount: item?.amount,
//         source: item?.source,

//     }));

//     return chartData;
// }



import moment from "moment";

export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  return data.map((item, index) => ({
    month: item.date
      ? moment(item.date).format("Do MMM")
      : `Item ${index + 1}`,
    amount: Number(item.amount) || 0,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};










// export const prepareExpenseBarChartData = (data = []) => {
//     const chartData = data.map((item) => ({
//         category: item?.category,
//         amount: item?.amount,
//     }));
//     return chartData;
// }

// export const prepareExpenseBarChartData = (data = []) => {
//   const monthlyTotals = {};

//   data.forEach((item) => {
//     const month = new Date(item.date).toLocaleString("default", {
//       month: "short",
//     });

//     monthlyTotals[month] =
//       (monthlyTotals[month] || 0) + item.amount;
//   });

//   return Object.entries(monthlyTotals).map(
//     ([month, amount]) => ({
//       month,
//       amount,
//     })
//   );
// };

