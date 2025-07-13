# 🧠 Blog Summarizer

Summarize lengthy blog posts into concise, meaningful summaries using AI — and translate them into Urdu with just one click.

## 🌐 Live Demo

👉 [Visit the Live Website](https://blog-summarizer-topaz.vercel.app/)

## 🚀 Project Overview

This project is a modern web application that:
- Scrapes blog content from any public URL
- Generates an English summary using AI logic
- Translates the summary into Urdu using a custom keyword dictionary
- Stores summaries in Supabase and allows you to manage/delete them

## 🛠 Tech Stack

- **Vite** — Lightning-fast frontend tooling  
- **React + TypeScript** — Frontend framework with strong typing  
- **Tailwind CSS** — Utility-first CSS for fast UI styling  
- **ShadCN UI** — Accessible and beautifully styled component library  
- **Supabase** — Backend-as-a-service for database and serverless functions  
- **Lucide React** — Icon library for a clean, modern look

## 📦 Getting Started

To run this project locally:

```bash
# 1. Clone the repository
git clone <GIT_REPO_URL>
cd <YOUR_PROJECT_NAME>

# 2. Install dependencies
npm install
# or
npm i

# 3. Create an `.env` file in the root with the following keys:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_public_key

# 4. Run the development server
npm run dev
📁 Project Structure
bash
Copy
Edit
src/
├── components/        # UI components (buttons, cards, inputs)
├── integrations/      # Supabase client setup
├── hooks/             # Custom hooks like toast notifications
├── pages/             # Main BlogSummarizer component
├── main.tsx           # App entry point
🔐 Environment Variables
Make sure you create a .env file at the root level with:

env
Copy
Edit
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_public_key


✨ Features
🔍 Blog content scraping via Supabase Edge Function

🧠 AI-like summary generation logic

🌐 Urdu translation using a keyword dictionary

📜 Summary history (view + delete)

✅ User feedback via toast notifications

👨‍💻 Author
Muhammad Mustafa
GitHub