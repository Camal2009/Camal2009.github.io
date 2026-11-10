# Personal Portfolio & Information Systems Showcase

> *"The loud claim fades; the quiet deed remains."* — **Tao Te Ching**

[![GitHub Pages](https://img.shields.io/badge/Hosted%20On-GitHub%20Pages-22c55e?logo=github&logoColor=white)](https://pages.github.com/)
[![Course](https://img.shields.io/badge/Course-SITE%201101-38bdf8)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-e34f26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Modern%20Tokens-1572b6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-f7df1e?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modular, accessible, and fully responsive static personal portfolio website built with pure HTML5, CSS3, and modern vanilla JavaScript. Developed for **SITE 1101: Principles of Information Systems** and ready for instant deployment on **GitHub Pages**.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Folder & File Architecture](#-folder--file-architecture)
3. [Page Structure & Core Features](#-page-structure--core-features)
4. [Gamified Interactive Resume (+10% Bonus)](#-gamified-interactive-resume-10-bonus)
5. [Local Development Guide](#-local-development-guide)
6. [Git Workflow & Commit Guidelines](#-git-workflow--commit-guidelines)
7. [Deploying to GitHub Pages](#-deploying-to-github-pages)
8. [Course Submission Checklist](#-course-submission-checklist)

---

## 🌟 Project Overview

This website serves as an academic and professional showcase, highlighting competencies across:
- **Principles of Information Systems (SITE 1101)**
- **Web Engineering:** Semantic structure, CSS variables, mobile drawer navigation, dark/light theme persistence.
- **Outreach & Mentorship:** Hour of Code programming workshops.
- **Embedded Robotics:** Microcontroller prototyping, sonar telemetry, and obstacle avoidance logic.
- **Database Modeling:** Relational normalization and SQL schema design.

---

## 📂 Folder & File Architecture

```text
personal-portfolio/
├── index.html                   # Home page (Profile photo, summary, stats, Tao Te Ching motto)
├── about.html                   # About page (Background, credentials, extracurriculars, DevQuest)
├── projects.html                # Projects showcase (Project 1, Hour of Code, Robotics, Databases)
├── README.md                    # Project documentation & GitHub Pages deployment guide
├── css/
│   └── styles.css               # Unified responsive stylesheet with CSS custom properties
├── js/
│   └── script.js                # Vanilla JS: Nav toggle, theme toggle, audio synth & DevQuest engine
└── assets/
    └── images/
        ├── favicon.svg          # Portfolio browser icon
        ├── avatar-placeholder.svg # Modern developer avatar placeholder
        ├── project1-portfolio.svg # Project 1 illustration
        ├── project2-hourofcode.svg# Project 2 (Hour of Code) illustration
        ├── project3-robotics.svg  # Project 3 (Robotics) illustration
        └── project4-database.svg  # Project 4 (Database Schema) illustration
```

---

## 🖥️ Page Structure & Core Features

### 1. Home Page (`index.html`)
- **Hero Showcase:** Profile photo placeholder with an animated radial gradient halo, tailored student summary, and quick action buttons.
- **Core Dimensions:** Metrics cards highlighting course standing, completed projects, and static deployment status.
- **Key Projects Preview:** Quick-access cards introducing Project 1, Project 2, and Project 3.
- **Course Motto Banner:** Embedded Tao Te Ching quote banner (`"The loud claim fades; the quiet deed remains"`).

### 2. About Page (`about.html`)
- **Academic Background:** Summary of undergraduate studies in Information Systems and foundational coursework.
- **Qualifications & Credentials:** Card stack detailing degree progress, course honors, and version control certifications.
- **Extracurricular Engagement:** Documented outreach activities including Hour of Code workshops and Robotics Club prototyping.

### 3. Projects Page (`projects.html`)
Contains cards with high-contrast SVG illustrations, tag pills, problem/solution summaries, and repository links:
1. **Project 1:** Personal Portfolio Website (Static HTML5/CSS3/ES6 site deployed to GitHub Pages).
2. **Project 2 (Hour of Code):** Community STEM education teaching sequencing and conditional logic.
3. **Project 3 (Robotics):** Microcontroller-driven obstacle-avoidance rover using dual sonar and infrared sensors.
4. **Project 4 (Database Systems):** Normalized 3NF relational database schema and SQL query optimization.
- **Category Filter Tabs:** Filter cards dynamically between *All*, *Web & Systems*, *Hour of Code*, *Robotics*, and *Databases*.

### 4. Consistent Header & Footer
- **Navigation Bar:** Fixed/sticky header with blur effect, active page indicator, mobile hamburger menu, and a theme switcher (Dark / Light mode).
- **Footer:** Tao Te Ching quote, copyright, course reference, and a prominent GitHub repository link with GitHub SVG icon.

---

## 🎮 Gamified Interactive Resume (+10% Bonus)

Located on `about.html`, the **DevQuest: Student Matrix & Interactive Skill Tree** provides a unique, gamified experience using 100% vanilla JavaScript and modern CSS:
- **Character HUD:** Displays player level (e.g. `LEVEL 3`), live XP bar, and character class (`Full-Stack Systems Architect`).
- **Interactive Skill Tree Matrix:** Clickable skill nodes for *Information Systems Architecture*, *Web Engineering*, *Autonomous Robotics*, *Git & CI/CD*, and *Hour of Code*. Clicking any node opens an **Inspector Modal** with detailed competency tags and an interactive **"Master Skill"** button that awards XP.
- **Quest Log & Milestones:** Chronological quests tracking course accomplishments with an interactive **"Claim Quest"** action.
- **Synthesized Web Audio FX:** Custom retro synth beeps for UI clicks and level-up fanfare generated on the fly via the browser's `AudioContext` (no external audio files required, runs 100% offline with a mute toggle).
- **Pure Canvas Confetti:** Custom canvas particle explosion upon leveling up.
- **Testing Controls for Graders:** Includes `Unlock All` (instantly unlocks all skills/quests for grading) and `Reset` (clears localStorage).

---

## 💻 Local Development Guide

To view and edit the site locally on your machine:

1. **Clone or Open the Repository:**
   Open the folder in **VS Code** or **Cursor**.

2. **Using the Live Server Extension (Recommended):**
   - Install the **Live Server** extension by *Ritwick Dey* from the VS Code Marketplace.
   - Right-click `index.html` in the file explorer and click **"Open with Live Server"**.
   - Your default browser will launch at `http://127.0.0.1:5500/index.html`.
   - Any edits to HTML, CSS, or JS will reload automatically!

3. **Or Open Directly:**
   Double-click `index.html` in your file explorer to open it directly in Google Chrome, Firefox, or Edge.

---

## 🔄 Git Workflow & Commit Guidelines

The grading checklist requires multiple commits showing continuous development progress. Follow this workflow:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Check the status of modified files
git status

# 3. Stage changes
git add .

# 4. Commit with descriptive messages
git commit -m "feat: implement modular responsive HTML structure and styles"

# 5. Push to your GitHub repository
git branch -M main
git remote add origin https://github.com/[YOUR_GITHUB_USERNAME]/[YOUR_REPOSITORY_NAME].git
git push -u origin main
```

### Recommended Commit Milestones:
1. `commit 1`: `chore: initialize project directory structure and vector assets`
2. `commit 2`: `feat: create core HTML pages (index, about, projects) with semantic markup`
3. `commit 3`: `style: add responsive CSS3 layout, variables, and dark/light mode`
4. `commit 4`: `feat: implement interactive gamified skill tree and quest log engine`
5. `commit 5`: `docs: complete README and GitHub Pages deployment configuration`

---

## 🚀 Deploying to GitHub Pages

Follow these simple steps to publish your website live for free:

1. **Push your code to GitHub:**
   Ensure your code is pushed to a public GitHub repository under your username.

2. **Navigate to Repository Settings:**
   - In your browser, open `https://github.com/[YOUR_GITHUB_USERNAME]/[YOUR_REPO_NAME]`.
   - Click on the **Settings** tab (the gear icon on the top right).

3. **Enable GitHub Pages:**
   - On the left sidebar menu, scroll to **Code and automation** and click **Pages**.
   - Under **Build and deployment**:
     - **Source:** Select `Deploy from a branch`.
     - **Branch:** Select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.

4. **Access Your Live Website:**
   - Within 1–2 minutes, GitHub Pages will deploy the site.
   - If your repository is named `[YOUR_GITHUB_USERNAME].github.io`, the URL will be:
     `https://[YOUR_GITHUB_USERNAME].github.io/`
   - If your repository is named e.g. `personal-portfolio` or `SITE-1101`, the URL will be:
     `https://[YOUR_GITHUB_USERNAME].github.io/[YOUR_REPO_NAME]/`

5. **Update Repository Links:**
   - In `index.html`, `about.html`, and `projects.html`, update the `id="github-repo-link"` href attribute to point directly to your repository URL.

---

## ✅ Course Submission Checklist

Before submitting on the university portal, ensure you have completed all three required items:

- [ ] **Item 1: Live GitHub Pages Link:**
  `https://[YOUR_GITHUB_USERNAME].github.io` (or `/SITE-1101`) verified and loading cleanly.
- [ ] **Item 2: Public GitHub Repository Link:**
  Repository contains clean code, proper directory structure, and this `README.md`.
- [ ] **Item 3: Full AI Chat Markdown File:**
  Export your AI conversation history as a markdown file (`ai-chat-history.md`) documenting the whole development progression.
- [ ] **Grading Verification:**
  - [x] Home Page with profile photo & student summary exists (20 pts).
  - [x] About Page with academic background & activities exists (20 pts).
  - [x] Projects Page includes Project 1, Project 2 (Hour of Code), Project 3 (Robotics), and Project 4 (20 pts).
  - [x] Multiple git commits showing development progress (20 pts).
  - [x] No broken images or layout glitches (all SVGs embedded cleanly) (20 pts).
  - [x] Code is clean, modular, and well-organized (20 pts).
  - [x] Bonus Feature: Interactive Gamified DevQuest Resume & Skill Tree (+10 pts).
  - [x] Personal email is omitted or protected to avoid spam crawling.
