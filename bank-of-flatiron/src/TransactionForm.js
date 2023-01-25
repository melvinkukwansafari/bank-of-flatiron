import React, {useState} from "react";

function TransactionForm({ newData }) {
  const [formData, setFormData] = useState({
    date:"",
    description:"",
    category:"",
    amount:""
  });

  const [displayTransaction, setDisplayTransaction] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8001/transactions",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)

    })
    .then(response => response.json())
    .then(data => { newData(data);
        setDisplayTransaction(data);
    })


  }
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({...formData, [key]: value});

  }

  return (
    <div className="ui segment">
      <form onSubmit={ handleSubmit } className="ui form">
        <div className="inline fields">
          <input onChange={ handleChange }type="date" name="date" />
          <input onChange={ handleChange }type="text" name="description" placeholder="Description" />
          <input onChange={ handleChange }type="text" name="category" placeholder="Category" />
          <input onChange={ handleChange }type="number" name="amount" placeholder="Amount" step="0.01" />
        </div>
        <button className="ui button" type="submit" onClick={()=> setDisplayTransaction(formData)}>
          Add Transaction
        </button>
        {displayTransaction && (
          <div>
            <p>Date: {displayTransaction.date}</p>
            <p>Description: {displayTransaction.description}</p>
            <p>Category: {displayTransaction.category}</p>
            <p>Amount: {displayTransaction.amount}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;