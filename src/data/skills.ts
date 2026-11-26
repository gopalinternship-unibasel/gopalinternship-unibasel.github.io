/**
 * The skills map. Each skill has a position on a 1000 x 640 canvas, grouped
 * into clusters. Positions are placed by hand so labels do not collide;
 * if you add a skill, give it a free spot inside its cluster's box.
 *
 * `contexts` are the things you can highlight: projects, internships,
 * thesis, coursework. Each lists the skill ids it used.
 */
import type { Role } from './roles'

export interface Skill {
  id: string
  label: string
  x: number
  y: number
}

export interface Cluster {
  id: string
  label: string
  /** Bounding box of the cluster on the canvas. */
  box: { x: number; y: number; w: number; h: number }
  skills: Skill[]
}

export interface SkillContext {
  id: string
  label: string
  skills: string[]
  /** Project page to link to, if any. */
  slug?: string
}

/** Size of the map's canvas; SkillsMap reads it for the viewBox. */
export const canvas = { w: 1000, h: 640 }

export const clusters: Cluster[] = [
  {
    id: 'ml',
    label: 'Machine learning',
    box: { x: 30, y: 30, w: 430, h: 240 },
    skills: [
      { id: 'pattern-recognition', label: 'Pattern recognition', x: 60, y: 80 },
      { id: 'yolo', label: 'YOLO', x: 270, y: 100 },
      { id: 'deep-learning', label: 'Deep learning', x: 90, y: 135 },
      { id: 'optimization', label: 'Continuous optimisation', x: 300, y: 160 },
      { id: 'domain-adaptation', label: 'Few-shot domain adaptation', x: 120, y: 190 },
      { id: 'kmeans', label: 'K-Means', x: 60, y: 240 },
      { id: 'rl', label: 'Reinforcement learning', x: 210, y: 240 },
    ],
  },
  {
    id: 'llm',
    label: 'LLMs and retrieval',
    box: { x: 520, y: 30, w: 450, h: 240 },
    skills: [
      { id: 'openai-api', label: 'OpenAI API', x: 550, y: 80 },
      { id: 'embeddings', label: 'Embeddings', x: 700, y: 95 },
      { id: 'pinecone', label: 'Pinecone', x: 850, y: 70 },
      { id: 'structured-outputs', label: 'Structured outputs', x: 580, y: 140 },
      { id: 'agentic-workflows', label: 'Agentic workflows', x: 790, y: 150 },
      { id: 'azure-doc-intelligence', label: 'Azure AI Document Intelligence', x: 560, y: 200 },
      { id: 'citation-retrieval', label: 'Citation-aware retrieval', x: 775, y: 225 },
    ],
  },
  {
    id: 'data',
    label: 'Data and streaming',
    box: { x: 30, y: 300, w: 430, h: 190 },
    skills: [
      { id: 'kafka', label: 'Kafka', x: 60, y: 345 },
      { id: 'spark', label: 'Spark Structured Streaming', x: 170, y: 345 },
      { id: 'postgresql', label: 'PostgreSQL', x: 60, y: 395 },
      { id: 'mongodb', label: 'MongoDB', x: 210, y: 400 },
      { id: 'plotly-dash', label: 'Plotly Dash', x: 340, y: 390 },
      { id: 'docker-compose', label: 'Docker Compose', x: 90, y: 450 },
      { id: 'sql', label: 'SQL', x: 270, y: 455 },
    ],
  },
  {
    id: 'web',
    label: 'Software and web',
    box: { x: 520, y: 300, w: 450, h: 190 },
    skills: [
      { id: 'typescript', label: 'TypeScript', x: 550, y: 345 },
      { id: 'react', label: 'React', x: 700, y: 335 },
      { id: 'tanstack', label: 'TanStack', x: 800, y: 360 },
      { id: 'supabase', label: 'Supabase', x: 580, y: 400 },
      { id: 'fastapi', label: 'FastAPI', x: 710, y: 405 },
      { id: 'django', label: 'Django', x: 850, y: 410 },
      { id: 'html-css', label: 'HTML and CSS', x: 560, y: 455 },
      { id: 'rest-json', label: 'JSON and XML data', x: 730, y: 460 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools and practice',
    box: { x: 30, y: 520, w: 310, h: 100 },
    skills: [
      { id: 'git', label: 'Git and GitHub', x: 60, y: 565 },
      { id: 'linux', label: 'Linux', x: 200, y: 565 },
      { id: 'blender', label: 'Blender', x: 265, y: 565 },
      { id: 'jira', label: 'Jira, agile teamwork', x: 60, y: 600 },
      { id: 'godot', label: 'Godot', x: 240, y: 600 },
    ],
  },
  {
    id: 'lang',
    label: 'Languages',
    box: { x: 370, y: 520, w: 600, h: 100 },
    skills: [
      { id: 'python', label: 'Python', x: 400, y: 565 },
      { id: 'c', label: 'C', x: 505, y: 560 },
      { id: 'cpp', label: 'C++', x: 565, y: 595 },
      { id: 'java', label: 'Java', x: 640, y: 565 },
      { id: 'javascript', label: 'JavaScript', x: 735, y: 595 },
      { id: 'sql-lang', label: 'SQL', x: 860, y: 565 },
    ],
  },
]

export const contexts: SkillContext[] = [
  {
    id: 'seismic',
    label: 'Seismic analytics',
    slug: 'seismic-streaming',
    skills: ['kafka', 'spark', 'postgresql', 'plotly-dash', 'docker-compose', 'python', 'kmeans', 'sql', 'sql-lang', 'javascript', 'html-css', 'git'],
  },
  {
    id: 'research',
    label: 'AI research assistant',
    slug: 'ai-research-assistant',
    skills: ['react', 'typescript', 'tanstack', 'supabase', 'postgresql', 'citation-retrieval', 'structured-outputs', 'embeddings', 'sql'],
  },
  {
    id: 'lifeops',
    label: 'LifeOps AI',
    slug: 'lifeops-ai',
    skills: ['typescript', 'react', 'tanstack', 'supabase', 'fastapi', 'python', 'postgresql', 'sql', 'structured-outputs', 'agentic-workflows', 'git'],
  },
  {
    id: 'mri',
    label: 'YOLO on MRI',
    slug: 'yolo-mri-segmentation',
    skills: ['yolo', 'deep-learning', 'python'],
  },
  {
    id: 'vr',
    label: 'VR escape game',
    slug: 'vr-pirate-ship-escape',
    skills: ['blender', 'jira', 'git'],
  },
  {
    id: 'semine',
    label: 'Semine internship',
    skills: ['azure-doc-intelligence', 'rest-json', 'python'],
  },
  {
    id: '247',
    label: '[24]7.ai internship',
    skills: ['openai-api', 'embeddings', 'pinecone', 'python'],
  },
  {
    id: 'thesis',
    label: 'Thesis in Agder',
    skills: ['domain-adaptation', 'deep-learning', 'python'],
  },
  {
    id: 'coursework',
    label: 'MSc coursework',
    skills: ['pattern-recognition', 'deep-learning', 'rl', 'optimization', 'python', 'cpp'],
  },
]

export const allSkills: Skill[] = clusters.flatMap((c) => c.skills)

/** Which contexts count when a visitor says what they are hiring for. */
export const roleContexts: Record<Role, string[]> = {
  ml: ['mri', 'thesis', 'research', 'lifeops', '247', 'coursework'],
  data: ['seismic', 'research', 'semine'],
  software: ['lifeops', 'research', 'seismic', 'vr', 'semine'],
  research: ['thesis', 'research', 'mri', 'coursework'],
}
