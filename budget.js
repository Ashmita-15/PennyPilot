document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budget-form');
    const categoryList = document.getElementById('category-list');
    const budgetSet = document.getElementById('budget');
    const expensesSet = document.getElementById('expenses');
    const balanceTotal = document.getElementById('tot');

    let totalBudget = 0;
    let totalSpent = 0;

    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid budget amount');
            return;
        }

        const categoryItem = document.querySelector(`[data-category="${category}"] .budget-amount`);
        categoryItem.textContent = `$${amount.toFixed(2)}`;

        totalBudget += amount;
        budgetSet.textContent = `Budget set: $${totalBudget.toFixed(2)}`;
        updateBalance();
        document.getElementById('amount').value = '';
    });

    categoryList.addEventListener('click', function(event) {
        const target = event.target;
        const categoryItem = target.closest('li');
        const budgetAmount = categoryItem.querySelector('.budget-amount');

        if (target.classList.contains('edit-button')) {
            const newAmount = prompt('Enter new budget amount:', parseFloat(budgetAmount.textContent.slice(1)));

            if (newAmount !== null && !isNaN(newAmount) && newAmount > 0) {
                const difference = newAmount - parseFloat(budgetAmount.textContent.slice(1));
                budgetAmount.textContent = `$${parseFloat(newAmount).toFixed(2)}`;

                totalBudget += difference;
                budgetSet.textContent = `Budget set: $${totalBudget.toFixed(2)}`;
                updateBalance();
            }
        }

        if (target.classList.contains('delete-button')) {
            const amount = parseFloat(budgetAmount.textContent.slice(1));
            budgetAmount.textContent = '';
            totalBudget -= amount;
            budgetSet.textContent = `Budget set: $${totalBudget.toFixed(2)}`;
            updateBalance();
        }
    });

    function updateBalance() {
        balanceTotal.textContent = `$${(2168000 - totalSpent + totalBudget).toFixed(2)}`;
    }
});
