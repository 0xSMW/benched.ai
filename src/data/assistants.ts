const categoriesTemplate = {
  performance: {
    price: '',
    foundationModel: '',
    intelligence: '',
    rateLimit: '',
    speed: '',
    timeToFirstToken: '',
    outputSpeed: '',
    contextWindow: ''
  },
  capabilities: {
    image: {
      imageGeneration: '',
      imageModel: '',
      imageModelRanking: ''
    },
    input: {
      inputCapabilities: '',
      imageUpload: '',
      pdfUpload: '',
      excelCsvUpload: '',
      fileSourceConnect: ''
    },
    voice: {
      voiceFeatures: '',
      voiceInput: '',
      voiceConversation: '',
      nativeVoiceToVoice: ''
    },
    tools: ''
  },
  memoryHistory: {
    memory: '',
    chatHistory: ''
  },
  apps: {
    ios: '',
    android: '',
    mac: '',
    windows: ''
  },
  other: {
    notes: '',
    trainingDataSharingPolicy: '',
    trainingDataSharingPolicySource: ''
  }
}

function cloneCategories() {
  return JSON.parse(JSON.stringify(categoriesTemplate))
}

export const assistants = [
  { slug: 'chatgpt-plus', name: 'ChatGPT Plus', categories: cloneCategories() },
  { slug: 'chatgpt-free', name: 'ChatGPT Free', categories: cloneCategories() },
  { slug: 'claude-pro', name: 'Claude Pro', categories: cloneCategories() },
  { slug: 'claude-free', name: 'Claude Free', categories: cloneCategories() },
  { slug: 'gemini-advanced', name: 'Gemini Advanced', categories: cloneCategories() },
  { slug: 'gemini-free', name: 'Gemini Free', categories: cloneCategories() },
  { slug: 'poe-pro', name: 'Poe Pro', categories: cloneCategories() },
  { slug: 'poe-free', name: 'Poe Free', categories: cloneCategories() },
  { slug: 'perplexity-pro', name: 'Perplexity Pro', categories: cloneCategories() },
  { slug: 'perplexity-free', name: 'Perplexity Free', categories: cloneCategories() },
  { slug: 'microsoft-copilot-free', name: 'Microsoft Copilot Free', categories: cloneCategories() },
  { slug: 'meta-ai', name: 'Meta AI', categories: cloneCategories() },
  { slug: 'grok', name: 'Grok', categories: cloneCategories() },
  { slug: 'mistral-le-chat', name: 'Mistral Le Chat', categories: cloneCategories() },
  { slug: 'huggingchat', name: 'HuggingChat', categories: cloneCategories() },
  { slug: 'character-ai-plus', name: 'Character AI Plus', categories: cloneCategories() },
  { slug: 'character-ai-free', name: 'Character AI Free', categories: cloneCategories() },
  { slug: 'chatgpt-free-logged-out', name: 'ChatGPT Free (Logged Out)', categories: cloneCategories() },
]
