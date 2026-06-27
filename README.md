# 🏗️ Website Builder - Karyar Studio

A visual website page builder with admin panel and public view, built as a frontend technical assessment project.

Watch live on: https://website-builder-one-iota.vercel.app/

---

## 🎯 Features

- **Admin Panel**: CRUD pages + Visual builder (add/remove/reorder sections + edit settings)
- **Public View**: Render pages based on slug in URL
- **10 Ready Sections**: Header, Hero, Features, Process, Banner, LogosStrip, ProjectsCarousel, TeamCarousel, Testimonials, Footer
- **Responsive**: Mobile & desktop compatible
- **RTL**: Full Persian language support

---

## 🛠️ Tech Stack

| Category     | Technology                   |
| ------------ | ---------------------------- |
| Build Tool   | Vite                         |
| Framework    | React 19                     |
| Routing      | React Router (Data Router)   |
| Server State | TanStack Query (React Query) |
| UI State     | Zustand                      |
| Styling      | CSS Modules + CSS Variables  |
| Dev API      | json-server                  |
| Prod API     | JSONBin.io                   |

---

## 📁 Project Structure

```
src/
├── components/   # Shared components (Button, Modal, Carousel, ...)
├── pages/        # Main pages (AdminDashboard, PageBuilder, PublicView)
├── sections/     # Builder sections (Hero, Features, ...)
├── services/     # API layer (pagesApi.js)
├── hooks/        # React Query hooks (usePages.js)
├── store/        # State management (builderStore.js)
├── styles/       # Global styles (variables.css, editor-shared.module.css)
├── utils/        # Helper functions (idGenerator.js, urlUtils.js)
├── App.jsx       # Main app component
├── index.css     # Global CSS
└── main.jsx      # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sadegh/website-builder.git
cd website-builder

# Install dependencies
npm install
```

### Development

```bash
# Start json-server (API mock)
json-server --watch db.json --port 3001 --host 0.0.0.0

# Start Vite dev server (in another terminal)
npm run dev

# Or run both together
npm run dev:all
```

**Access:**

- Admin Panel: http://localhost:5173/admin
- Page Builder: http://localhost:5173/admin/builder/1
- Public View: http://localhost:5173/

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment

This project is deployed on Vercel with automatic deployment from GitHub.

**Live Demo:** https://karyar-website-builder.vercel.app

### Deployment Steps

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL`: JSONBin.io API URL
   - `VITE_JSONBIN_MASTER_KEY`: JSONBin master key
4. Vercel automatically deploys on every push to `main`

---

## 🔑 Key Architecture Decisions

| Decision                   | Reason                                           |
| -------------------------- | ------------------------------------------------ |
| Vite + React (JS)          | Fast MVP, no TypeScript overhead                 |
| React Router (Data Router) | Modern routing with `useBlocker` support         |
| TanStack Query             | Automatic loading/error/caching for server state |
| Zustand                    | Lightweight UI state management                  |
| CSS Modules                | Scoped styles without Tailwind                   |
| json-server (dev)          | Full API simulation for development              |
| JSONBin.io (prod)          | Free JSON storage                                |
| Section Registry           | Extensible architecture (Open-Closed Principle)  |

---

## 📝 Known Limitations

- **Security**: Master key exposed in frontend (see Security Note above)
- **Client-side Validation**: Slug uniqueness validated on client only
- **JSONBin Limit**: 50MB storage limit (sufficient for this project)

---

## 🧪 Testing

### Local Testing

```bash
# Test with json-server
npm run dev:all

# Test production build locally
npm run build
npm run preview
```

### Mobile Testing

1. Find your laptop's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `.env.development`: `VITE_API_URL=http://YOUR_IP:3001`
3. Run json-server with `--host 0.0.0.0`
4. Access on mobile: `http://YOUR_IP:5173`

---

## 📄 License

This project is created for educational purposes as part of a technical assessment.

---

## 👨‍💻 Author

**Sadegh Dehyadgari**  
Junior Frontend Developer
