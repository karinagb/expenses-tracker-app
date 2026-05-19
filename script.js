const incomeForm = document.querySelector('.income');
const expenseForm = document.querySelector('.expense');
const balanceValue = document.querySelector('.balanceValue');
const historyItems = document.querySelector('tbody');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

let balance = JSON.parse(localStorage.getItem('balance')) || 0;
let incomeTotal = JSON.parse(localStorage.getItem('incomeTotal')) || 0;
let expenseTotal = JSON.parse(localStorage.getItem('expenseTotal')) || 0;

renderBalance(balance);
renderHistory(transactions);

function addIncome(e) {
  e.preventDefault();
  const incomeName = this.querySelector('[name=incomeName]').value;
  const incomeValue = Number(this.querySelector('[name=incomeValue]').value);

  const income = {
    description: incomeName,
    value: incomeValue,
  };

  incomeTotal = incomeTotal + incomeValue;
  localStorage.setItem('incomeTotal', JSON.stringify(incomeTotal));

  this.reset();
  updateBalance();
  updateHistory(income);
}

function addExpense(e) {
  e.preventDefault();
  const expenseName = this.querySelector('[name=expenseName]').value;
  const expenseValue = Number(this.querySelector('[name=expenseValue]').value);

  const expense = {
    description: expenseName,
    value: expenseValue,
  };

  expenseTotal = expenseTotal + expenseValue;
  localStorage.setItem('expenseTotal', JSON.stringify(expenseTotal));

  this.reset();
  updateBalance();
  updateHistory(expense);
}

function updateBalance() {
  balance = incomeTotal - expenseTotal;
  localStorage.setItem('balance', JSON.stringify(balance));
  renderBalance(balance);
}

function renderBalance(balance) {
  return (balanceValue.innerHTML = `<p>$${balance}</p>`);
}

function updateHistory(transaction) {
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderHistory(transactions);
}

function renderHistory(transactions) {
  historyItems.innerHTML = ' ';

  transactions.forEach((transaction) => {
    historyItems.innerHTML += `<tr>
        <td>${transaction.description}</td>
        <td>$${transaction.value}</td>
    </tr>`;
  });
}

incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
