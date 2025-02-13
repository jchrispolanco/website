const fs = require('fs');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

async function fetchArXivPapers() {
  const baseUrl = "http://export.arxiv.org/api/query?";
  const query = {
    search_query: "abs:pancreas OR abs:pancreatic", // Search for papers mentioning "pancreas" or "pancreatic" in the abstract
    start: 0,
    max_results: 10,
    sortBy: "submittedDate",
    sortOrder: "descending"
  };

  const queryUrl = `${baseUrl}search_query=${encodeURIComponent(query.search_query)}&start=${query.start}&max_results=${query.max_results}&sortBy=${query.sortBy}&sortOrder=${query.sortOrder}`;

  try {
    const response = await fetch(queryUrl);
    if (!response.ok) throw new Error('Failed to fetch papers');
    
    const data = await response.text();
    const domParser = new JSDOM();
    const parser = new domParser.window.DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const entries = xml.getElementsByTagName("entry");

    let content = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Latest Papers on Pancreatic Cancer</title>
          <link rel="stylesheet" href="css/styles.css">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body>
          <header>
              <div class="container">
                  <h1>Latest Papers on Pancreatic Cancer</h1>
                  <nav>
                      <ul>
                          <li><a href="index.html">Home</a></li>
                          <li><a href="about.html">About</a></li>
                          <li><a href="pacman.html">Play Pac-Man</a></li>
                          <li><a href="arxiv.html">Latest Papers</a></li>
                      </ul>
                  </nav>
              </div>
          </header>
          <main>
              <div class="container">
                  <section id="papers">
                      <h2>Results</h2>
                      <div id="paper-list">
    `;

    if (entries.length === 0) {
      content += `
          <p>No papers found for the query "pancreas" or "pancreatic". Please try a different query.</p>
      `;
    } else {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.getElementsByTagName("title")[0]?.textContent || "No title available";
        const authors = Array.from(entry.getElementsByTagName("author")).map(author => author.getElementsByTagName("name")[0]?.textContent).join(", ") || "Unknown authors";
        const summary = entry.getElementsByTagName("summary")[0]?.textContent || "No summary available";
        const link = entry.getElementsByTagName("id")[0]?.textContent || "#";

        content += `
            <div class="paper">
                <h3>${title}</h3>
                <p><strong>Authors:</strong> ${authors}</p>
                <p>${summary.substring(0, 300)}...</p>
                <a href="${link}" target="_blank">Read more</a>
            </div>
        `;
      }
    }

    content += `
                      </div>
                  </section>
              </div>
          </main>
          <footer>
              <div class="container">
                  <p>&copy; 2025 My Coding Blog (J. Christopher Polanco).</p>
              </div>
          </footer>
      </body>
      </html>
    `;

    const outputPath = './arxiv.html';
    fs.writeFileSync(outputPath, content);
    console.log(`arxiv.html has been updated at: ${outputPath}`);
  } catch (error) {
    console.error("Error fetching papers:", error);
  }
}

fetchArXivPapers();