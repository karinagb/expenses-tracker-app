const incomeForm = document.querySelector('.income');
const expenseForm = document.querySelector('.expense');
const balanceValue = document.querySelector('.balanceValue');
const historyItem = document.querySelector('tbody');
let income = {};
let expense = {};
let incomeValue = 0;
let expenseValue = 0;
let newBalance = 0;

function addIncome(e) {
  e.preventDefault();
  incomeName = this.querySelector('[name=incomeName]').value;
  incomeValue = Number(this.querySelector('[name=incomeValue]').value);

  income = {
    description: incomeName,
    value: incomeValue,
  };

  this.reset();
  updateBalance();
  updateHistory(income);
}

function addExpense(e) {
  e.preventDefault();
  expenseName = this.querySelector('[name=expenseName]').value;
  expenseValue = Number(this.querySelector('[name=expenseValue]').value);

  expense = {
    description: expenseName,
    value: expenseValue,
  };

  this.reset();
  updateBalance();
  updateHistory(expense);
}

function updateBalance() {
  newBalance = incomeValue - expenseValue;
  return (balanceValue.innerHTML = `<p>$${newBalance}</p>`);
}

function updateHistory(transaction) {
  return (historyItem.innerHTML += 
    `<tr>
        <td>${transaction.description}</td>
        <td>$${transaction.value}</td>
    </tr>`);
}

incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
