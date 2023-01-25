import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
import SearchBar from "./SearchBar";
import TransactionForm from "./TransactionForm";

function AccountContainer() {
const [transactions, setTransactions] = useState([])
useEffect(() => {
  fetch("http://localhost:8001/transactions")
  .then((response) => response.json())
  .then((data) => setTransactions(data))
}, [])

function updatedTransactions(newTransactions){
  const updatedTransactionsArray = [...transactions, newTransactions]
  setTransactions(updatedTransactionsArray)
}

  return (
    <div>
      <SearchBar />
      <TransactionForm newData={updatedTransactions}/>
      <TransactionList  arrayOfAllTransaction={transactions}/>
    </div>
  );
}

export default AccountContainer;