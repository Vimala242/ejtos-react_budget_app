import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const handleBudgetChange = (event) => {
        const newValue = parseInt(event.target.value);

        if (newValue > 20000) {
            alert("Budget cannot exceed £20,000");
            setNewBudget(20000);
        } else if (newValue < totalExpenses) {
            alert("Budget cannot be lower than total spending £" + totalExpenses);
            setNewBudget(totalExpenses);
        } else {
            setNewBudget(newValue);
        }

    }

    const saveBudget = () => {
        // Dispatch action to update budget in Redux store
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    };

    return (
<div className='alert alert-secondary'>
<span>Budget: £</span>
<input type="number" step="10" value={newBudget} onChange={handleBudgetChange}></input>
<button onClick={saveBudget}>Save</button>
</div>
    );
};
export default Budget;
