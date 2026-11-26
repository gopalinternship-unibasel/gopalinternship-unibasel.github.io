/**
 * Everything personal lives here. Edit this file to change the name, links,
 * headline and the About text; no component needs to change.
 *
 */
export const profile = {
  name: 'Gopal Krishna',
  role: 'MSc Data Science student at the University of Basel',
  location: 'Basel, Switzerland',

  // Links
  email: 'gopalinternship@gmail.com',
  github: 'https://github.com/gopalinternship-unibasel',
  linkedin: 'https://www.linkedin.com/in/gopalkrishna-',
  // Path of a public CV PDF in /public, or null to leave the CV link out.
  // (The current CV holds a phone number and street address, so none is published.)
  cvPath: null as string | null,
  // The published address (GitHub Pages user site); used for Open Graph and the sitemap.
  siteUrl: 'https://gopalinternship-unibasel.github.io',

  // Hero
  statement: 'I build machine-learning systems and the data pipelines they run on.',
  intro:
    'MSc Data Science student at the University of Basel, with a computer-science degree and internships in document AI and conversational AI. Interested in LLM systems and retrieval, streaming data and distributed systems, and the engineering that makes them hold up.',

  // About: one string per paragraph.
  about: [
    'I came to Basel in 2025 for the master’s in Data Science, after a Bachelor of Engineering in Computer Science at IIITDM Kurnool and an exchange semester at the University of Agder in Norway, where my thesis looked at few-shot unsupervised domain adaptation.',
    'Before the master’s I interned twice: at Semine in Kristiansand, building invoice and voucher extraction workflows on Azure AI Document Intelligence, and at [24]7.ai in Bangalore, prototyping conversational interfaces with OpenAI APIs, embeddings and Pinecone. Both put language models to work on real documents and conversations, the kind of applied problem I keep coming back to.',
    'Since then I have streamed live earthquake data through Kafka and Spark, adapted YOLO to 3D MRI scans, and built two hackathon products: an AI research assistant that turns a hypothesis into a costed, literature-backed experiment plan, and LifeOps, a planner that reads an inbox and a calendar and proposes a week.',
  ],

  // The fact sheet beside the About text.
  facts: [
    { label: 'Based in', value: 'Basel, Switzerland' },
    { label: 'Studying', value: 'MSc Data Science, University of Basel, since 2025' },
    { label: 'Degree', value: 'BE Computer Science and Engineering, IIITDM Kurnool, 2020 to 2024' },
    { label: 'Exchange', value: 'University of Agder, Norway, 2024' },
    {
      label: 'This semester',
      value:
        'Foundations of Distributed Systems, Smart Contracts and Decentralized Finance, Blockchain Challenge, Multimedia Retrieval, Bioinformatics Algorithms',
    },
    { label: 'Languages', value: 'English, Hindi, German (B1), Norwegian (A1)' },
    { label: 'Away from the screen', value: 'Hiking, football, tennis, chess, sudoku, crosswords' },
  ],

  // What you are looking for. Shown in the contact section.
  openTo:
    'internships, working-student roles and research assistant positions in machine learning, data engineering and software',
  lastUpdated: 'November 2026',
} as const

export const nav = [
  { label: 'Projects', hash: 'projects' },
  { label: 'Skills', hash: 'skills' },
  { label: 'Background', hash: 'background' },
  { label: 'Contact', hash: 'contact' },
] as const
