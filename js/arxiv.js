document.addEventListener("DOMContentLoaded", function () {
    const paperList = document.getElementById("paper-list");
  
    async function loadMorePapers() {
      const response = await fetch('http://export.arxiv.org/api/query?search_query=all:machine_learning&start=10&max_results=10');
      const data = await response.text();
      // Parse and append more papers to the paper-list dynamically...
    }
  
    // Add interactivity (e.g., button click to load more papers)
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = "Load More Papers";
    loadMoreButton.onclick = loadMorePapers;
    paperList.appendChild(loadMoreButton);
  });  