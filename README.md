# Social Cards Generator

把文章變成 Instagram carousel 圖片。貼文章、回答幾個問題、自動產圖。

![Claude Code Skill](https://img.shields.io/badge/Claude_Code-Skill-blue)

---

## 這是什麼？

一個 Claude Code 的 skill（slash command），讓你用一句 `/social-cards` 就能把任何文章轉成社群圖片。

**你的流程：**

1. 在 Claude Code 裡輸入 `/social-cards`
2. 貼上你的文章（blog、podcast 筆記、任何文字內容）
3. Claude 問你幾個問題（語言、帳號、風格）
4. 自動產出 5-7 張 carousel 圖片（PNG），直接可以發 IG

**不需要 Canva、不需要設計軟體、不需要自己排版。**

---

## 安裝

### 你需要先裝好

- **[Bun](https://bun.sh)**：JavaScript runtime
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
- **[Claude Code](https://claude.ai/code)**：Anthropic 的 CLI 工具

### 三步安裝

```bash
# 1. 下載
git clone https://github.com/joannecucumber/social-cards-skill.git
cd social-cards-skill

# 2. 安裝依賴（會自動下載 Chromium，需要幾分鐘）
bun install

# 3. 把 skill 複製到 Claude Code
cp .claude/commands/social-cards.md ~/.claude/commands/
```

完成。

### 確認安裝成功

```bash
# 測試渲染腳本能不能跑
echo '---
tag: 測試
handle: @test
theme: 暖橘
mode: light
ratio: 4:5
cover: gradient
---

# 測試**標題**

副標題

---

[觀念]

# 第一頁

測試內容。

> 金句。' | bun render.ts - output/
```

如果看到 `Done! 3 slides saved to output/`，就代表安裝成功。

---

## 使用方式

### 方式一：Claude Code skill（推薦）

開 Claude Code，輸入：

```
/social-cards
```

Claude 會問你：
1. 貼上你的文章內容
2. 語言（繁中 / 英文 / 日文 / 韓文）
3. 你的社群帳號（例如 @yourstudio）
4. 風格偏好（選一個主題色，或讓 AI 自動決定）

回答完就自動產圖，圖片存在 `output/` 資料夾。

你也可以直接帶內容：
```
/social-cards <直接貼上整篇文章>
```

### 方式二：瀏覽器手動操作

```bash
open index.html
```

在左邊的編輯器貼上 Markdown，右邊即時預覽，點下載按鈕存 PNG。

### 方式三：命令列

```bash
# 從 .md 檔案渲染
bun render.ts my-article.md output/

# 從 stdin 渲染
cat my-article.md | bun render.ts - output/
```

---

## 支援的功能

### 頁面類型

| 類型 | 說明 | 怎麼觸發 |
|------|------|---------|
| 封面 | 漸層或純色背景，大標題 | 第一頁自動變封面 |
| 段落頁 | 標題 + 內文 + 金句 | 一般寫法 |
| 編號頁 | ①②③ 卡片式步驟 | 用 `① **標題**` 語法 |
| 列表頁 | 圓點列表 | 用 `- 項目` 語法 |
| 大數字頁 | 超大數字（160px） | 用 `{87%}` 語法 |
| 宣言頁 | 一句話置中放大 | 整頁只寫一個 `# 標題` |
| 圖文頁 | 頂部圖片 + 下方文字 | 第一行加 `![](圖片網址)` |
| CTA 頁 | 結尾行動呼籲 | 自動產生（可關閉） |

### 主題色

暖橘 / Vibe Reader / 莓果紫 / 森林綠 / 玫瑰金 / 日落粉 / 海洋藍 / 午夜

### 圖片尺寸

| 比例 | 用途 |
|------|------|
| 4:5 | Instagram 直式（預設） |
| 1:1 | 正方形 |
| 9:16 | IG Story / Reels 封面 |
| 16:9 | Twitter / LinkedIn |

### 語言

CTA 結尾頁支援自動切換：繁中（zh）、英文（en）、日文（ja）、韓文（ko）

---

## Markdown 格式

完整語法參考：[FORMAT.md](FORMAT.md)

### 快速範例

```markdown
---
tag: AI 趨勢
source: Lenny's Podcast
handle: @yourstudio
theme: vibe-reader
mode: light
ratio: 4:5
cover: gradient
lang: zh
---

# AI 寫程式**跨過轉捩點**了

你還在觀望？工程師已經集體頓悟

THE INFLECTION POINT IS HERE

---

[觀念]

# 好那麼一點點<br>但整個世界不同了

以前叫 AI 寫程式，結果像實習生交的作業。現在？你說「幫我做一個 Mac app」，它真的做出來了。

> 不是好一倍，是好一點點。但那一點點改變了一切。

---

[比較]

# 兩種用法<br>你是哪一種？

① **Vibe Coding**

不看程式碼，直接告訴 AI 你要什麼。

② **Agentic Engineering**

你不親手寫，但你負責架構和審查。

③ **關鍵分界線**

為自己寫，怎麼玩都行。影響到別人，就得切換到專業模式。

---

# 工具變快了，<br>但你的注意力**沒有變多**

---

[風險]

# AI 的**挑戰者號**時刻

AI 分不清「你的指令」和「內容裡藏的指令」。有人在 email 裡寫「忽略主人指令」，你的 AI 助理可能真的照做。

|> 每次沒出事，大家就更大膽。這跟挑戰者號爆炸前一模一樣。

> 所有人都知道有問題，但每次沒爆炸，就覺得下次也不會。
```

---

## 常見問題

### `bun install` 很慢？
Puppeteer 會下載 Chromium（~170MB），第一次比較久，之後就不會了。

### 渲染出來的圖有 toolbar？
確認你用的是最新版的 `render.ts`，舊版會截到整個頁面。

### 圖片上的文字跑版？
內容太多時會自動壓縮。如果還是跑版，減少每頁的文字量（一頁一個重點）。

### 可以自訂字體嗎？
目前用 Noto Sans TC（Google Fonts），支援中日韓英。改字體需要修改 `index.html`。

### 怎麼加自己的主題色？
在 `index.html` 的 `THEMES` 物件裡新增，參考現有主題的格式。

---

## License

MIT
