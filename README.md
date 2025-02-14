# Coding Blog

Welcome to my coding blog! This repository contains the source code for my personal coding blog website, which is hosted on GitHub Pages.

## Introduction

This repository is designed to share insights, tutorials, and experiences in the world of coding and software development. It includes various pages such as a homepage, an about page, a contact page, a playable Pac-Man game, and a page displaying the latest research papers from arXiv.

## Project Structure

- `index.html`: The main homepage of the coding blog.
- `about.html`: A page providing information about the blog and the author.
- `contact.html`: A page with a contact form and information on how to reach me.
- `pacman.html`: A page where users can play a Pac-Man game.
- `arxiv.html`: A page displaying the latest research papers from arXiv.
- `css/styles.css`: The stylesheet for the website, defining the layout and visual aspects.
- `js/scripts.js`: JavaScript file for adding interactivity to the website.
- `js/pacman.js`: JavaScript file for the Pac-Man game functionality.
- `js/fetchPapers.js`: JavaScript file for fetching and processing the latest research papers from arXiv.

## Live Demo

You can view the live version of the coding blog at: [https://jchrispolanco.github.io/website](https://jchrispolanco.github.io/website)

## Installation

To set up the code locally, follow these steps:

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/jchrispolanco/website.git
   ```
2. Navigate to the project directory:
   ```
   cd website
   ```
3. Open `index.html` in your web browser to view the homepage.

## Usage

To use the Pac-Man game, open `pacman.html` in your web browser. Use the arrow keys to control Pac-Man and navigate through the maze. The game will track your score based on the number of pellets eaten.

### Sample Usage

1. Open `pacman.html` in your web browser.
2. Use the arrow keys to move Pac-Man.
3. Avoid the ghosts and eat all the pellets to win the game.

## Report

### Case-Study Tutorial: Using AI Copilot

This section provides an in-depth case-study tutorial on how I used AI Copilot in solving three distinct problems. The AI tools employed include GitHub Copilot along with other AI-based code assistants. Throughout this process, I encountered both the benefits and challenges of integrating AI into my coding workflow.

#### Problem 1: GitHub Website for Your Coding Blog

**AI Tool Used**: GitHub Copilot

**Prompt Design**:
- **Initial Prompt**: "Create a homepage for a website for your coding blog."
- **Adjusted Prompt**: "Design the homepage to be expandable for future content and include links to additional pages."

**Steps**:
1. **Initial Generation**: The AI generated a straightforward homepage template. However, it required adjustments so that the design could easily scale with future content.
2. **Refinement Process**: I added clarifying details to the prompt, ensuring that the generated homepage included placeholders for upcoming sections like Pac-Man and arXiv pages.
3. **Final Outcome**: The homepage was successfully integrated and linked within the website structure, accommodating future expansion without major redesigns.

#### Problem 2: Game Coding - Pac-Man

**AI Tool Used**: GitHub Copilot

**Prompt Design**:
- **Initial Prompt**: "Add a new page to your website for Pac-Man."
- **Adjusted Prompt**: "Ensure the page allows users to play a Pac-Man game directly within the browser, complete with controls and a scoring mechanism."

**Steps**:
1. **Initial Generation**: The AI produced a basic framework that resembled the classic Pac-Man game.
2. **Interactive Enhancements**: Upon reviewing the output, I tweaked the prompt to emphasize user interactivity, ensuring the control scheme and game mechanics were intuitive.
3. **Testing and Iteration**: Several iterations were made to polish aspects such as collision detection and scoring, resulting in a fully playable and engaging game page.

#### Problem 3: Data Scaffolding from the Internet

**AI Tool Used**: GitHub Copilot

**Prompt Design**:
- **Initial Prompt**: "Add a new page to your website for auto-updating the latest papers from arXiv."
- **Adjusted Prompt**: "Create a dynamic page listing the latest research papers fetched automatically from arXiv, including titles, authors, abstracts, and direct links to PDFs. Ensure it updates daily."

**Steps**:
1. **Initial Generation**: The AI generated code to form the basic structure of a page that fetches and displays data from arXiv.
2. **Integration of API**: I refined the prompt to include specific search parameters (e.g., papers related to pancreatic cancer) and adapted the code in `fetchPapers.js` to parse XML output from the arXiv API.
3. **Automation Considerations**: I incorporated ideas for using GitHub Actions to automate the update process, ensuring the page displays the latest information daily.
4. **Final Outcome**: The arXiv page now lists the latest research with comprehensive details, processed solely by `fetchPapers.js`.

### Challenges with AI Copilot

While AI Copilot offers significant benefits by accelerating coding tasks, several challenges emerged during its use:

1. **Looping and Redundancy**:
   - **Issue**: At times, Copilot would get locked into repetitive loops where it endlessly generated similar or redundant code blocks.
   - **Implication**: This looping often resulted in unoptimized or repetitive code that did little to improve the functionality.
   - **Resolution**: I resolved these loops by terminating the suggestion, rephrasing the prompt with more context, or manually intervening to break the cycle.

2. **Contextual Misunderstanding**:
   - **Issue**: In some instances, Copilot misunderstood the broader context of the project, offering code that didn't align well with the existing structure.
   - **Resolution**: Refining the prompt with explicit details and including context from the surrounding codebase proved essential in guiding the AI to deliver more relevant suggestions.

3. **Changing AI Modes and Tools**:
   - **Strategy**: Switching between different AI modes (or even using alternative AI tools) has proven useful when one model becomes unresponsive or repetitive. Sometimes, a cloud-based AI service provided fresh insights compared to local suggestions.
   - **Benefit**: These adjustments helped in obtaining diverse perspectives and solutions that were more in tune with the project requirements.

4. **Manual Intervention**:
   - **Approach**: When AI-generated solutions were not satisfactory, I resorted to manual coding. This blend of AI assistance and manual refinement ensured high quality and maintainability of the code.
   - **Outcome**: Combining automated suggestions with thoughtful manual edits improved overall efficiency while maintaining code reliability.

### Additional Insights

Over the course of this project, using AI Copilot has taught me the importance of both leveraging technology and applying critical human judgment. While AI accelerates development, the nuances of design and context often require human oversight. Adopting a flexible strategy—switching modes, refining prompts, or even using cloud-based AI when local solutions stagnate—can make a significant difference in outcomes.

### Additional Information

- The website uses HTML, CSS, and JavaScript for its structure, styling, and interactivity.
- The Pac-Man game logic is implemented in `js/pacman.js`.

### arXiv Page

The `arxiv.html` page displays the latest research papers related to pancreatic cancer from arXiv. Its functionality is now implemented exclusively in `fetchPapers.js`, which fetches and formats the papers' information for display.

## Contributors

- **J. Christopher Polanco**: I'm a General Surgery resident and researcher with a unique background bridging medicine, public health, and data science. Currently pursuing a PhD in Epidemiology at Harvard University, I focus on leveraging epidemiological methods and big data analytics to improve surgical outcomes and public health understanding. Every aspect of this website was developed with significant assistance from AI tools.

Feel free to explore and contribute!