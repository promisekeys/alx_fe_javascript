// Post a new quote to the mock server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quote)
        });

        const data = await response.json();
        console.log("Quote posted to server:", data);
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}

// Sync quotes with the server periodically
function syncQuotes() {
    // Fetch new quotes from server
    fetchQuotesFromServer();

    // Post locally added quotes to server (mock logic)
    const storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    storedQuotes.forEach(q => {
        if (!q.synced) {
            postQuoteToServer(q);
            q.synced = true; // Mark as synced
        }
    });

    // Save back updated quotes
    localStorage.setItem("quotes", JSON.stringify(storedQuotes));

    console.log("Quotes synced with server");
}

// Run sync every 30 seconds
setInterval(syncQuotes, 30000);
