const xlsx = require("xlsx");
const  Expense  = require("../models/Expense");


// Add Expense
exports.addExpense = async (req, res) => {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const userId = req.user._id;   // ✅ FIXED

    try {

        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();

        res.status(200).json(newExpense);

    } catch (e) {

        console.log("ERROR:", e);

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Get All Expenses
exports.getAllExpense = async (req, res) => {

    const userId = req.user._id;   // ✅ FIXED

    try {

        const expense = await Expense
            .find({ userId })
            .sort({ date: -1 });

        res.json(expense);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }
};


// Delete Expense
exports.deleteExpense = async (req, res) => {

    const userId = req.user._id;   // ✅ FIXED

    try {

        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        if (expense.userId.toString() !== userId.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await expense.deleteOne();

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (e) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};


// Download Excel
exports.downloadExpenseExcel = async (req, res) => {

    const userId = req.user._id;   // ✅ FIXED

    try {

        const expense = await Expense
            .find({ userId })
            .sort({ date: -1 });

        if (!expense.length) {
            return res.status(404).json({
                message: "No expense records found"
            });
        }

        const data = expense.map(item => ({
            Source: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const buffer = xlsx.write(wb, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=expense_details.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        console.log("Excel file generated successfully");

        res.status(200).send(buffer);

    } catch (e) {

        res.status(500).json({
            message: "Server Error"
        });
    }
};