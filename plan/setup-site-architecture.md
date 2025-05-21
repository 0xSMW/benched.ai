benched-ai/
├── public/
│   └── assets/
│       ├── images/
│       └── icons/
├── src/
│   ├── components/
│   │   ├── Layout.astro
│   │   ├── ModelCard.astro
│   │   ├── ProviderCard.astro
│   │   ├── AnalysisBlock.astro
│   │   ├── GlossaryEntry.astro
│   │   ├── ToolReview.astro
│   │   ├── AssistantReview.astro
│   │   └── McpReview.astro
│   ├── content/
│   │   ├── benchmarks/
│   │   │   └── benchmark-sample.md
│   │   ├── providers/
│   │   │   └── provider-sample.md
│   │   ├── models/
│   │   │   └── model-sample.md
│   │   ├── assistants/
│   │   │   └── assistant-sample.md
│   │   ├── tools/
│   │   │   └── tool-sample.md
│   │   ├── mcp/
│   │   │   └── mcp-sample.md
│   │   └── blog/
│   │       └── blog-sample.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── benchmarks/
│   │   │   ├── index.astro
│   │   │   └── [benchmark].astro
│   │   ├── providers/
│   │   │   ├── index.astro
│   │   │   └── [provider].astro
│   │   ├── models/
│   │   │   ├── index.astro
│   │   │   └── [model].astro
│   │   ├── assistants/
│   │   │   ├── index.astro
│   │   │   └── [assistant].astro
│   │   ├── tools/
│   │   │   ├── index.astro
│   │   │   └── [tool].astro
│   │   ├── mcp/
│   │   │   ├── index.astro
│   │   │   └── [protocol].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [post].astro
│   │   └── glossary/
│   │       ├── index.astro
│   │       └── [term].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── package.json