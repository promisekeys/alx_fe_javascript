// Mock API endpoint
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Assume each post has 'title' as text and 'body' as category for demo
        const serverQuotes = data.slice(0, 5).map(post => ({
            text: post.title,
            category: post.body.substring(0, 10) || "General",
            synced: true
        }));

        // Merge with local quotes (conflict resolution: prefer server)
        let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
        const merged = [...serverQuotes, ...localQuotes.filter(lq => 
            !serverQuotes.some(sq => sq.text === lq.text)
        )];

        localStorage.setItem("quotes", JSON.stringify(merged));

        alert("Quotes fetched & synced from server!");
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Post new quote to server
async function postQuoteToServer(quote) {
    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quote),
        });
        console.log("Quote posted:", quote);
    } catch (error) {
        console.error("Error posting quote:", error);
    }
}

// Sync function
async function syncQuotes() {
    await fetchQuotesFromServer();

    // Post any unsynced quotes
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    for (let q of quotes) {
        if (!q.synced) {
            await postQuoteToServer(q);
            q.synced = true;
        }
    }

    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes synced with server!");
}

// Run sync every 30 seconds
setInterval(syncQuotes, 30000);

// Run once at page load
document.addEventListener("DOMContentLoaded", () => {
    syncQuotes();
});
