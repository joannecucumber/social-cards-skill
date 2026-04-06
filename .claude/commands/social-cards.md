# Social Cards Generator

Turn an article or text into Instagram carousel images.

## How it starts

The user will paste an article, blog post, transcript, or any text content. Your job is to turn it into a carousel and render it as PNG images.

## Step 1 — Receive content

If `$ARGUMENTS` contains the article text, use it directly.

If `$ARGUMENTS` is empty or just a topic, ask:

> 請貼上你想做成社群圖的文章或內容。

## Step 2 — Ask key questions

After receiving the content, ask these questions (all at once, not one by one):

1. **語言** — 這篇貼文要用什麼語言？（繁中 / 英文 / 日文 / 其他）
2. **Handle** — 你的社群帳號是什麼？（例如 @yourstudio）
3. **風格偏好** — 有偏好的色系嗎？還是讓我自動選？
   - 可選：暖橘 / vibe-reader / 莓果紫 / 森林綠 / 玫瑰金 / 日落粉 / 海洋藍 / 午夜
4. **頁數** — 希望幾頁？（建議 5-7 頁，或讓我根據內容決定）

If the user says "自動" or "你決定", make all decisions yourself based on the content tone.

## Step 3 — Generate Markdown

Read the format spec:
```
cat FORMAT.md
```

Based on the article content and user's answers, generate a complete Markdown file. Key principles:

### Content transformation
- **Extract** the core message and 3-5 key points from the article
- **Rewrite** in short, punchy sentences suitable for social media — not copy-paste from the article
- **Each page is one idea** — don't cram multiple points into one page
- Cover title should hook attention in 5-7 words

### Page variety (critical)
Look at each point you want to make and pick the right format:
- Explaining a concept → paragraph + quote
- Steps or process → numbered items ①②③ (max 3 per page)
- Listing features/traits → bullet list
- A striking statistic → big number `{87%}`
- A pivotal statement → statement page (just `# one line`, auto-centers)
- A real example with context → hero image page

**Never make every page the same structure.** Alternate between dense pages (lists, steps) and sparse pages (statement).

### Technical rules
- Set `lang` based on user's language choice
- Set `theme` and `mode` based on content tone or user preference
- `ratio: 4:5` unless user specifies otherwise
- `**bold**` max 2 per page
- `> quote` on 2-3 pages only, not every page
- Numbered items: max 3 per page, split if more

## Step 4 — Render

Save the markdown and run the renderer:

```bash
cat > /tmp/social-cards-content.md << 'CONTENT_EOF'
<generated markdown here>
CONTENT_EOF

bun render.ts /tmp/social-cards-content.md output/
```

## Step 5 — Deliver

After rendering:

1. List all output files
2. Open the output folder: `open output/`
3. Ask: 「圖片已經產生好了，要我調整什麼嗎？」

If the user wants changes, modify the markdown and re-render.

## Arguments

$ARGUMENTS
