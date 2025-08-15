let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The best way to predict the future is to create it.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do one thing every day that scares you.", category: "Motivation" }
];

// Load last selected category from localStorage
let lastCategory = localStorage.getItem('selectedCategory') || "all";

// Save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" — <em>${quote.category}</em>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote)); // Example sessionStorage usage
}

// Add a new quote
function addQuote(event) {
    event.preventDefault();
    const text = document.getElementById('quoteText').value;
    const category = document.getElementById('quoteCategory').value;

    quotes.push({ text, category });
    saveQuotes();
    populateCategories();
    alert('Quote added successfully!');

    document.getElementById('quoteForm').reset();
}

// Populate categories dynamically
function populateCategories() {
    const categorySelect = document.getElementById('categoryFilter');
    const categories = ["all", ...new Set(quotes.map(q => q.category))];

    categorySelect.innerHTML = categories.map(cat =>
        `<option value="${cat}" ${cat === lastCategory ? 'selected' : ''}>${cat}</option>`
    ).join('');
}

// Filter quotes by category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    lastCategory = selectedCategory;
    localStorage.setItem('selectedCategory', selectedCategory);

    let filteredQuotes = selectedCategory === "all"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    const display = document.getElementById('quoteDisplay');
    display.innerHTML = filteredQuotes.length
        ? filteredQuotes.map(q => `"${q.text}" — <em>${q.category}</em>`).join('<br><br>')
        : "No quotes available in this category.";
}

// Export quotes to JSON
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategories();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format.');
            }
        } catch {
            alert('Error reading JSON file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize on page load
window.onload = function() {
    populateCategories();
    filterQuotes(); // Apply last saved category filter
};
