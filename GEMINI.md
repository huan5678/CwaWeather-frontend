# Project: CwaWeather-frontend (森森天氣)

## Overview
"森森天氣" (Forest Weather) is a single-page web application that displays weather forecasts for Kaohsiung, Taiwan. The user interface is designed with an "Animal Crossing" aesthetic, featuring pastel colors, rounded shapes, and playful animations.

## key Features
- **Current Weather:** Displays current temperature, weather condition, and practical advice (e.g., whether to bring an umbrella or what to wear).
- **Forecast:** Horizontal scrollable list showing weather for upcoming time periods (including "tomorrow" detection).
- **Visuals:** Uses CSS variables for theming, Google Fonts (Zen Maru Gothic), and custom animations.
- **Data Source:** Fetches data from a custom backend API.

## Technical Architecture

### Tech Stack
- **HTML5:** Semantic structure.
- **CSS3:** Custom styling using CSS Variables (`:root`), Flexbox, Grid, and animations. No external CSS frameworks are used.
- **JavaScript:** Vanilla ES6+. Handles API fetching, data processing, and DOM manipulation.

### Key Files
- `index.html`: The core application file containing structure, styles, and logic.
- `icon-v2.png`: Application icon used for favicon and Apple touch icon.

### API Integration
- **Endpoint:** `https://cwa-backend-api.zeabur.app/api/weather/kaohsiung`
- **Logic:** The app fetches data on load, implementing a minimum 1.5s loading screen for visual effect using `Promise.all`.

## Development & Usage
Since this is a static HTML project, no build process is required.

**To Run:**
1. Open `index.html` in any modern web browser.
2. Alternatively, use a local static server (e.g., `live-server`, `python -m http.server`) to serve the directory.

## Conventions
- **Styling:** CSS is embedded directly in `index.html` within the `<style>` tag.
- **Scripting:** Logic is embedded at the bottom of `index.html`.
- **Language:** The UI is in Traditional Chinese (zh-TW).
