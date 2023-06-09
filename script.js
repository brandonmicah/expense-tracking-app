"use strict";
/*
Tasks:
- Balance is income minus expense
- Income = total of amounts entered without minus symbol
- Expense = total of amounts entered with a minus symbol as the first char
- descriptionInput....if empty promt with an you must enter description
- amountInput....if empty prompt with an you enter an ammount
- addButton.....
    - When enter is pressed or button is clicked a div is created, and the class for either income or expense is added. That div is added as a child of expenseHistory
    - the div created has the value of the descriptionInput on the left & the value of the amountInput on the right
    - If amount has negative symbol adjust the expense amount
    - If amount is positive add amount to the income value
*/

// Dom element easy access variables
const balanceTotal = document.getElementById("balanceTotal");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");
const expenseHistory = document.getElementById("expenseHistory");
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const expenseList = document.getElementById("expenseList");

// Variables
let balanceSum = 0;
let newExpenseTotal = 0;
let newIncomeTotal = 0;
let newBrowser = true;

restoreData();
function initVals() {
  expenseTotal.textContent = "$0";
  balanceTotal.textContent = "$0";
  incomeTotal.textContent = "$0";
}

function restoreData() {
  expenseList.innerHTML = localStorage.getItem("liData");
  balanceTotal.innerHTML = localStorage.getItem("balaceSum");
  expenseTotal.innerHTML = localStorage.getItem("newExpenseTotal");
  incomeTotal.innerHTML = localStorage.getItem("newIncomeTotal");
}

function saveData() {
  localStorage.setItem("liData", expenseList.innerHTML);
  localStorage.setItem("balaceSum", balanceTotal.innerHTML);
  localStorage.setItem("newExpenseTotal", expenseTotal.innerHTML);
  localStorage.setItem("newIncomeTotal", incomeTotal.innerHTML);
}

function addTrasnaction() {
  //   Missing input prompt
  if (amountInput.value === "") {
    alert("You need to enter an amount!");
  } else if (descriptionInput.value === "") {
    alert("You need to enter an a transaction description.");
  } else if (isNaN(amountInput.value)) {
    console.log(typeof amountInput.value);
    alert("Amount must be an integer!");
  }
  //   add or subtract amountInput to balance from balance.
  if (amountInput.value.startsWith("-") && amountInput.value != "") {
    // Remve the negative sign & assign input value to a variable
    let negativeInput = amountInput.value.slice(1);
    // convert the input into a interger
    let newExpense = Number(negativeInput);
    // Add the newExpense to the value of expense total
    newExpenseTotal += newExpense;
    // Convert the expenseTotal inner html to newExpenseTotal amount
    expenseTotal.innerHTML = `$${newExpenseTotal}`;
    // TODO --- Figure out how to store the value of the newExpenseTotal so that it's stays up to date every time something is added
    // Subtract the newExpense from the balanceSum
    balanceSum -= newExpense;
    // Change the display to the new value of balanceSum
    balanceTotal.innerHTML = `$${balanceSum}`;
    // ---creating new li in expenseHistory
    // Onclick create a new div
    const newLi = document.createElement("li");
    //   Add class income to new  div
    newLi.classList.add("expense");
    // Create new two new paragraphs elements
    const descriptionP = document.createElement("p");
    const amountP = document.createElement("p");
    // Add classes to p tags
    descriptionP.classList.add("description");
    amountP.classList.add("amount");
    // Add new paragraph elements to new div tag
    newLi.appendChild(descriptionP);
    newLi.appendChild(amountP);
    // add new Li to expenseList
    expenseList.appendChild(newLi);
    // Add the value to the inputs into the paragraphs inner html
    descriptionP.innerHTML = descriptionInput.value;
    amountP.innerHTML = `${amountInput.value}`;
  } else if (descriptionInput.value != "") {
    // ---changing the values------
    // Assign positiveInput variable to the value of the amount input
    let positiveInput = amountInput.value;
    // Convert the positiveInput to a number and store it in newIncome variable
    let newIncome = Number(positiveInput);
    // Add newIncome to newIncomeTotal
    newIncomeTotal += newIncome;
    // innerHTMl of incomeTotal = newIncomeTotal
    incomeTotal.innerHTML = `$${newIncomeTotal}`;
    // Add the newIncome to the balanceSum
    balanceSum += newIncome;
    // Change the display to the new value of balanceSum
    balanceTotal.innerHTML = `$${balanceSum}`;
    // ---creating new divs in expenseHistory---
    // Onclick create a new div
    const newLi = document.createElement("li");
    //   Add class income to new  div
    newLi.classList.add("income");
    // Create new two new paragraphs elements
    const descriptionP = document.createElement("p");
    const amountP = document.createElement("p");
    // Add classes to p tags
    descriptionP.classList.add("description");
    amountP.classList.add("amount");
    // Add new paragraph elements to new div tag
    newLi.appendChild(descriptionP);
    newLi.appendChild(amountP);
    // add new Li to expenseList
    expenseList.appendChild(newLi);
    // Add the value to the inputs into the paragraphs inner html
    descriptionP.innerHTML = descriptionInput.value;
    amountP.innerHTML = `${amountInput.value}`;
  }
  // reloadP();

  amountInput.value = "";
  descriptionInput.value = "";
  saveData();
}

// button click event
addButton.addEventListener("click", function () {
  addTrasnaction();
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTrasnaction();
  }
});

clearButton.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});
