// import React, { useState } from 'react';
// import Input from '../Inputs/Input';

// const AddIncomeForm = ({ onAddIncome }) => {
//   const [income, setIncome] = useState({
//     source: '',
//     amount: '',
//     date: '',
//   });

//   const handleChange = (key, value) => {
//     setIncome((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <div>
//       <Input
//         value={income.source}
//         onChange={({ target }) => handleChange('source', target.value)}
//         label="Income Source"
//         placeholder="Freelance, Salary, etc"
//         type="text"
//       />

//       <Input
//         value={income.amount}
//         onChange={({ target }) => handleChange('amount', target.value)}
//         label="Amount"
//         placeholder=""
//         type="number"
//       />

//       <Input
//         value={income.date}
//         onChange={({ target }) => handleChange('date', target.value)}
//         label="Date"
//         placeholder=""
//         type="date"
//       />

//       <div className="flex justify-end mt-6">
//         <button
//           type="button"
//           className="add-btn add-btn-fill"
//           onClick={() => onAddIncome(income)}
//         >
//           Add Income
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddIncomeForm;
import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome, initialData }) => {
  const [income, setIncome] = useState({
    source: initialData?.source || '',
    amount: initialData?.amount || '',
    date: initialData?.date ? initialData.date.split("T")[0] : '',
    icon: initialData?.icon || '',
  });

  const handleChange = (key, value) => {
    setIncome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>

      <EmojiPickerPopup
        icon={income.icon}
      onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
    />

      <Input
        value={income.source}
        onChange={(e) => handleChange('source', e.target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}
        >
          {initialData ? "Update Income" : "Add Income"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;