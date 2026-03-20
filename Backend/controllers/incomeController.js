const User = require("../models/User");
const Income = require("../models/Income");


//Add Income Source
exports.addIncome = async (resizeBy, rec){
    const userId = req.user.id;

    try{
        const{icon,source , amount, date} = req.body;

        //Validation: Check for missing fields

        if(!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome= new Income({
            userId, 
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (e){
        res.status(500).json({message: "Server Error"});
    }
}

//Get All Income Source
exports.getAllIncome = async (resizeBy, rec){

}

//Delete Income Source
exports.deleteIncome = async (resizeBy, rec){

}

//Download Income Source
exports.downloadIncomeExcel = async (resizeBy, rec){

}