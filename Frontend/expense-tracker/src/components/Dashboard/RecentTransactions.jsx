import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";    
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../../utils/helper";
import {LuArrowRight, LuHandCoins, LuWalletMinimal } from "react-icons/lu";
// import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import moment from "moment";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg ">Recent Transactions</h5>
                <button className="card-btn"
                    onClick={onSeeMore}
                >
                    See More <LuArrowRight className="text-base"    />
                </button>
            </div>

            <div className="mt-6">
                {transactions.slice(0,5)?.map((item)=>(
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type === "expense" ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}
export default RecentTransactions;