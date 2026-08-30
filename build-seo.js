const fs = require('fs');
const path = require('path');

// Master Dataset Matrix covering all 45 utilities with high-volume long-tail modifiers
const matrix = {
  // --- AI UTILITIES ---
  "ai-tools/token-counter.html": [
    { title: "Token Counter for GPT-4o", slug: "gpt-4o", keyword: "GPT-4o context token limit counter" },
    { title: "Token Counter for Claude 3.5 Sonnet", slug: "claude-3-5-sonnet", keyword: "Claude 3.5 Sonnet token pricing calculator" },
    { title: "Token Counter for Llama 3.3", slug: "llama-3-3", keyword: "Llama 3 context window tracker" },
    { title: "Token Counter for Gemini 1.5 Pro", slug: "gemini-1-5-pro", keyword: "Gemini 1.5 Pro token cost calculator" },
    { title: "Token Counter for DeepSeek R1", slug: "deepseek-r1", keyword: "DeepSeek R1 context token estimator" }
  ],
  "ai-tools/system-prompt-injector.html": [
    { title: "System Prompt Guard for OpenAI Assistants", slug: "openai-assistants", keyword: "OpenAI system prompt jailbreak test" },
    { title: "System Prompt Tester for Claude Projects", slug: "claude-projects", keyword: "Claude project system instruction simulator" },
    { title: "System Prompt Validator for LangChain", slug: "langchain-agents", keyword: "LangChain agent prompt security tester" }
  ],
  "ai-tools/markdown-latex-stripper.html": [
    { title: "Markdown Stripper for LLM Copywriting", slug: "llm-copy", keyword: "Clean LLM Markdown formatting out of raw text" },
    { title: "LaTeX Formatter Cleaner for ChatGPT", slug: "chatgpt-latex", keyword: "Remove LaTeX brackets and equations from AI response" }
  ],
  "ai-tools/prompt-variations.html": [
    { title: "Prompt Variations Generator for Midjourney", slug: "midjourney-v6", keyword: "Midjourney prompt permutation matrix tool" },
    { title: "Prompt Variation Matrix for Stable Diffusion", slug: "stable-diffusion", keyword: "Stable diffusion negative prompt grid generator" }
  ],
  "ai-tools/ai-diff-space.html": [
    { title: "AI Output Diff Checker for Code Generation", slug: "code-diff", keyword: "Compare AI code outputs side by side" },
    { title: "LLM Response Variance Tester", slug: "llm-responses", keyword: "Audit response differences between ChatGPT and Claude" }
  ],
  "ai-tools/prompt-chunking.html": [
    { title: "Text Chunking Tool for ChatGPT 128k Window", slug: "chatgpt-128k", keyword: "Split large document into LLM context chunks" },
    { title: "RAG Document Text Splitter Tool", slug: "rag-chunking", keyword: "Client side text splitter for RAG vector stores" }
  ],
  "ai-tools/tone-dashboard.html": [
    { title: "Readability Audit Tool for AI Content", slug: "ai-content-audit", keyword: "Check AI content readability score client side" },
    { title: "Tone Consistency Analyzer for Brand Copy", slug: "brand-voice", keyword: "Audit content tone and sentence complexity" }
  ],
  "ai-tools/chat-payload-formatter.html": [
    { title: "Chat Log to OpenAI JSON Messages Converter", slug: "openai-json", keyword: "Convert text transcript to OpenAI chat completions payload" },
    { title: "Transcript to Anthropic Messages API Formatter", slug: "anthropic-json", keyword: "Format raw chat log into Claude JSON format" }
  ],
  "ai-tools/vision-image-optimizer.html": [
    { title: "Image Resizer for GPT-4 Vision API", slug: "gpt-v-optimizer", keyword: "Downsample images for GPT-4 vision low detail mode" },
    { title: "Vision LLM Image Aspect Ratio Cropper", slug: "vision-llm-crop", keyword: "Optimize picture dimensions for visual AI models" }
  ],
  "ai-tools/hyperparameter-visualizer.html": [
    { title: "LLM Temperature & Top_P Simulator", slug: "temperature-top-p", keyword: "Visualize LLM temperature vs top_p sampling parameters" },
    { title: "Fine-Tuning Hyperparameter Visualizer", slug: "fine-tuning-params", keyword: "Map AI model hyperparameter weights online" }
  ],
  "ai-tools/embedding-similarity.html": [
    { title: "Cosine Similarity Calculator for OpenAI Embeddings", slug: "openai-embeddings", keyword: "Calculate text embedding similarity vector score online" },
    { title: "Client Side Text Vector Distance Calculator", slug: "vector-distance", keyword: "Measure semantic similarity between two texts" }
  ],
  "ai-tools/json-schema-lint.html": [
    { title: "JSON Schema Linter for Structured Outputs", slug: "structured-outputs", keyword: "Validate JSON against OpenAI structured outputs schema" },
    { title: "JSON Schema Validator for Function Calling", slug: "function-calling", keyword: "Check JSON schema for AI function calling parameters" }
  ],
  "ai-tools/csv-dataset-factory.html": [
    { title: "CSV to JSONL Fine-Tuning Converter", slug: "jsonl-converter", keyword: "Convert CSV pairs to OpenAI fine tuning JSONL dataset" },
    { title: "Few-Shot Dataset Creator for AI Models", slug: "few-shot-dataset", keyword: "Format training data pairs for LLM fine tuning" }
  ],
  "ai-tools/system-parameter-cheatsheet.html": [
    { title: "LLM Context Window Size Comparison 2026", slug: "context-window-limits", keyword: "Compare token limits across OpenAI Claude Gemini DeepSeek" },
    { title: "AI API Pricing Reference Directory", slug: "api-pricing-matrix", keyword: "Quick comparison of LLM API cost per million tokens" }
  ],
  "ai-tools/api-status-monitor.html": [
    { title: "OpenAI & Anthropic Status Checker", slug: "ai-api-status", keyword: "Check localized status of major AI API endpoints" },
    { title: "Developer Web Services Latency Check", slug: "dev-latency-check", keyword: "Monitor client side network response time to developer APIs" }
  ],

  // --- CREATOR UTILITIES ---
  "creators/title-hook-tester.html": [
    { title: "YouTube Video Title & CTR Preview Tool", slug: "youtube-ctr", keyword: "Preview YouTube title mobile truncations" },
    { title: "TikTok Title & Hook Optimizer", slug: "tiktok-hooks", keyword: "Test short form video titles for hook performance" }
  ],
  "creators/description-keyword-builder.html": [
    { title: "YouTube Description & Tag Builder", slug: "youtube-seo", keyword: "Generate YouTube metadata description and tags" },
    { title: "Podcast Episode Description Builder", slug: "podcast-metadata", keyword: "Format podcast show notes and keywords" }
  ],
  "creators/aspect-ratio-guide.html": [
    { title: "Aspect Ratio Guide for Shorts & Reels", slug: "shorts-reels-9-16", keyword: "9:16 vertical video safe zone aspect ratio guide" },
    { title: "Social Media Image Ratio Converter Map", slug: "image-ratios-cheat-sheet", keyword: "16:9 4:5 1:1 canvas size comparison guide" }
  ],
  "creators/audio-format-converter.html": [
    { title: "WAV to MP3 Client-Side Audio Converter", slug: "wav-to-mp3", keyword: "Convert WAV to MP3 privately inside browser" },
    { title: "OGG to WAV Audio Transcoder", slug: "ogg-to-wav", keyword: "Convert OGG audio files to WAV zero server download" }
  ],
  "creators/thumbnail-contrast.html": [
    { title: "YouTube Thumbnail Contrast & Legibility Audit", slug: "thumbnail-legibility", keyword: "Check YouTube thumbnail text contrast ratio" },
    { title: "Social Graphic WCAG Accessibility Tester", slug: "wcag-graphic-contrast", keyword: "Audit banner design colors for readability" }
  ],
  "creators/subtitle-srt-sync.html": [
    { title: "SRT Subtitle Time Offset Tool", slug: "srt-time-shift", keyword: "Shift timing in SRT subtitle files online" },
    { title: "VTT to SRT Caption Converter", slug: "vtt-to-srt", keyword: "Convert WebVTT subtitle files to standard SRT format" }
  ],
  "creators/social-post-splitter.html": [
    { title: "Social Post Splitter for X Threads", slug: "twitter-threads", keyword: "Split long text into 280 character Twitter threads" },
    { title: "Social Post Splitter for LinkedIn Posts", slug: "linkedin-posts", keyword: "Format long text into readable LinkedIn paragraph chunks" },
    { title: "Social Post Splitter for Instagram Captions", slug: "instagram-captions", keyword: "Divide blog posts into Instagram caption parts" }
  ],
  "creators/video-framerate-meter.html": [
    { title: "24fps vs 30fps vs 60fps Frame Timing Calculator", slug: "fps-frame-times", keyword: "Calculate exact frame duration in milliseconds for video editing" },
    { title: "Video Animation Frame Count Meter", slug: "animation-frame-count", keyword: "Determine frame sequence count for video specs" }
  ],
  "creators/rgb-hex-studio.html": [
    { title: "RGB to HEX Color Converter for Designers", slug: "rgb-to-hex", keyword: "Convert RGB color values to HEX hex codes online" },
    { title: "HEX to HSL Color Matrix Tool", slug: "hex-to-hsl", keyword: "Convert Hex color strings to HSL CSS values" }
  ],
  "creators/video-bitrate-calculator.html": [
    { title: "4K & 1080p Video File Size Calculator", slug: "video-file-size", keyword: "Calculate video render file size based on bitrate and duration" },
    { title: "Streaming Bitrate Estimator for OBS", slug: "obs-bitrate-calc", keyword: "Determine optimal stream bitrate for YouTube and Twitch" }
  ],
  "creators/script-pacer.html": [
    { title: "Voiceover Script Word Count & Duration Pacer", slug: "voiceover-script-length", keyword: "Calculate speech length from script word count" },
    { title: "Teleprompter Speed & Timing Calculator", slug: "teleprompter-speed", keyword: "Estimate video narration length at 150 words per minute" }
  ],
  "creators/hex-grid-mock.html": [
    { title: "Vector Design Grid & Pixel Layout Simulator", slug: "vector-grid-mockup", keyword: "Interactive geometric hex grid math mockup tool" },
    { title: "CSS Isometric Grid Matrix Generator", slug: "isometric-css-grid", keyword: "Calculate isometric grid layouts client side" }
  ],
  "creators/video-safe-zone.html": [
    { title: "TikTok & Reels Safe Zone Overlay Template", slug: "tiktok-safe-zone", keyword: "Check vertical video overlay boundaries for UI elements" },
    { title: "YouTube Shorts Interface Margin Checker", slug: "shorts-safe-zone", keyword: "Prevent video text obstruction from YouTube Shorts buttons" }
  ],
  "creators/sponsor-cost-calculator.html": [
    { title: "YouTube Video CPM & Sponsorship Rate Calculator", slug: "youtube-sponsor-rates", keyword: "Calculate sponsorship pricing based on average video views" },
    { title: "Podcast Ad Sponsorship Revenue Estimator", slug: "podcast-ad-revenue", keyword: "Estimate earnings from podcast programmatic insertion ads" }
  ],
  "creators/media-extension-picker.html": [
    { title: "WebM vs MP4 Container Comparison Tool", slug: "webm-vs-mp4", keyword: "Check browser compatibility for WebM and MP4 media codecs" },
    { title: "Audio Container Extension Reference Guide", slug: "audio-codecs-guide", keyword: "Determine optimal audio container for web deployment" }
  ],

  // --- DIGITAL UTILITIES ---
  "digital-users/password-generator.html": [
    { title: "Secure Password Generator for WiFi Routers", slug: "wifi-routers", keyword: "Generate 63-character WPA2 WPA3 router passwords" },
    { title: "Secure Password Generator for SQL Databases", slug: "sql-databases", keyword: "Generate complex SQL database root passwords client-side" },
    { title: "SSH Key Passphrase Generator", slug: "ssh-keys", keyword: "Generate cryptographically secure SSH key passphrases" }
  ],
  "digital-users/text-case-converter.html": [
    { title: "camelCase & snake_case String Converter", slug: "camelcase-snakecase", keyword: "Convert text variables to camelCase snake_case kebab-case" },
    { title: "UPPERCASE lowercase Title Case Converter", slug: "uppercase-lowercase", keyword: "Bulk convert text string capitalization online" }
  ],
  "digital-users/browser-blueprint.html": [
    { title: "Browser Screen Resolution & Viewport Checker", slug: "viewport-resolution", keyword: "Check window innerWidth innerHeight screen resolution" },
    { title: "Client User Agent & IP Diagnostic Tool", slug: "user-agent-lookup", keyword: "Inspect client user agent string and browser features" }
  ],
  "digital-users/epoch-sync.html": [
    { title: "Unix Epoch Timestamp to ISO Date Converter", slug: "epoch-to-iso", keyword: "Convert Unix timestamp seconds milliseconds to human date" },
    { title: "UTC Date to Unix Timestamp Sync Engine", slug: "date-to-epoch", keyword: "Generate current Unix timestamp for software developers" }
  ],
  "digital-users/base64-encoder-decoder.html": [
    { title: "Base64 String Encoder & Decoder Tool", slug: "base64-string", keyword: "Encode plain text to base64 or decode base64 back to text" },
    { title: "Base64 Image Data URI Generator", slug: "base64-image-data-uri", keyword: "Convert small binary strings into base64 URI tags" }
  ],
  "digital-users/url-encoder-decoder.html": [
    { title: "URL Encode Component Online Tool", slug: "url-encode-component", keyword: "Format dynamic URL parameters safely with encodeURIComponent" },
    { title: "URL Decoder for Encoded Query Strings", slug: "url-decode-strings", keyword: "Decode percent-encoded strings in URLs" }
  ],
  "digital-users/md5-hash-generator.html": [
    { title: "MD5 Hash Generator Client Side", slug: "md5-generator", keyword: "Compute 128-bit MD5 hash strings instantly in browser" },
    { title: "SHA-256 vs MD5 Checksum Calculator", slug: "checksum-calculator", keyword: "Generate data validation hashes zero server upload" }
  ],
  "digital-users/vision-simulator.html": [
    { title: "Protanopia & Deuteranopia Color Blindness Simulator", slug: "color-blind-checker", keyword: "Audit website visual colors for red-green color blindness" },
    { title: "Tritanopia Vision Accessibility Auditor", slug: "tritanopia-checker", keyword: "Simulate blue-yellow color vision deficiencies on web interfaces" }
  ],
  "digital-users/lorem-ipsum-factory.html": [
    { title: "Developer Lorem Ipsum Text Generator", slug: "developer-lorem-ipsum", keyword: "Generate placeholder paragraphs sentences and bullet points" },
    { title: "HTML Form Dummy Data Generator", slug: "dummy-form-data", keyword: "Generate mock text blocks for frontend UI wireframes" }
  ],
  "digital-users/distance-converter.html": [
    { title: "Pixels to REM Converter (16px Base)", slug: "px-to-rem", keyword: "Convert pixel values to REM CSS units instantly" },
    { title: "Metric to Imperial Units Converter for Developers", slug: "metric-imperial-units", keyword: "Convert meters feet inches and centimeters" }
  ],
  "digital-users/binary-text-decoder.html": [
    { title: "Binary to ASCII Text Decoder", slug: "binary-to-text", keyword: "Convert 8-bit binary code strings into human readable text" },
    { title: "Text to Binary Code Converter", slug: "text-to-binary", keyword: "Encode standard characters into binary zeroes and ones" }
  ],
  "digital-users/line-counter-filter.html": [
    { title: "Code Line & Word Count Tool Online", slug: "line-word-counter", keyword: "Count total lines non-empty lines and words in code" },
    { title: "Text Regex Line Filter Terminal", slug: "regex-line-filter", keyword: "Filter list of lines by string match client-side" }
  ],
  "digital-users/history-sandbox.html": [
    { title: "Local Browser Storage & Cookie Inspector Sandbox", slug: "storage-inspector", keyword: "Inspect client-side local storage key value pairs" },
    { title: "Browser Session Storage Diagnostic Tool", slug: "session-storage-sandbox", keyword: "Cleanly test web app browser storage states" }
  ],
  "digital-users/duplicate-row-purger.html": [
    { title: "Remove Duplicate Lines Online Tool", slug: "remove-duplicate-lines", keyword: "Purge duplicate text rows and list items automatically" },
    { title: "Deduplicate CSV List Strings Tool", slug: "deduplicate-csv", keyword: "Clean redundant data entries from text arrays" }
  ],
  "digital-users/aspect-ratio-calc.html": [
    { title: "CSS Responsive Image Aspect Ratio Calculator", slug: "css-aspect-ratio", keyword: "Calculate height based on width and aspect ratio" },
    { title: "Screen Dimensions Ratio Visualizer", slug: "screen-ratio-visualizer", keyword: "Find missing dimension for 16:9 21:9 4:3 display profiles" }
  ]
};

// Target output folder
const outputDir = path.join(__dirname, 'seo-tools');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let sitemapUrls = ['https://toolsbunny.com/'];

let totalPagesGenerated = 0;

Object.keys(matrix).forEach(baseFile => {
  if (!fs.existsSync(baseFile)) {
    console.warn(`Skipping missing base file: ${baseFile}`);
    return;
  }

  const baseContent = fs.readFileSync(baseFile, 'utf8');

  matrix[baseFile].forEach(item => {
    const pageSlug = `${path.basename(baseFile, '.html')}-${item.slug}.html`;
    const fullCanonicalUrl = `https://toolsbunny.com/seo-tools/${pageSlug}`;

    // Dynamic replacement of Title, Description, and insertion of Canonical Link + JSON-LD Schema
    let updatedHtml = baseContent
      .replace(/<title>.*?<\/title>/gi, `<title>${item.title} | Toolsbunny</title>`)
      .replace(
        /<meta name="description" content=".*?">/gi,
        `<meta name="description" content="Free browser-based ${item.keyword}. 100% private client-side processing with zero server tracking.">`
      );

    // Inject Canonical and Schema.org Structured Data before </head>
    const seoTags = `
    <!-- Programmatic SEO Injections -->
    <link rel="canonical" href="${fullCanonicalUrl}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "${item.title.replace(/"/g, '\\"')}",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>
    </head>`;

    updatedHtml = updatedHtml.replace('</head>', seoTags);

    const filePath = path.join(outputDir, pageSlug);
    fs.writeFileSync(filePath, updatedHtml, 'utf8');
    
    sitemapUrls.push(fullCanonicalUrl);
    totalPagesGenerated++;
  });
});

// Build dynamic sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://toolsbunny.com/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent.trim(), 'utf8');
console.log(`Success! Generated ${totalPagesGenerated} landing pages inside /seo-tools/ and updated sitemap.xml.`);
