const xlsx= require("xlsx");
const {Expense} = require("../models/Expense");


//Add Expense Source
exports.addExpense = async (req, res)=>{
    console.log("BODY:", req.body);   // ✅ add here
    console.log("USER:", req.user);   // ✅ add here

    const userId = req.user.id;

    try{
        const{icon,category , amount, date} = req.body;

        //Validation: Check for missing fields

        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense= new Expense({
            userId, 
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (e){
        console.log("ERROR:", e); // 👈 add this
        res.status(500).json({message: "Server Error"});
    }
};

//Get All Expense Source
exports.getAllExpense = async (req, res)=> {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    } catch (error)
    {
        res.status(500).json({ message: "Server Error"});

    }
};
// exports.getAllIncome = async (req, res) => {
//     try {
//         console.log("REQ.USER:", req.user); // debug line

//         const userId = req.user.id;

//         const income = await Income.find({ userId }).sort({ date: -1 });

//         res.json(income);

//     } catch (error) {
//         console.log("ERROR:", error); // 👈 THIS tells us exact problem
//         res.status(500).json({ message: "Server Error" });
//     }
// };


//Delete Income Source
// exports.deleteIncome = async (req, res)=> {
//     const userId= req.user.id;
    
//     try{
//         await Income.findByIdAndDelete(req.params.id);
//         res.json({message: "Income deleted successfully"});
        
//     } catch (e){
//         res.status(500).json({message: "Server Error"})
//     }
// };

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.findById(req.params.id);

        // Check if expense exists
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Check ownership
        if (expense.userId.toString() !== userId) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await expense.deleteOne();

        res.json({ message: "Expense deleted successfully" });

    } catch (e) {
        res.status(500).json({ message: "Server Error" });
    }
};

//Download Income Source
exports.downloadExpenseExcel = async (req, res)=> {
    const userId = req.user.id;

    // try{
    //     const income = (await Income.find({userId})).sort({date: -1});

    //     //Prepare data for excel
    //     const data = income.map((item)=>({
    //         Source: item.source,
    //         Amount: item.amount,
    //         Date: item.date,

    //     }));

    //     const wb= xlsx.utils.book_new();
    //     const ws= xlsx.utils.json_to_sheet(data);
    //     xlsx.utils.book_append_sheet(wb, ws, "Income");
    //     xlsx.writeFile(wb, 'income_details.xlsx');
    //     res.download('income_details.xlsx')
    // } 
        try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        if (!expense.length) {
            return res.status(404).json({
                message: "No expense records found",
            });
        }

        const data = expense.map((item) => ({
            Source: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const buffer = xlsx.write(wb, {
            type: "buffer",
            bookType: "xlsx",
        });

        // confirmation headers
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=expense_details.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        console.log("Excel file generated successfully"); // backend confirmation

        res.status(200).send(buffer);

    }
    catch (e){
        res.status(500).json({message: "Server Error"});
    }
};

 