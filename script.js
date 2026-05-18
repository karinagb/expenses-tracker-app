const incomeForm = document.querySelector('.income');
const expenseForm = document.querySelector('.expense');
const balanceValue = document.querySelector('.balanceValue');
const historyItem = document.querySelector('tbody');
let incomeTotal = 0;
let expenseTotal = 0;
let balance = 0;

function addIncome(e) {
  e.preventDefault();
  const incomeName = this.querySelector('[name=incomeName]').value;
  const incomeValue = Number(this.querySelector('[name=incomeValue]').value);

  const income = {
    description: incomeName,
    value: incomeValue,
  };

  incomeTotal = incomeTotal + incomeValue;

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

  this.reset();
  updateBalance();
  updateHistory(expense);
}

function updateBalance() {
  balance = incomeTotal - expenseTotal;

  return (balanceValue.innerHTML = `<p>$${balance}</p>`);
}

function updateHistory(transaction) {
  return (historyItem.innerHTML += `<tr>
        <td>${transaction.description}</td>
        <td>$${transaction.value}</td>
    </tr>`);
}

incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
