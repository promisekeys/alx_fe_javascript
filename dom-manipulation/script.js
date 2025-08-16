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

    // ✅ UI notification
    alert("Quotes synced with server!");
}

// Run sync every 30 seconds
setInterval(syncQuotes, 30000);
