# Calendar Highlighter

A lightweight, purely vanilla web application designed for tracking attendance, absences, and holidays using a visually striking Neo Brutalist aesthetic.

## Features
- **Visual Grid:** Full monthly interactive calendar grid.
- **Customizable Highlighting:** Click any day to cycle through designated highlight states.
- **Persistent Storage:** Highlighted days persist automatically across month navigation via local Map states.
- **Custom Legends:** Double-click legend labels to rename and tailor them to your exact workflow.
- **Image Export:** Seamlessly capture and download high-resolution PNG snapshots of your current month's calendar grid.

## Tech Stack & Dependencies
- **Core:** HTML5, CSS3, and Vanilla JavaScript (ES6+).
- **Styling:** Adheres strictly to Neo Brutalist principles (heavy borders, sharp container shadows, and high contrast) using the **Space Grotesk** Google font.
- **Dependencies:** Uses [html2canvas](https://html2canvas.hertzen.com/) via CDN to convert DOM nodes to downloadable image canvases.

## Project Structure Overview
```text
calendar-highlighter/
├── index.html       # Central entry point and layout structure
├── styles.css       # Complete Neo Brutalist design system
├── main.js          # App state, logic mapping, and interactivity
└── .gitignore       # Tooling and operational source control exclusions
```

## Setup and Installation
Because this project utilizes zero build tools and operates purely on vanilla web standards, getting started is extremely minimal:

1. Clone or download this repository locally.
2. Launch a minimal local HTTP server within the directory. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your web browser. 

*(Note: While you can open `index.html` directly from your file explorer using `file://`, launching via a local HTTP server is required to prevent standard Browser CORS restrictions from preventing the `html2canvas` image export functionality.)*

## Usage Instructions
- **Navigating:** Use the oversized `<` and `>` buttons on the calendar header to traverse back and forth between months.
- **Applying Highlights:** Simply **click** any square within the grid. Repeated clicks cycle sequentially through the predefined event colors. Clicking once more will clear the highlight.
- **Modifying Legends:** In the left-side LEGEND panel, **double-click** the text label next to any color swatch. This transforms it into an input box—type your new label and press `Enter` to commit the change globally.
- **Exporting Image:** When your calendar mapping is complete, press the **EXPORT PNG** button to capture an instant, clean image of the calendar specifically suitable for records or reports.

## Environment Variables
This project utilizes entirely client-side browser logic and does not require or read any `.env` environment configuration.

## Contributing Guidelines
Contributions aimed at enhancing browser compatibility, UI/UX, or export reliability are welcome:
1. Fork the repository.
2. Create your isolated feature branch (`git checkout -b feature/NewCalendarFeature`).
3. Ensure no modern JavaScript bundling tools (Webpack/Vite/etc.) are introduced.
4. Commit your changes (`git commit -m 'Add NewCalendarFeature'`).
5. Push to the branch (`git push origin feature/NewCalendarFeature`).
6. Open a detailed Pull Request explaining the rationale of the addition.

## License
Distributed under the **MIT License**.
