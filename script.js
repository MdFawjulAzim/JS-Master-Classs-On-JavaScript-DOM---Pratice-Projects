// Select UI elements &1st work
const balanceEl = document.getElementById("balance");
const transactionListEl = document.getElementById("transactionList");
const transactionForm= document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const submitButton = document.querySelector("button");
const cancelEditButton = document.getElementById("cancelEditButton");
const formTitle = document.getElementById("formTitle");

// Initialize an array to store transactions & 2nd work

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editTransactionId = null;








//add or update a transaction & 4th work
function handleTransaction(event) {
  event.preventDefault();
  const description = descriptionInput.value;
  const amount = +amountInput.value;

  if (description.trim() === "" || amount === 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  if (editTransactionId !== null) {
    const editTransaction = transactions.find((t) => t.id === editTransactionId);
    editTransaction.description = description;
    editTransaction.amount = amount;
    submitButton.textContent = "Add Transaction";
    formTitle.textContent = "Add New Transaction";
    editTransactionId = null;
    cancelEditButton.style.display = "none";
  } else {
    const transaction = {
      id: Date.now(),
      description,
      amount,
    };
    transactions.push(transaction);
  }

  saveTransactionsToLocalStorage();
  renderTransactions();
  updateBalance();

  // Clear input fields after adding or updating
  descriptionInput.value = "";
  amountInput.value = "";
}






//7th work

function renderTransactions() {
  transactionListEl.innerHTML = "";
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.amount>0?"income":"expense");
    li.innerHTML = `
      ${transaction.description}
      <span>${transaction.amount>0?"+":"-"}$${Math.abs(transaction.amount)}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${transaction.id})">Delete</button>
      <button class="btn btn-primary btn-sm" onclick="editTransaction(${transaction.id})">Edit</button>
    `;
    transactionListEl.appendChild(li);
  });
}

//8th work & update balance,income and expense totals

function updateBalance() {
  const amounts = transactions.map((transaction) => transaction.amount);
  
  const totalBalance = amounts.reduce((prev, curr) => prev + curr, 0).toFixed(2);
  balanceEl.innerText = totalBalance;
}


//9th work & edit a transaction

function editTransaction(id) {
  
  const transaction = transactions.find((t) => t.id === id);
  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;
  submitButton.textContent = "Update Transaction";
  formTitle.textContent = "Edit Transaction";
  editTransactionId = id
  cancelEditButton.style.display = "inline";
}

//cencel edit button

function cancelEdit() {
  descriptionInput.value = "";
  amountInput.value = "";
  submitButton.textContent = "Add Transaction";
  formTitle.textContent = "Add New Transaction";
  editTransactionId = null;
  cancelEditButton.style.display = "none";
}

//10th work & delete a transaction
function deleteTransaction(id) {
  const confirmation = confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (confirmation) {
    // Find the index of the transaction to delete
    const index = transactions.findIndex((t) => t.id === id);

    if (index !== -1) {
      // Remove the transaction from the array
      transactions.splice(index, 1);

      // Save, render, and update
      saveTransactionsToLocalStorage();
      renderTransactions();
      updateBalance();
    }
  }
}

//6th work

function saveTransactionsToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//Event Listener &3rd work  
transactionForm.addEventListener("submit", handleTransaction);
cancelEditButton.addEventListener("click", cancelEdit);

// Initialize
function init() {
  renderTransactions();
  updateBalance();
}

init();

 











// {// Select UI elements
// const balanceEl = document.getElementById("balance");
// const transactionListEl = document.getElementById("transactionList");
// const transactionForm = document.getElementById("transactionForm");
// const descriptionInput = document.getElementById("description");
// const amountInput = document.getElementById("amount");
// const submitButton = transactionForm.querySelector("button");
// const cancelEditButton = document.getElementById("cancelEditButton");
// const formTitle = document.getElementById("formTitle");

// // Initialize an array to store transactions
// let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// let editTransactionId = null;

// // Functions

// // Update balance, income, and expense totals
// function updateBalance() {
//   const amounts = transactions.map((transaction) => transaction.amount);
//   const totalBalance = amounts
//     .reduce((prev, curr) => prev + curr, 0)
//     .toFixed(2);
//   balanceEl.innerText = totalBalance;
// }

// // Add or update a transaction
// function handleTransaction(event) {
//   event.preventDefault();

//   const description = descriptionInput.value;
//   const amount = +amountInput.value;

//   if (description.trim() === "" || amount === 0) {
//     alert("Please add a valid description and amount");
//     return;
//   }

//   if (editTransactionId !== null) {
//     // Edit existing transaction
//     const transaction = transactions.find((t) => t.id === editTransactionId);
//     transaction.description = description;
//     transaction.amount = amount;
//     submitButton.textContent = "Add Transaction";
//     formTitle.textContent = "Add New Transaction";
//     editTransactionId = null; // Reset edit mode
//     cancelEditButton.style.display = "none";
//   } else {
//     // Add new transaction
//     const transaction = {
//       id: Date.now(),
//       description,
//       amount: amount,
//     };
//     transactions.push(transaction);
//   }

//   saveTransactionsToLocalStorage();
//   renderTransactions();
//   updateBalance();

//   // Clear input fields
//   descriptionInput.value = "";
//   amountInput.value = "";
// }

// // Delete a transaction by ID with a confirmation prompt
// function deleteTransaction(id) {
//   const confirmation = confirm(
//     "Are you sure you want to delete this transaction?"
//   );

//   if (confirmation) {
//     transactions = transactions.filter((transaction) => transaction.id !== id);
//     saveTransactionsToLocalStorage();
//     renderTransactions();
//     updateBalance();
//   }
// }

// // Edit a transaction
// function editTransaction(id) {
//   const transaction = transactions.find((t) => t.id === id);
//   descriptionInput.value = transaction.description;
//   amountInput.value = transaction.amount;

//   // Change the button text and form title to indicate edit mode
//   submitButton.textContent = "Edit Transaction";
//   formTitle.textContent = "Edit Transaction";
//   editTransactionId = id;
//   cancelEditButton.style.display = "inline";
// }

// function cancelEdit() {
//   descriptionInput.value = "";
//   amountInput.value = "";

//   submitButton.textContent = "Add Transaction";
//   formTitle.textContent = "Add New Transaction";
//   editTransactionId = null; // Reset the edit mode

//   cancelEditButton.style.display = "none";
// }

// // Render the transactions to the DOM
// function renderTransactions() {
//   transactionListEl.innerHTML = "";
//   transactions.forEach((transaction) => {
//     const li = document.createElement("li");
//     li.classList.add(transaction.amount > 0 ? "income" : "expense");
//     li.innerHTML = `
//             ${transaction.description} <span>${
//       transaction.amount > 0 ? "+" : "-"
//     }$${Math.abs(transaction.amount)}</span>
//             <button class="delete-btn" onclick="deleteTransaction(${
//               transaction.id
//             })">X</button>
//             <button class="edit-btn" onclick="editTransaction(${
//               transaction.id
//             })">Edit</button>
//         `;
//     transactionListEl.appendChild(li);
//   });
// }

// // Save transactions to localStorage
// function saveTransactionsToLocalStorage() {
//   localStorage.setItem("transactions", JSON.stringify(transactions));
// }

// // Event Listeners
// transactionForm.addEventListener("submit", handleTransaction);
// cancelEditButton.addEventListener("click", cancelEdit);

// // Initialize
// function init() {
//   renderTransactions();
//   updateBalance();
// }

// init();
// }