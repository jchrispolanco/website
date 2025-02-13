document.addEventListener("DOMContentLoaded", function () {
  const paperList = document.getElementById("paper-list");

  async function loadMorePapers() {
    try {
      const response = await fetch('http://export.arxiv.org/api/query?search_query=abs:pancreatic&start=10&max_results=10');
      if (!response.ok) throw new Error('Failed to fetch more papers');

      const data = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      const entries = xml.getElementsByTagName("entry");

      for (let entry of entries) {
        const title = entry.getElementsByTagName("title")[0]?.textContent || "No title available";
        const authors = Array.from(entry.getElementsByTagName("author")).map(author => author.getElementsByTagName("name")[0]?.textContent).join(", ") || "Unknown authors";
        const summary = entry.getElementsByTagName("summary")[0]?.textContent || "No summary available";
        const link = entry.getElementsByTagName("id")[0]?.textContent || "#";

        const paperDiv = document.createElement("div");
        paperDiv.classList.add("paper");
        paperDiv.innerHTML = `
          <h3>${title}</h3>
          <p><strong>Authors:</strong> ${authors}</p>
          <p>${summary.substring(0, 300)}...</p>
          <a href="${link}" target="_blank">Read more</a>
        `;

        paperList.appendChild(paperDiv);
      }
    } catch (error) {
      console.error("Error loading more papers:", error);
    }
  }

  // Add a "Load More" button at the bottom of the page
  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Load More Papers";
  loadMoreButton.onclick = loadMorePapers;
  document.querySelector("main .container").appendChild(loadMoreButton);
});