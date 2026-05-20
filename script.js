const incomeForm = document.querySelector('.newIncome');
const expenseForm = document.querySelector('.newExpense');
const balanceValue = document.querySelector('.balanceValue');
const historyItems = document.querySelector('tbody');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const clearButton = document.querySelector('[name=clear]');

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
    type: 'income',
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
    type: 'expense',
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
  historyItems.innerHTML = '';

  transactions.forEach((transaction, i) => {
    historyItems.innerHTML += `<tr>
        <td>${transaction.description}</td>
        ${transaction.type === 'income' ? 
            `<td class='income'>+ $${transaction.value}</td>` : 
            `<td class='expense'>- $${transaction.value}</td>`} 
        <td><button data-index=${i}>🗑</button></td>
    </tr>`;
  });
}

function removeTransaction(e) {
  const index = e.target.dataset.index;

  if (e.target.matches('button[data-index]')) {
    if (transactions[index].type === 'expense') {
      expenseTotal = expenseTotal - transactions[index].value;
      localStorage.setItem('expenseTotal', JSON.stringify(expenseTotal));
    } else if (transactions[index].type === 'income') {
      incomeTotal = incomeTotal - transactions[index].value;
      localStorage.setItem('incomeTotal', JSON.stringify(incomeTotal));
    }
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  renderHistory(transactions);
  updateBalance();
}

function clearAllData() {
  incomeTotal = 0;
  expenseTotal = 0;
  balance = 0;
  transactions.length = 0;

  localStorage.removeItem('incomeTotal');
  localStorage.removeItem('expenseTotal');
  localStorage.removeItem('balance');
  localStorage.removeItem('transactions');

  renderBalance(balance);
  renderHistory(transactions);
}
incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);
clearButton.addEventListener('click', clearAllData);
document.addEventListener('click', removeTransaction);
