function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;

    // Save to localStorage ✅
    localStorage.setItem('selectedCategory', selectedCategory);

    const quoteDisplay = document.getElementById('quoteDisplay'); // ✅ "quoteDisplay"
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
