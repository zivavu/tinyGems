# tinyGems - Base of the Underground

![tinyGems](https://placehold.co/600x150/333/FFF?text=tinyGems&font=montserrat)

tinyGems is a platform for discovering and sharing underground artists. This project aims to create an efficient way to discover those who otherwise would be hidden in the tentacles of the algorithm. Those who create art out of passion. Those who are trying to capture the uncapturable.

**[Live Site (Coming Soon)](https://tinygems.art)**

## 🌟 Why tinyGems?

The music industry works. It's doing what it's supposed to do, which is to make some cash. But personally, I'd rather be targeted by a single artist in their basement than by some corporate marketing team.

tinyGems addresses three core needs:

- **Discover hidden gems** - Find authentic underground artists creating meaningful work
- **Find the art you actually want** - Filter by things like artist size, something other platforms don't let you do
- **Share with the community** - Help others discover your favorite underground artists

## 🚀 Features

- **No Algorithms, Just Humans** - Hand-picked recommendations from real people, not AI
- **Amplify the Unheard** - Platform for artists who dare to be different
- **Hunt Your Way** - Filter by audience size, release era, genre, and more
- **Listen Raw** - Get matched with artists who actually need your ears
- **Multi-Platform Integration** - Seamless connections with Spotify, SoundCloud, Bandcamp, YouTube, and more
- **Customizable Experience** - Build and share your own collections

## 💻 Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: TailwindCSS, HeadlessUI 2.2
- **Backend**: Next.js, MongoDB
- **State Management**: Zustand (minimal usage)
- **API**: tRPC, Tanstack Query
- **Authentication**: BetterAuth
- **Testing**: Vitest, React Testing Library, Playwright
- **Others**: TypeScript, Zod, Lucide icons, Sonner

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- Bun package manager
- Docker (for MongoDB)

### Development Setup

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/tinygems.git
   cd tinygems
   ```

2. Install dependencies

   ```bash
   bun install
   ```

3. Start the development environment (includes MongoDB in Docker)

   ```bash
   bun run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

### Running Tests

```bash
# Unit and integration tests
bun run test
bun run test:watch

# E2E tests
bun run test:e2e
bun run test:e2e:ui
```

## 🔍 Project Structure

```
src/
├── app/                # Next.js pages and routing
├── features/           # Feature modules
│   ├── artists/        # Artist-related components
│   ├── gems/           # Gem (artist discovery) components
│   ├── global/         # App-wide components
│   └── shared/         # Reusable components, hooks, utilities
├── server/             # Server-side code
│   ├── api/            # API routes
│   ├── db/             # Database connection and models
│   ├── features/       # Server-side feature implementations
│   └── fetching/       # External API integrations
└── styles/             # Global styles
```

## 🤝 Contributing

tinyGems is an open-source project, and contributions are always welcome! Whether you're a developer, designer, or music enthusiast, there are many ways to help improve the platform.

You are welcome even if you would simply like to make your first contribution ever, and just edit some text to make it fit the vibe better.

## 📝 License

[MIT License](LICENSE)

## 🎵 The Mission

The mission of tinyGems is to create an efficient way to discover those who otherwise would be hidden in the tentacles of the algorithm. Those who create art out of passion. Those who are trying to capture the uncapturable. And everyone who sees art as something more than a way to make money.

---

Built with passion by a solo developer. If you like the idea and want to contribute or have questions, feel free to [contact me](mailto:zivavu@gmail.com).
