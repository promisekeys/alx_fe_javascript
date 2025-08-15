// ===== Quotes Array with text and category =====
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Resilience" },
    { text: "If you are working on something exciting, it will keep you motivated.", category: "Passion" }
];

// ===== Save Quotes to Local Storage =====
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ===== Show a Random Quote =====
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteDisplay.innerHTML = `"${randomQuote.text}" <br><em>- ${randomQuote.category}</em>`;

    // Save last viewed quote in Session Storage
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ===== Create Add Quote Form =====
function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.style.marginTop = "20px";

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// ===== Add New Quote =====
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        showRandomQuote();
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// ===== Export Quotes to JSON File =====
function exportToJsonFile() {
    const jsonStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();

    URL.revokeObjectURL(url);
}

// ===== Import Quotes from JSON File =====
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);

            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid JSON format. Please upload a valid quotes file.");
            }
        } catch (error) {
            alert("Error reading JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// ===== Create Show Quote Button =====
function createShowQuoteButton() {
    const button = document.createElement("button");
    button.textContent = "Show New Quote";
    button.addEventListener("click", showRandomQuote);
    document.body.appendChild(button);
}

// ===== Create Import/Export Buttons =====
function createImportExportButtons() {
    const exportBtn = document.createElement("button");
    exportBtn.textContent = "Export Quotes";
    exportBtn.addEventListener("click", exportToJsonFile);

    const importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = ".json";
    importInput.addEventListener("change", importFromJsonFile);

    document.body.appendChild(exportBtn);
    document.body.appendChild(importInput);
}

// ===== Initialize Page =====
document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.createElement("div");
    quoteDisplay.id = "quoteDisplay";
    quoteDisplay.style.marginBottom = "20px";
    quoteDisplay.style.fontSize = "18px";
    quoteDisplay.style.fontStyle = "italic";
    document.body.appendChild(quoteDisplay);

    createShowQuoteButton();
    createAddQuoteForm();
    createImportExportButtons();

    // Load last viewed quote from Session Storage if available
    const lastQuote = sessionStorage.getItem("lastQuote");
    if (lastQuote) {
        const parsedQuote = JSON.parse(lastQuote);
        quoteDisplay.innerHTML = `"${parsedQuote.text}" <br><em>- ${parsedQuote.category}</em>`;
    } else {
        showRandomQuote();
    }
});
