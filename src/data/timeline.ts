/**
 * Education, work, hackathons and volunteering, newest first.
 * Dates come from the CV. Hackathon dates are the year only.
 */
export type TimelineKind = 'Education' | 'Work' | 'Hackathon' | 'Volunteering'

export interface TimelineEntry {
  kind: TimelineKind
  /** Shown in the left column, e.g. "2025 –" or "Jan – Jun 2024". */
  when: string
  /** Sort key, newest first. */
  sort: number
  title: string
  org: string
  place: string
  details?: string[]
  /** Link to a project page on this site. */
  projectSlug?: string
}

const entries: TimelineEntry[] = [
  {
    kind: 'Education',
    when: '2025 –',
    sort: 20250901,
    title: 'MSc Data Science',
    org: 'University of Basel',
    place: 'Basel, Switzerland',
    details: [
      'Coursework so far: Pattern Recognition, Scientific Computing, Mathematics of Data Science, Foundations of Deep Learning, Numerical Methods for PDEs, Foundations of Artificial Intelligence, Computer Networks, High Performance Computing, Continuous Optimization, Modern Reinforcement Learning.',
    ],
  },
  {
    kind: 'Work',
    when: 'Apr 2026',
    sort: 20260429,
    title: 'Event representative, Microsoft AI Tour 2026',
    org: 'Microsoft',
    place: 'Zurich',
    details: [
      'Supported the Copilot Activation Group: welcomed guests, explained the activities and guided visitors through the event.',
    ],
  },
  {
    kind: 'Hackathon',
    when: '2026',
    sort: 20260426,
    title: 'AI research assistant',
    org: 'Hacknation AI Hackathon, a global hackathon with bases at MIT and in Munich',
    place: 'Group project',
    details: ['A hypothesis goes in; a costed, literature-backed experiment plan comes out.'],
    projectSlug: 'ai-research-assistant',
  },
  {
    kind: 'Hackathon',
    when: '2026',
    sort: 20260420,
    title: 'LifeOps AI',
    org: 'Bobathon, by IBM',
    place: 'Group project',
    details: [
      'An agentic planner that turns an inbox, a calendar and messy notes into a week plan, with a person approving every action.',
    ],
    projectSlug: 'lifeops-ai',
  },
  {
    kind: 'Volunteering',
    when: 'Apr 2026',
    sort: 20260402,
    title: 'Volunteer, GenAI 2026 Summit',
    org: 'GenAI Summit',
    place: 'Zurich',
    details: [
      'Coordinated session logistics: audience flow, microphones, room access, speaker support and transitions between talks.',
    ],
  },
  {
    kind: 'Education',
    when: 'Jan – Jul 2024',
    sort: 20240103,
    title: 'Exchange semester, Information and Communication Technologies',
    org: 'University of Agder',
    place: 'Grimstad, Norway',
    details: [
      'Thesis: Few-shot unsupervised domain adaptation. Methods for adapting a model to a new domain with very little labelled data, combining few-shot learning with unsupervised domain adaptation to improve generalisation across datasets.',
    ],
  },
  {
    kind: 'Work',
    when: 'Jan – Jun 2024',
    sort: 20240122,
    title: 'Intern',
    org: 'Semine AS',
    place: 'Kristiansand, Norway',
    details: [
      'Built invoice and voucher data-extraction workflows on Azure AI Document Intelligence, including custom field analysis and JSON-to-XML transformation for internal data protocols.',
    ],
  },
  {
    kind: 'Work',
    when: 'Jun – Aug 2023',
    sort: 20230619,
    title: 'Intern',
    org: '[24]7.ai',
    place: 'Bangalore, India',
    details: [
      'Developed single- and multi-intent conversational interfaces using OpenAI APIs, embeddings and Pinecone similarity search to match user inputs with synthetic data.',
    ],
  },
  {
    kind: 'Education',
    when: '2020 – 2024',
    sort: 20200901,
    title: 'BE Computer Science and Engineering',
    org: 'IIITDM Kurnool, an Institute of National Importance',
    place: 'Kurnool, India',
    details: [
      'Programming and software development, computer architecture, data structures and algorithms, operating systems and databases, networks and cybersecurity, AI and machine learning, discrete mathematics, calculus and linear algebra.',
    ],
  },
]

export const timeline = [...entries].sort((a, b) => b.sort - a.sort)

export const certificates = [{ title: 'Web Development Bootcamp', by: 'Angela Yu' }]
