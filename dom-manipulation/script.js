// Fetch quotes from mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // mock API
        const data = await response.json();

        // Convert API data to quote format
        const serverQuotes = data.slice(0, 5).map((item, index) => ({
            id: item.id,
            text: item.title,
            category: index % 2 === 0 ? "Motivation" : "Life"
        }));

        // Merge with local quotes
        resolveConflicts(serverQuotes);
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}
