// Example quotes array (replace with your actual data)
let quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not watch the clock. Do what it does. Keep going.", category: "Motivation" }
];

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');

    // Extract unique categories
    const categories = [...new Set(quotes.map(q => q.category))];

    // Add each category as an option in the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option); // ✅ appendChild
    });

    // Restore last selected category if available
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
        categoryFilter.value = savedCategory;
        filterQuotes(); // Show quotes immediately for saved category
    }
}

function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;

    // Save selected category to localStorage ✅
    localStorage.setItem('selectedCategory', selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay'); // ✅
    let filteredQuotes;

    if (selectedCategory === 'all') {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)]; // ✅ Math.random
        quoteDisplay.innerHTML = `
            <p>${randomQuote.text}</p>
            <small>${randomQuote.category}</small>
        `;
    } else {
        quoteDisplay.innerHTML = `<p>No quotes available for this category.</p>`;
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', populateCategories);
