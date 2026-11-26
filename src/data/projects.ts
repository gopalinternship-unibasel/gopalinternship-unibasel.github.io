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
    context: 'Distributed Information Systems workshop, University of Basel',
    year: '2026',
    team: 'Group project',
    summary:
      'A streaming platform that ingests live earthquake events, cleans and enriches them, finds unusually active regions and forecasts aftershocks, all shown on an interactive dashboard. A public copy of the dashboard is rewritten by the same pipeline on GitHub Actions every few hours.',
    description: [
      'A producer loads the USGS feed of the past week once, then polls the feed of the past hour every minute and publishes every new event to a Kafka topic. Spark Structured Streaming consumes the topic, parses, cleans and deduplicates the events, enriches them and writes the results to PostgreSQL, from where a Plotly Dash dashboard reads them.',
      'On top of the raw events, the stream runs seismology-flavoured analytics: 6-hour sliding windows are scored with z-scores against per-cell baselines computed from 90 days of USGS history, K-Means groups the flagged cells into active regions, the Gutenberg–Richter b-value is tracked per region in 24-hour sliding windows and compared with its long-term value, and an Omori–Utsu model forecasts the aftershocks of each M 5+ mainshock.',
      'The whole system, Kafka, PostgreSQL, a Spark master with two workers, the streaming job, the producers and the dashboard, runs from one Docker Compose file. A replay producer feeds a synthetic catalogue of 184 events, so a demo gives the same result on every start, even on a quiet day. No free server can keep the stack running all day, so the public page is a static copy: a scheduled GitHub Actions workflow starts the whole pipeline on a runner, exports what the dashboard shows and publishes it to GitHub Pages.',
    ],
    built: [
      'Real-time analytics platform built on Kafka, Spark Structured Streaming, PostgreSQL and Plotly Dash.',
      'Streaming pipeline that ingests, cleans, deduplicates, enriches and stores live USGS earthquake data.',
      'Anomaly detection with sliding windows, historical baselines and z-score analysis, with K-Means clustering to identify active seismic regions.',
      'Gutenberg–Richter b-value monitoring and Omori–Utsu aftershock forecasting integrated into an interactive dashboard.',
      'Containerised with Docker Compose, with GitHub Actions that test the whole pipeline on every push and publish a static copy of the dashboard to GitHub Pages.',
    ],
    stack: ['Python', 'Apache Kafka (KRaft)', 'Spark Structured Streaming', 'Spark MLlib', 'PostgreSQL', 'Plotly Dash', 'Docker Compose', 'GitHub Actions and Pages'],
    skills: ['kafka', 'spark', 'postgresql', 'plotly-dash', 'docker-compose', 'python', 'kmeans', 'sql', 'sql-lang', 'javascript', 'html-css', 'git'],
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
      'A full-stack assistant for researchers: type a hypothesis in plain language and get back an experiment plan with protocol, materials, budget and success criteria, checked against the literature for work that has already been published.',
    description: [
      'A run starts with two checks on the hypothesis itself: rule-based tests for physical impossibilities and an AI gate for vague or non-scientific input. The hypothesis is then searched across Semantic Scholar, OpenAlex and PubMed; an AI classifier judges from the retrieved papers whether the idea is novel, and a rule-based check corrects verdicts the papers do not support. The retrieved papers become the citations in the plan, which keeps the model from inventing references.',
      'Plan generation runs in a Supabase Edge Function, with a rule-based safety screen feeding into the prompt and checks on the finished plan: citation markers that point to no retrieved paper are removed, the budget must add up, off-topic materials are flagged and Sigma-Aldrich catalogue numbers are looked up through PubChem. A second AI call then reviews the plan as a critic. The frontend shows live progress as the stages complete, renders the plan, exports it to PDF and lets a run be shared or refined.',
      'Runs are persisted in PostgreSQL with row-level security, rate limiting, caching and versioned plans. Feedback on a plan section is embedded, and the closest corrections are added to the prompt for later plans on similar hypotheses. After the hackathon the project was moved off its original hosted platform: the public demo now runs on GitHub Pages, a Supabase project and Cloudflare Workers AI with a daily limit on new plans, and the whole app also runs on one computer with a local model.',
    ],
    built: [
      'Full-stack AI research assistant that turns natural-language scientific hypotheses into structured, costed, literature-backed experiment plans.',
      'Semantic Scholar, OpenAlex and PubMed integrated for citation-aware literature retrieval, novelty checks and fewer hallucinated references.',
      'Supabase Edge Function pipeline with a feasibility and quality gate, a safety screen, citation, budget and reagent checks, and a second AI pass that reviews each plan.',
      'React and TypeScript frontend with live progress, plan visualisation, PDF export, shareable runs and refinement workflows.',
      'PostgreSQL persistence with row-level security, rate limiting, caching, versioned plans and embedding-based feedback retrieval (pgvector).',
    ],
    stack: ['React', 'TypeScript', 'Supabase Edge Functions', 'PostgreSQL with pgvector', 'Cloudflare Workers AI', 'Semantic Scholar API', 'OpenAlex', 'PubMed'],
    skills: ['react', 'typescript', 'tanstack', 'supabase', 'postgresql', 'citation-retrieval', 'structured-outputs', 'embeddings', 'sql'],
    repo: 'https://github.com/gopalinternship-unibasel/ai-scientist',
    images: [
      {
        src: '/projects/ai-research-assistant-plan.jpg',
        alt: 'The plan stage of a run: the title "Evaluation of Resveratrol-Induced G1 Arrest and Proliferation Inhibition in MCF-7 Cells", the field "Cancer biology / Pharmacology", a summary of the approach that cites two of the retrieved papers, and the hypothesis restated.',
        caption: 'From the hackathon version: the start of a generated plan, with its title, field, a summary of the approach that cites the retrieved papers, and the hypothesis it tests.',
        width: 1600,
        height: 820,
      },
      {
        src: '/projects/ai-research-assistant-2.jpg',
        alt: 'The materials and budget sections of a generated plan: a table of reagents with suppliers, quantities and prices, and a total budget.',
        caption: 'From the hackathon version: materials with suppliers and quantities, and the budget the plan adds up to.',
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
      'A productivity assistant that reads what is already on your plate, proposes a plan for the week, blocks time in the calendar and drafts the emails, and then waits for you to say yes before anything happens. The public demo runs on a sample inbox and calendar.',
    description: [
      'The app takes an inbox, a calendar and free-form input such as "exams next week, two assignments and a meeting tomorrow", and returns prioritised tasks, a weekly plan, calendar blocks and email draft suggestions. The LLM is asked for structured output, so the plan is data the app can act on rather than prose.',
      'Every proposal passes an approval gate: nothing is added to, moved in or cancelled from the calendar until you approve it, emails are saved as drafts and never sent, and planned blocks are kept clear of busy times and checked again for conflicts before any write. The code connects Gmail and Google Calendar through a server-side OAuth flow to read availability, create and change events and draft replies. That path needs the owner’s own Google OAuth client and has so far been tested only against mocked Google endpoints, so the public demo works on a sample inbox and a demo calendar of its own.',
      'The app is TypeScript and React on TanStack Start, with Supabase for authentication, persistent plans and chat history, and a FastAPI planner service behind the dashboard’s planning step. Models are reached through an OpenAI-compatible API: Cloudflare Workers AI in the hosted demo, a local Ollama model on a local run. Fallbacks keep it usable when a service is missing: the demo inbox and calendar stand in for Google, a briefing built by rules for a failed model call, and the in-app assistant for an unreachable planner. It runs on Vercel and, as a second edition, on GitHub Pages with its server code in a Supabase Edge Function.',
    ],
    built: [
      'Full-stack AI productivity assistant that turns inbox, calendar and messy user input into prioritised tasks, weekly plans, calendar blocks and email draft suggestions.',
      'Agentic planning workflow with LLM-structured outputs, task prioritisation, free-slot scheduling and explicit human approval before every calendar or email action.',
      'Server-side Google OAuth for Gmail and Google Calendar to read availability, propose schedule changes, create events and draft email replies; the public demo uses a sample inbox and calendar instead.',
      'Built with TypeScript, React and TanStack, Supabase and FastAPI, with authentication, persistent plans, chat history and a productivity dashboard.',
      'Safety features: approval gates, draft-only emails, fallbacks when a service is missing and validation to prevent calendar conflicts.',
    ],
    stack: ['TypeScript', 'React', 'TanStack', 'Supabase', 'FastAPI', 'Cloudflare Workers AI', 'Google Calendar API', 'Gmail API'],
    skills: ['typescript', 'react', 'tanstack', 'supabase', 'fastapi', 'python', 'postgresql', 'sql', 'structured-outputs', 'agentic-workflows', 'git'],
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
    title: 'Escaped: a VR escape room on a pirate ship',
    tagline:
      'A single-player escape room in virtual reality: locked in a prison cell on a pirate ship, the player works through four rooms of hands-on puzzles to get out.',
    context: 'ICT project course (DAT215), University of Agder, Grimstad',
    year: '2024',
    team: 'Group project',
    myPart:
      'One of five. My role, as the report lists it: researching 3D Blender models and importing them. Every member was also available to assist on other tasks.',
    summary:
      'The player starts in a prison cell on a pirate ship and escapes room by room by handling objects and reading clues: a broom, a combination lock, stacked crates, a cannon, a movable bookshelf and a blinking lantern. Built in Godot 4.2 for the Oculus Rift S and Meta Quest 2.',
    description: [
      'Escaped is a pirate-themed escape room for one player in VR, made by a team of five in the ICT project course at the University of Agder in spring 2024, with access to the university’s Future Interaction Lab. It was made for the Oculus Rift S and Meta Quest 2: the player moves with the controllers and sees only their own hands.',
      'The player reaches through the bars of a prison cell for a broom, knocks a key off the wall and sweeps it into reach. A riddle in the captain’s logbook on a table gives the four digits for the combination lock of the prison room. The storage room has no door, so crates have to be stacked into a staircase up to a hole in the ceiling. In the cannon room a torch from the wall fires the one loaded cannon, which blasts a way through the wall. In the captain’s room a bookshelf hides the last door, whose lock opens with the digits a lantern blinks like Morse code. A menu on the wrist offers three hints per puzzle, and the final screen shows how long the escape took.',
      '3D models came from free online libraries or were made in Blender, then textured and brought into Godot 4.2, where they got collision shapes and game logic in GDScript with Godot XR Tools; Godot’s own physics was replaced by Jolt after objects fell through surfaces. Static lighting is baked (VoxelGI replaced SDFGI, which left the rooms too dark), and torches and lanterns can be carried as moving lights. The game loads in 4.45 seconds and reached 80 frames per second on the VR headset. Seven UiA students tested it: recorded play times ran from about 11 minutes to an hour and a half, and four of the six who rated it gave 8 out of 10. Two stopped early because of motion sickness. What the team saw in the tests added a second shelf to make the crate puzzle easier and fixed the cannons in place.',
    ],
    built: [
      'Single-player VR escape room in Godot 4.2 with GDScript and Godot XR Tools, for the Oculus Rift S and Meta Quest 2.',
      'Four rooms of physical puzzles: broom and key, a combination lock with a logbook clue, a staircase of crates, a cannon fired with a torch, and a lantern that blinks the last code.',
      '3D models from free libraries or made in Blender, imported into Godot with simplified collision shapes, and Jolt in place of Godot’s built-in physics.',
      'Baked static lighting with carried torches and lanterns, a wrist menu with hints, a 4.45-second load and 80 frames per second.',
      'User tests with seven students that reshaped two puzzles; teamwork with Jira, weekly stand-ups and Git on Bitbucket.',
    ],
    stack: ['Godot 4.2', 'GDScript', 'Godot XR Tools', 'Jolt physics', 'Blender', 'Oculus Rift S / Meta Quest 2', 'Jira', 'Bitbucket'],
    skills: ['blender', 'jira', 'git'],
    repo: null,
    imagesTitle: 'In the game',
    images: [
      {
        src: '/projects/vr-escape-rooms.jpg',
        alt: 'Five in-game screenshots, one per stage: the prison cell with the in-game menu on the player’s wrist, an open logbook and a lantern on a table, wooden crates and a lantern on the floor of the storage room with the opening in the ceiling above, the player’s hand holding a torch to a cannon, and a lantern on the captain’s desk.',
        caption: 'Screenshots from the game, one per stage, from the project report.',
        width: 1896,
        height: 508,
      },
    ],
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
