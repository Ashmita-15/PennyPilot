document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const totalExpenseElem = document.getElementById('expense');
    const expenseList = document.getElementById('expense-list');

    let totalExpense = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            const listItem = document.createElement('li');
            
            const descriptionSpan = document.createElement('span');
            descriptionSpan.className = 'item-description';
            descriptionSpan.textContent = description;

            const amountSpan = document.createElement('span');
            amountSpan.className = 'item-amount';
            amountSpan.textContent = `$${amount.toFixed(2)}`;

            listItem.appendChild(descriptionSpan);
            listItem.appendChild(amountSpan);

            expenseList.appendChild(listItem);

            totalExpense += amount;
            totalExpenseElem.textContent = `$${totalExpense.toFixed(2)}`;

            descriptionInput.value = '';
            amountInput.value = '';
        }
    });
});
