// Array of quotes
let quotes = [
    "The best way to get started is to quit talking and begin doing.",
    "Don’t let yesterday take up too much of today.",
    "It’s not whether you get knocked down, it’s whether you get up.",
    "If you are working on something exciting, it will keep you motivated."
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay"); // matches HTML
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Use innerHTML as required
    quoteDisplay.innerHTML = randomQuote;
}

// Function to add a new quote
function addQuote() {
    const newQuoteInput = document.getElementById("newQuoteText");
    const newQuote = newQuoteInput.value.trim();

    if (newQuote) {
        quotes.push(newQuote);
        newQuoteInput.value = "";
        displayRandomQuote();
    } else {
        alert("Please enter a valid quote.");
    }
}

// Event listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Event listener for "Add Quote" button
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
