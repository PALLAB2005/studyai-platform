<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# StudyAI YouTube Learning Platform

## Project Structure

- `frontend/` contains the Vite React application, UI components, pages, services, and client types.
- `backend/` contains the Python API proxy. It uses yt-dlp to search public YouTube results without an API key.
- Root `package.json` keeps the development, build, and validation commands centralized.

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4f69f044-554e-493c-9ae9-4759d72583b1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Install the Python backend dependency: `python -m pip install -r backend/requirements.txt`
3. Set optional AI keys and `APP_URL` in `.env.local`. YouTube search does not require an API key. The backend also recognizes the existing `dist/.env.example` file, but credentials should be moved out of `dist` because build output can be publicly served.
3. Start the Python backend:
   `npm run server`
4. Run the frontend in a second terminal:
   `npm run dev`

On Windows, both services can be started together with `npm run dev:all`. Open `http://localhost:3000` after the frontend starts.
