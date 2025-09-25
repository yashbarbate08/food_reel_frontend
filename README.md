# Food Reel Frontend

A modern web application for discovering food reels, inspired by Instagram/TikTok. Users can scroll through full-screen food videos, save favorites, and visit food partner stores.

## Features

- **Reels UI:** Vertical, full-screen video reels with snap scrolling.
- **User & Partner Auth:** Login and registration forms for users and food partners.
- **Responsive Design:** Mobile and desktop friendly using Tailwind CSS.
- **Theme Support:** Light/dark mode with system theme detection.
- **Protected Routes:** Only authenticated users can access certain pages.
- **Saved Reels:** View and manage saved food reels in a grid format.
- **Visit Store:** Direct link to food partner store from each reel.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/food-reel.git
   cd food-reel/Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and update values as needed.

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   - Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  components/         # Reusable UI components
  context/            # React context (e.g., UserContext)
  pages/
    auth/             # Authentication pages
    food-partner/     # Food partner pages
    general/          # General pages (Home, Saved, Hero)
  assets/             # Images and static assets
  App.jsx             # Main app routes
  App.css             # Global styles
```

## Customization

- **Reels:** Update `Home.jsx` for reel UI and video logic.
- **Protected Routes:** Use `UserProtectedRouter.jsx` for route protection.

## License

MIT

---

**Made with ❤️ for food lovers!**