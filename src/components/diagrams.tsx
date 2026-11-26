import type { DiagramId } from '@/data/projects'

/**
 * Hand-drawn schematics, one per project, in the site's own language:
 * black outlines on paper, a solid black block for the component that does
 * the work, and the accent for the one thing that matters most. Each is a
 * 600 x 380 canvas. Text uses the page font.
 */
export function Diagram({ id }: { id: DiagramId }) {
  switch (id) {
    case 'seismic':
      return <Seismic />
    case 'research':
      return <Research />
    case 'lifeops':
      return <LifeOps />
    case 'mri':
      return <Mri />
    case 'vr':
      return <Vr />
  }
}

function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
      </marker>
    </defs>
  )
}

const svgProps = {
  viewBox: '0 0 600 380',
  className: 'diagram',
  role: 'img' as const,
}

function Seismic() {
  const m = 'url(#arr-seismic)'
  return (
    <svg {...svgProps} aria-label="Pipeline: USGS feed and a replay producer publish to Kafka; Spark Structured Streaming consumes, deduplicates and runs analytics; results land in PostgreSQL and a Dash dashboard.">
      <Arrow id="arr-seismic" />
      {/* Sources */}
      <rect x="20" y="96" width="112" height="52" rx="2" className="box" />
      <text x="32" y="118" className="lbl">USGS feed</text>
      <text x="32" y="136" className="lbl-sm">live, GeoJSON</text>
      <rect x="20" y="186" width="112" height="52" rx="2" className="box" strokeDasharray="3 4" />
      <text x="32" y="208" className="lbl">Replay producer</text>
      <text x="32" y="226" className="lbl-sm">prepared events</text>

      {/* Kafka */}
      <rect x="178" y="118" width="110" height="90" rx="2" className="box-ink" />
      <text x="190" y="142" className="lbl-inv">Kafka</text>
      <rect x="190" y="156" width="86" height="8" fill="#fff" opacity="0.9" />
      <rect x="190" y="170" width="86" height="8" fill="#fff" opacity="0.7" />
      <rect x="190" y="184" width="86" height="8" fill="#fff" opacity="0.5" />
      <text x="178" y="226" className="lbl-sm">topic, 3 partitions</text>

      {/* Spark */}
      <rect x="322" y="98" width="156" height="130" rx="2" className="box" />
      <text x="334" y="122" className="lbl">Spark</text>
      <text x="334" y="140" className="lbl-sm">Structured Streaming</text>
      <text x="334" y="166" className="lbl-sm">parse, dedupe, enrich</text>
      <text x="334" y="182" className="lbl-sm">sliding windows, z-scores</text>
      <text x="334" y="198" className="lbl-sm">K-Means, b-value</text>
      <text x="334" y="214" className="lbl-sm">Omori–Utsu forecast</text>

      {/* PostgreSQL */}
      <path d="M506 104 a37 10 0 0 1 74 0 v62 a37 10 0 0 1 -74 0 z" className="box" />
      <ellipse cx="543" cy="104" rx="37" ry="10" className="box" />
      <text x="517" y="146" className="lbl">Postgres</text>

      {/* Dashboard */}
      <rect x="462" y="236" width="118" height="88" rx="2" className="box" />
      <text x="474" y="256" className="lbl">Dash</text>
      <g>
        <circle cx="500" cy="290" r="3" fill="var(--color-ink)" />
        <circle cx="520" cy="278" r="2.5" fill="var(--color-ink)" />
        <circle cx="552" cy="300" r="2.5" fill="var(--color-ink)" />
        <circle cx="538" cy="286" r="7" className="fill-accent" />
        <circle cx="530" cy="306" r="4" className="fill-accent" />
        <text x="474" y="318" className="lbl-sm">cells and forecasts</text>
      </g>

      {/* Flows */}
      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M132 122 L178 150" className="line" markerEnd={m} />
        <path d="M132 212 L178 184" className="line-soft" markerEnd={m} />
        <path d="M288 163 L322 163" className="line" markerEnd={m} />
        <path d="M478 140 L506 132" className="line" markerEnd={m} />
        <path d="M543 176 L543 236" className="line" markerEnd={m} />
      </g>

      {/* Compose footer */}
      <rect x="20" y="340" width="560" height="24" rx="2" className="fill-zone" />
      <text x="32" y="356" className="lbl-sm" style={{ fontSize: 11 }}>Docker Compose: Kafka, Postgres, Spark master and two workers, streaming job, producers, dashboard</text>
    </svg>
  )
}

function Research() {
  const m = 'url(#arr-research)'
  const guards = ['Quality', 'Feasibility', 'Safety', 'Citations', 'Reagents']
  return (
    <svg {...svgProps} aria-label="Flow: a hypothesis is checked against Semantic Scholar, OpenAlex and PubMed, passes a novelty check and five validation guards, and becomes an experiment plan with protocol, materials, budget and success criteria.">
      <Arrow id="arr-research" />
      <rect x="40" y="24" width="520" height="44" rx="2" className="box" />
      <text x="54" y="51" className="lbl">Hypothesis, in plain language</text>

      {[
        ['Semantic Scholar', 40],
        ['OpenAlex', 220],
        ['PubMed', 400],
      ].map(([label, x]) => (
        <g key={label as string}>
          <rect x={x as number} y="112" width="160" height="40" rx="2" className="box" />
          <text x={(x as number) + 12} y="137" className="lbl">
            {label}
          </text>
        </g>
      ))}

      <rect x="200" y="196" width="200" height="40" rx="2" className="box-ink" />
      <text x="214" y="221" className="lbl-inv">Novelty check, with citations</text>

      {guards.map((g, i) => (
        <g key={g}>
          <rect x={40 + i * 106} y="272" width="96" height="30" rx="2" className="box" />
          <text x={52 + i * 106} y="292" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>
            {g}
          </text>
        </g>
      ))}

      <rect x="40" y="330" width="520" height="40" rx="2" className="box-accent" />
      <text x="54" y="355" className="lbl-inv">Experiment plan: protocol, materials, budget, success criteria</text>

      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M300 68 L120 112" className="line" markerEnd={m} />
        <path d="M300 68 L300 112" className="line" markerEnd={m} />
        <path d="M300 68 L480 112" className="line" markerEnd={m} />
        <path d="M120 152 L250 196" className="line-soft" markerEnd={m} />
        <path d="M300 152 L300 196" className="line-soft" markerEnd={m} />
        <path d="M480 152 L350 196" className="line-soft" markerEnd={m} />
        <path d="M300 236 L300 272" className="line" markerEnd={m} />
        <path d="M300 302 L300 330" className="line" markerEnd={m} />
      </g>
      <text x="420" y="258" className="lbl-sm">validation guards</text>
    </svg>
  )
}

function LifeOps() {
  const m = 'url(#arr-lifeops)'
  const inputs = ['Inbox', 'Calendar', 'A messy note']
  const outputs = ['Tasks, prioritised', 'Week plan', 'Calendar blocks', 'Email drafts']
  return (
    <svg {...svgProps} aria-label="Flow: inbox, calendar and a free-form note go into a planner that produces prioritised tasks, a week plan, calendar blocks and email drafts; an approval gate sits between the planner and anything that touches the calendar or mail.">
      <Arrow id="arr-lifeops" />
      {inputs.map((label, i) => (
        <g key={label}>
          <rect x="24" y={70 + i * 66} width="128" height="42" rx="2" className="box" />
          <text x="36" y={96 + i * 66} className="lbl">
            {label}
          </text>
        </g>
      ))}

      <rect x="212" y="92" width="176" height="130" rx="2" className="box-ink" />
      <text x="226" y="118" className="lbl-inv">Planner</text>
      <text x="226" y="142" className="lbl-sm" style={{ fill: '#cfcfc8' }}>LLM, structured output</text>
      <text x="226" y="160" className="lbl-sm" style={{ fill: '#cfcfc8' }}>prioritise tasks</text>
      <text x="226" y="178" className="lbl-sm" style={{ fill: '#cfcfc8' }}>find free slots</text>
      <text x="226" y="196" className="lbl-sm" style={{ fill: '#cfcfc8' }}>check for conflicts</text>

      {/* Approval gate */}
      <rect x="414" y="92" width="34" height="130" rx="2" className="box-accent" />
      <text transform="translate(436 206) rotate(-90)" className="lbl-inv">You approve</text>

      {outputs.map((label, i) => (
        <g key={label}>
          <rect x="472" y={40 + i * 58} width="108" height="40" rx="2" className="box" />
          <text x="482" y={65 + i * 58} className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>
            {label}
          </text>
        </g>
      ))}

      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M152 91 L212 120" className="line" markerEnd={m} />
        <path d="M152 157 L212 157" className="line" markerEnd={m} />
        <path d="M152 223 L212 194" className="line" markerEnd={m} />
        <path d="M388 157 L414 157" className="line" markerEnd={m} />
        <path d="M448 120 L472 70" className="line" markerEnd={m} />
        <path d="M448 145 L472 125" className="line" markerEnd={m} />
        <path d="M448 170 L472 185" className="line" markerEnd={m} />
        <path d="M448 195 L472 240" className="line" markerEnd={m} />
        <path d="M88 290 L88 180" className="line-soft" markerEnd={m} />
      </g>
      <text x="24" y="312" className="lbl-sm">Google Calendar and Gmail, via OAuth</text>
      <rect x="24" y="340" width="556" height="24" rx="2" className="fill-zone" />
      <text x="36" y="356" className="lbl-sm">Emails stay drafts. Nothing is sent, moved or cancelled without a yes.</text>
    </svg>
  )
}

function Mri() {
  const m = 'url(#arr-mri)'
  // Three slices of a volume, drawn as parallelograms, back to front.
  const slice = (dx: number, dy: number) => `M${70 + dx} ${150 + dy} l180 0 l-50 100 l-180 0 z`
  return (
    <svg {...svgProps} aria-label="Three stacked MRI slices with a segmented region traced through them; the front slice shows a detection box and a mask. Arrows lead to a YOLO block adapted for 3D data, with preprocessing and augmentation noted.">
      <Arrow id="arr-mri" />
      <path d={slice(70, -80)} className="box" />
      <path d={slice(35, -40)} className="box" />
      <path d={slice(0, 0)} className="box" />

      {/* region through the volume */}
      <ellipse cx="200" cy="112" rx="22" ry="11" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      <ellipse cx="170" cy="156" rx="28" ry="13" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      <ellipse cx="150" cy="200" rx="34" ry="16" className="fill-accent" opacity="0.9" />
      <rect x="100" y="176" width="100" height="48" fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="28" y="280" className="lbl-sm">slice by slice: box, then mask</text>

      <text x="70" y="52" className="lbl">Brain MRI volume</text>
      <text x="70" y="70" className="lbl-sm">preprocessed, consistent orientation and intensity</text>

      {/* Model */}
      <rect x="380" y="112" width="190" height="56" rx="2" className="box-ink" />
      <text x="394" y="136" className="lbl-inv">YOLO</text>
      <text x="394" y="156" className="lbl-sm" style={{ fill: '#cfcfc8' }}>adapted for 3D MRI data</text>

      <rect x="380" y="200" width="190" height="40" rx="2" className="box" />
      <text x="394" y="218" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>Instance masks</text>
      <text x="394" y="232" className="lbl-sm">one per region, per slice</text>

      <rect x="380" y="272" width="200" height="64" rx="2" className="box" strokeDasharray="3 4" />
      <text x="394" y="294" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>Augmentation</text>
      <text x="394" y="310" className="lbl-sm">flips, rotations, intensity shifts</text>
      <text x="394" y="324" className="lbl-sm">to generalise past the training set</text>

      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M300 150 L380 140" className="line" markerEnd={m} />
        <path d="M475 168 L475 200" className="line" markerEnd={m} />
        <path d="M330 290 L380 300" className="line-soft" markerEnd={m} />
      </g>
    </svg>
  )
}

function Vr() {
  return (
    <svg {...svgProps} aria-label="Side view of a pirate ship with a mast, sail and flag. Three numbered puzzle stations on the deck are joined by a dotted path that ends at the exit.">
      {/* Hull */}
      <path d="M50 236 L560 236 L510 320 L110 320 Z" className="box" />
      <path d="M50 236 L40 200 L120 236" className="box" />
      <path d="M560 236 L590 190 L520 236" className="box" />
      <path d="M110 320 L510 320" className="line" />
      {/* Mast, sail, flag */}
      <path d="M300 236 L300 50" className="line" />
      <path d="M300 76 L300 176 L420 176 Q380 126 420 76 Z" className="box" />
      <path d="M300 50 L352 62 L300 74 Z" className="fill-accent" />
      {/* Portholes */}
      {[160, 230, 370, 440].map((x) => (
        <circle key={x} cx={x} cy="280" r="7" className="box" />
      ))}
      {/* Puzzle stations and path */}
      {[
        [130, 'Galley'],
        [250, 'Cabin'],
        [390, 'Hold'],
      ].map(([x, label], i) => (
        <g key={label as string}>
          <rect x={(x as number) - 16} y="204" width="32" height="32" rx="2" className="box-ink" />
          <text x={(x as number) - 5} y="226" className="lbl-inv">
            {i + 1}
          </text>
          <text x={(x as number) - 16} y="196" className="lbl-sm">
            {label}
          </text>
        </g>
      ))}
      <path d="M146 220 L234 220 M266 220 L374 220 M406 220 L470 220" className="line-soft" />
      <rect x="470" y="200" width="70" height="36" rx="2" className="box-accent" />
      <text x="486" y="224" className="lbl-inv">Exit</text>

      <text x="50" y="358" className="lbl-sm">Godot, VR mechanics, puzzle chain, 3D assets, weather and sound. Jira and Git for the team.</text>
    </svg>
  )
}
