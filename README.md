# Calendar Highlighter

This is a lightweight calendar highlighter app in which you can customize the colors. The purpose for this app is because there aren't many apps like this out there. It provides a purely vanilla web environment designed for tracking attendance, absences, and holidays with a high-contrast Neo Brutalist aesthetic.

## Key Features

-   **Interactive Grid**: A fully responsive monthly calendar grid.
-   **Dynamic Color Customization**: Click the color swatches in the legend to open a picker and change category colors on the fly.
-   **High-Impact Highlighting**: Click any day to cycle through your custom highlight categories.
-   **Persistent Activity**: Highlights stay mapped to their specific dates even when navigating between different months.
-   **Editable Legends**: Double-click labels to rename categories to suit your specific workflow.
-   **PNG Export**: High-resolution image capture of the calendar grid via `html2canvas`.

## Tech Stack & Dependencies

-   **HTML5 & CSS3**: Structured with semantic markup and styled with custom Neo Brutalist layout rules (heavy borders, sharp shadows).
-   **Vanilla JavaScript**: ES6+ logic manages state without external frameworks.
-   **Space Grotesk**: Modern typography loaded via Google Fonts.
-   **html2canvas (CDN)**: Utilized to generate high-quality PNG exports directly in the browser.

## Project Structure Overview

```text
calendar-highlighter/
├── index.html       # Layout structure and core entry point.
├── styles.css       # Neo Brutalist design system and typography.
├── main.js          # App state, grid rendering, and customization logic.
├── README.md        # Project documentation.
└── .gitignore       # Version control exclusions.
```

## Setup and Installation

This project requires zero dependencies or build steps. However, due to browser security (CORS) restrictions affecting the image export, it is best run through a local server.

1.  **Clone/Download** the directory.
2.  **Run a Local Server**:
    ```bash
    # Example using Python
    python3 -m http.server 8000
    ```
3.  **View in Browser**: Open `http://localhost:8000`.

## Usage Guide

-   **Navigating**: Use the bold `<` and `>` buttons to move between months. Highlights are saved per date and will reappear when you return to a month.
-   **Highlighting Days**: Click a day to cycle through your categories. Clicking again after the last category will clear the highlight.
-   **Customizing Colors**: Click the **colored square** in the legend panel. This opens your system's color picker. Selecting a new color updates the legend and all existing highlights of that category instantly.
-   **Renaming Categories**: **Double-click** any label in the legend to type a new name (e.g., "Sick Leave" or "Exam Day"). Press `Enter` to save.
-   **Exporting Data**: Click **EXPORT PNG** to download a clean snapshot of the calendar grid.

## Contributing Guidelines

We welcome improvements to state persistence or UI refinements.
1.  Fork the repository.
2.  Create a feature branch.
3.  Maintain the **Vanilla JS** philosophy (no build tools).
4.  Submit a Pull Request with details of your changes.

## License

This project is licensed under the **MIT License**.
