# Playlist App – Playwright UI Tests

This project contains automated UI tests for the Playlist App using Playwright.

## Tech Stack
- Playwright
- JavaScript
- Node.js

## Covered Test Cases
- Search functionality (filtering tracks)
- Add track using "+" button
- Verify total playlist duration in seconds

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/karolinasvidzinska-pixel/playlist-aqa-tests.git
cd playlist-aqa-tests
2. Install dependencies
npm install
npx playwright install
3. Setup environment variables
Create .env file based on .env-example:
.env-example
BASE_URL=https://vite-react-alpha-lemon.vercel.app/

Create your local .env file:
cp .env-example .env
Run Tests
Headless mode (default)
npm run test

Headed mode (with browser UI)
npm run test:headed

View HTML report
npm run test:report

Project Structure:
playlist-aqa-tests/
  pages/
    playlistPage.js
  helpers/
    time.helper.js
  testData/
    playlistTestData.js
  fixtures/
    fixtures.js
  tests/
    playlist.spec.js
  .env-example
  playwright.config.js
  package.json
  README.md

