# Social Cards Generator

Generate Instagram carousel images from a topic or content. Outputs PNG files ready to post.

## Workflow

1. Find the social-cards-skill directory (search for `render.ts` and `FORMAT.md`)
2. Read the tool format spec from `FORMAT.md` in that directory
3. Based on the user's input (topic, article, or raw content), generate a complete Markdown file following the FORMAT.md syntax
4. Save the markdown to a temp file
5. Run `bun <path-to>/render.ts <temp-file> <path-to>/output` to render all slides as PNG
6. Report the output file paths to the user

## Rules for generating the Markdown

- Follow `FORMAT.md` exactly for syntax
- Pick theme/mode/cover that fits the content tone
- Set `lang` based on the content language (zh/en/ja/ko)
- Use varied page types: don't make every page the same structure
- Keep each page 80-150 words (except statement pages)
- Use `**bold**` for 1-2 key terms per page
- Use `> quotes` only on 2-3 key pages, not every page
- Numbered items: max 3 per page
- Total: 5-7 pages (including cover, excluding auto CTA)

## Arguments

$ARGUMENTS

If no arguments provided, ask the user what content they want to create carousel images for.

## Execution

After generating the markdown, ALWAYS run the render script to produce PNG files. Do not just output the markdown — the user wants image files.

```bash
bun render.ts <markdown-file> output
```

After rendering, list the output files and offer to open them:
```bash
open output/
```
