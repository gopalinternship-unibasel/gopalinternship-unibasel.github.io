/**
 * Project content. Add, remove or reorder entries here; the index, the
 * hover previews, the project pages and the skills map all read from it.
 *
 * `repo` is the public repository link, or null where there is none; the
 * project page then shows no Code block (unless `repoNote` gives a note).
 * `skills` are ids from ./skills.ts and drive the skills map.
 * `diagram` picks the schematic drawn in components/diagrams.tsx.
 */
import type { Role } from './roles'

export type DiagramId = 'seismic' | 'research' | 'lifeops' | 'mri' | 'vr'

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
  /** Pixel size of the file; defaults to 1600 x 875 (the screenshots). */
  width?: number
  height?: number
  /** Enlarge without smoothing (for small generated images such as digit grids). */
  pixelated?: boolean
}

export interface Project {
  slug: string
  title: string
  /** One line under the title in the index. */
  tagline: string
  /** Where it was built: course, hackathon, team. */
  context: string
  /** Year, when known. Leave out rather than guess. */
  year?: string
  team: 'Group project' | 'Solo'
  /** For group projects: what was mine, where the sources say so. */
  myPart?: string
  summary: string
  /** What it does, one paragraph each. */
  description: string[]
  /** How it is built, one bullet each. Straight from the CV. */
  built: string[]
  stack: string[]
  skills: string[]
  repo: string | null
  /** Link text for the repository; defaults to "Repository on GitHub". */
  repoLabel?: string
  /** Shown instead of the placeholder when there is deliberately no public repository. */
  repoNote?: string
  images: ProjectImage[]
  /** Heading above the images; defaults to "In use". */
  imagesTitle?: string
  diagram: DiagramId
  /** Which hiring focus this project speaks to. Drives ordering when a visitor picks one. */
  roles: Role[]
}

export const projects: Project[] = [
  {
    slug: 'seismic-streaming',
    roles: ['data', 'software'],
    title: 'Real-time seismic analytics',
    tagline: 'Live USGS earthquake data through Kafka and Spark, with anomaly detection and aftershock forecasts on a dashboard.',
    context: 'Distributed-systems workshop, University of Basel',
    year: '2026',
    team: 'Group project',
    summary:
      'A streaming platform that ingests live earthquake events, cleans and enriches them, finds unusually active regions and forecasts aftershocks, all visible on an interactive dashboard within seconds of the data arriving.',
    description: [
      'The USGS publishes a feed of earthquakes from the last hour. A producer polls it and publishes every new event to a Kafka topic. Spark Structured Streaming consumes the topic, parses and deduplicates the events, enriches them and writes the results to PostgreSQL, from where a Plotly Dash dashboard reads them.',
      'On top of the raw events, the stream runs seismology-flavoured analytics: sliding windows and historical baselines flag grid cells with unusual activity, z-scores and K-Means group the anomalous cells into active regions, the Gutenberg–Richter b-value is tracked per window, and an Omori–Utsu model forecasts aftershocks after a mainshock.',
      'The whole system, Kafka, PostgreSQL, a Spark master with two workers, the streaming job, the producers and the dashboard, runs from one Docker Compose file. A replay producer feeds prepared events so a demo has predictable activity even on a quiet day.',
    ],
    built: [
      'Real-time analytics platform built on Kafka, Spark Structured Streaming, PostgreSQL and Plotly Dash.',
      'Streaming pipeline that ingests, cleans, deduplicates, enriches and stores live USGS earthquake data.',
      'Anomaly detection with sliding windows, historical baselines, z-score analysis and K-Means clustering to identify active seismic regions.',
      'Gutenberg–Richter b-value monitoring and Omori–Utsu aftershock forecasting integrated into an interactive dashboard.',
      'Containerised with Docker Compose for reproducible deployment of the full pipeline and dashboard.',
    ],
    stack: ['Python', 'Apache Kafka', 'Spark Structured Streaming', 'PostgreSQL', 'Plotly Dash', 'Docker Compose'],
    skills: ['kafka', 'spark', 'postgresql', 'plotly-dash', 'docker-compose', 'python', 'kmeans', 'sql'],
    repo: 'https://github.com/gopalinternship-unibasel/realtime-seismic-analysis',
    images: [],
    diagram: 'seismic',
  },
  {
    slug: 'ai-research-assistant',
    roles: ['ml', 'software', 'research'],
    title: 'AI research assistant',
    tagline: 'A scientific hypothesis goes in; a structured, costed, literature-backed experiment plan comes out.',
    context: 'Hacknation AI Hackathon, a global hackathon with bases at MIT and in Munich',
    year: '2026',
    team: 'Group project',
    summary:
      'A full-stack assistant for researchers: type a hypothesis in plain language and get back an experiment plan with protocol, materials, budget and success criteria, checked against the literature so it does not repeat work that has already been published.',
    description: [
      'The pipeline starts with a literature check. The hypothesis is searched across Semantic Scholar, OpenAlex and PubMed; the retrieved papers decide whether the idea is novel, and they become the citations in the plan, which keeps the model from inventing references.',
      'Plan generation runs as Supabase Edge Function workflows with validation guards along the way: hypothesis quality, feasibility, safety, citation checks and reagent verification. The frontend streams progress as the stages complete, renders the plan, exports it to PDF and lets a run be shared or refined.',
      'Runs are persisted in PostgreSQL with row-level security, rate limiting, caching and versioned plans. Feedback on a plan is embedded and used to improve later ones.',
    ],
    built: [
      'Full-stack AI research assistant that turns natural-language scientific hypotheses into structured, costed, literature-backed experiment plans.',
      'Semantic Scholar, OpenAlex and PubMed integrated for citation-aware literature retrieval, novelty checks and fewer hallucinated references.',
      'Supabase Edge Function workflows with validation guards for hypothesis quality, feasibility, safety, citations and reagent verification.',
      'React and TypeScript frontend with streaming progress, plan visualisation, PDF export, shareable runs and refinement workflows.',
      'PostgreSQL persistence with row-level security, rate limiting, caching, versioned plans and embedding-based feedback improvement.',
    ],
    stack: ['React', 'TypeScript', 'Supabase Edge Functions', 'PostgreSQL', 'Semantic Scholar API', 'OpenAlex', 'PubMed'],
    skills: ['react', 'typescript', 'supabase', 'postgresql', 'citation-retrieval', 'structured-outputs', 'embeddings', 'sql'],
    repo: 'https://github.com/gopalinternship-unibasel/ai-scientist',
    images: [
      {
        src: '/projects/ai-research-assistant-1.jpg',
        alt: 'The literature check stage of a run. A red banner reads "exact match found, semantic overlap high" above three relevant references with authors, journal, year and citation counts.',
        caption: 'The literature check found that this hypothesis had already been tested and asks the researcher to reconsider the scope.',
      },
      {
        src: '/projects/ai-research-assistant-2.jpg',
        alt: 'The materials and budget sections of a generated plan: a table of reagents with suppliers, quantities and prices, and a total budget.',
        caption: 'Materials with suppliers and quantities, and the budget the plan adds up to.',
      },
    ],
    diagram: 'research',
  },
  {
    slug: 'lifeops-ai',
    roles: ['software', 'ml'],
    title: 'LifeOps AI',
    tagline: 'An inbox, a calendar and a messy note become prioritised tasks, a week plan and draft replies, with a person approving each action.',
    context: 'Bobathon, a hackathon by IBM',
    year: '2026',
    team: 'Group project',
    summary:
      'A productivity assistant that reads what is already on your plate, proposes a plan for the week, blocks time in the calendar and drafts the emails, and then waits for you to say yes before anything happens.',
    description: [
      'The planner takes an inbox, a calendar and free-form input such as "exams next week, two assignments and a meeting tomorrow", and returns prioritised tasks, a weekly plan, calendar blocks and email draft suggestions. The LLM is asked for structured output, so the plan is data the app can act on rather than prose.',
      'Google Calendar and Gmail are connected through OAuth: the app reads availability, finds free slots, proposes schedule changes, creates events and drafts replies. Every proposal passes an approval gate; emails are draft-only and the planner validates against calendar conflicts before it suggests a block.',
      'The app is TypeScript and React on TanStack with Supabase for authentication, persistent plans and chat history, and a FastAPI backend for the planning workflow. Demo fallbacks keep it working when a key or an API is missing.',
    ],
    built: [
      'Full-stack AI productivity assistant that turns inbox, calendar and messy user input into prioritised tasks, weekly plans, calendar blocks and email draft suggestions.',
      'Agentic planning workflow with LLM-structured outputs, task prioritisation, free-slot scheduling and human approval for safe actions.',
      'Google Calendar and Gmail integrated via OAuth to read availability, propose schedule changes, create events and draft email replies.',
      'Built with TypeScript, React and TanStack, Supabase and FastAPI, with authentication, persistent plans, chat history and a productivity dashboard.',
      'Safety features: approval gates, draft-only emails, demo fallbacks and validation to prevent calendar conflicts.',
    ],
    stack: ['TypeScript', 'React', 'TanStack', 'Supabase', 'FastAPI', 'Google Calendar API', 'Gmail API', 'OAuth'],
    skills: ['typescript', 'react', 'tanstack', 'supabase', 'fastapi', 'python', 'structured-outputs', 'agentic-workflows', 'openai-api'],
    repo: 'https://github.com/gopalinternship-unibasel/lifeops-ai',
    images: [],
    diagram: 'lifeops',
  },
  {
    slug: 'yolo-mri-segmentation',
    roles: ['ml', 'research'],
    title: 'YOLO for 3D MRI instance segmentation',
    tagline: 'A real-time detector adapted to volumetric brain scans, with preprocessing and augmentation to help it generalise.',
    context: 'Deep-learning project',
    team: 'Solo',
    summary:
      'YOLO is built for photographs: one image, many boxes, fast. This project adapts it to brain MRI, where the data is a stack of slices and the target is a region to segment rather than an object to box.',
    description: [
      'Instance segmentation on MRI means outlining each region of interest on every slice of a volume. The model is a YOLO architecture adapted for the 3D data, so detection and mask prediction run slice by slice with the volumetric context kept in the preprocessing.',
      'Most of the work is in the data. A diverse set of brain MRI scans was preprocessed into a consistent format and augmented so the model would see enough variation in orientation, intensity and anatomy to generalise beyond the scans it was trained on.',
    ],
    built: [
      'State-of-the-art YOLO architecture adapted for 3D MRI data.',
      'Preprocessed and augmented a diverse dataset of brain MRI scans to improve model generalisation.',
    ],
    stack: ['YOLO', 'Instance segmentation', '3D MRI', 'Data augmentation'],
    skills: ['yolo', 'deep-learning', 'python'],
    repo: null,
    images: [],
    diagram: 'mri',
  },
  {
    slug: 'vr-pirate-ship-escape',
    roles: ['software'],
    title: 'VR pirate-ship escape game',
    tagline: 'An escape room on a pirate ship, built in Godot for VR by an agile team.',
    context: 'Game-development project',
    team: 'Group project',
    summary:
      'An immersive escape game: the player wakes on a pirate ship and solves a chain of puzzles to get off it. Built in Godot with VR mechanics, puzzle logic, 3D assets and atmospheric effects.',
    description: [
      'The game runs on core VR mechanics built in Godot: grabbing and using objects, moving around the ship and interacting with the puzzle elements that gate the way out. 3D assets and atmospheric features, lighting, sound and weather, carry the setting.',
      'The team worked in an agile way, with Jira for planning and Git for collaboration, which is as much a part of the project as the engine work.',
    ],
    built: [
      'Immersive VR pirate-ship escape game developed in Godot.',
      'Core VR mechanics, puzzle elements, 3D assets and atmospheric features.',
      'Jira and Git in an agile team environment.',
    ],
    stack: ['Godot', 'VR', '3D assets', 'Jira', 'Git'],
    skills: ['godot', 'jira', 'git'],
    repo: null,
    images: [],
    diagram: 'vr',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
