# Social Cards Generator

Markdown to Instagram carousel images. One command, done.

![demo](https://img.shields.io/badge/Claude_Code-Skill-blue)

## What it does

Turn any topic or article into ready-to-post Instagram carousel images:

```
/social-cards AI 寫程式的轉捩點
```

1. AI generates carousel Markdown (cover + content pages + CTA)
2. Headless browser renders each slide at 1080x1350 (2x)
3. PNG files saved to `output/`

## Features

- **7 page types**: paragraph, numbered steps, list, big number, statement (auto-centered), hero image, comparison
- **8 color themes**: warm orange, vibe reader, berry purple, forest green, rose gold, sunset pink, ocean blue, midnight
- **4 aspect ratios**: 4:5 (IG portrait), 1:1 (square), 9:16 (Story), 16:9 (landscape)
- **Auto-compact**: too many items? auto-shrinks to fit
- **Multi-language CTA**: zh / en / ja / ko
- **Brand settings**: save handle/source/theme to localStorage
- **Live preview**: type and see changes instantly

## Install

### Prerequisites

- [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash`)
- [Claude Code](https://claude.ai/code)

### Setup

```bash
# Clone
git clone https://github.com/joannecucumber/social-cards-skill.git
cd social-cards-skill

# Install dependencies (Puppeteer + Chromium)
bun install

# Copy the skill to Claude Code
cp -r .claude/commands/social-cards.md ~/.claude/commands/
```

### Update your CLAUDE.md (optional)

Add this to your project's `CLAUDE.md` so Claude knows where the tool lives:

```markdown
## Social Cards
- Render script: social-cards-skill/render.ts
- Format spec: social-cards-skill/FORMAT.md
- Engine: social-cards-skill/index.html
```

## Usage

### As Claude Code skill

```
/social-cards <topic or content>
```

Examples:
```
/social-cards AI 寫程式的轉捩點，來源是 Lenny's Podcast
/social-cards 5 tips for better sleep, in English
/social-cards プログラミング初心者ガイド
```

### As standalone renderer

```bash
# From a markdown file
bun render.ts content.md output/

# From stdin
echo "your markdown" | bun render.ts - output/
```

### As browser tool

```bash
open index.html
```

Paste markdown in the editor, see live preview, download PNGs.

## Markdown Format

See [FORMAT.md](FORMAT.md) for full syntax reference.

Quick example:

```markdown
---
tag: Tutorial
source: Your Brand
handle: @yourstudio
theme: ocean blue
mode: light
ratio: 4:5
cover: gradient
lang: en
---

# 5 Things Nobody Tells You About **AI**

What I learned the hard way

LESSONS LEARNED

---

[Concept]

# It's not about the **model**

The model is just the engine. What matters is how you drive it.

Most people obsess over which model to use. The real skill is knowing what to ask.

> The prompt is the product.

---

[Steps]

# Start with **these 3 things**

① **Write clear instructions**

Be specific. "Make it better" is not a prompt.

② **Give examples**

Show the AI what good output looks like.

③ **Iterate fast**

Your first prompt won't be perfect. That's fine.

---

# The best time to start was yesterday.
# The second best time is **now**.
```

## License

MIT
