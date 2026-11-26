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
    <svg {...svgProps} aria-label="Pipeline: a live producer polling the USGS feed and a replay producer of synthetic events publish to Kafka; Spark Structured Streaming consumes, deduplicates and runs analytics; results land in PostgreSQL and a Dash dashboard; a scheduled GitHub Actions run publishes a static copy to GitHub Pages.">

      <Arrow id="arr-seismic" />
      {/* Sources */}
      <rect x="16" y="96" width="140" height="52" rx="2" className="box" />
      <text x="28" y="118" className="lbl">USGS feed</text>
      <text x="28" y="136" className="lbl-sm">live, GeoJSON</text>
      <rect x="16" y="186" width="140" height="52" rx="2" className="box" strokeDasharray="3 4" />
      <text x="28" y="208" className="lbl">Replay producer</text>
      <text x="28" y="226" className="lbl-sm">synthetic events</text>

      {/* Kafka */}
      <rect x="178" y="118" width="110" height="90" rx="2" className="box-ink" />
      <text x="190" y="142" className="lbl-inv">Kafka</text>
      <rect x="190" y="156" width="86" height="8" fill="#fff" opacity="0.9" />
      <rect x="190" y="170" width="86" height="8" fill="#fff" opacity="0.7" />
      <rect x="190" y="184" width="86" height="8" fill="#fff" opacity="0.5" />
      <text x="178" y="226" className="lbl-sm">topic, 3 partitions</text>

      {/* Spark */}
      <rect x="322" y="98" width="166" height="130" rx="2" className="box" />
      <text x="334" y="122" className="lbl">Spark</text>
      <text x="334" y="140" className="lbl-sm">Structured Streaming</text>
      <text x="334" y="166" className="lbl-sm">parse, dedupe, enrich</text>
      <text x="334" y="182" className="lbl-sm">sliding windows, z-scores</text>
      <text x="334" y="198" className="lbl-sm">K-Means, b-value</text>
      <text x="334" y="214" className="lbl-sm">Omori–Utsu forecast</text>

      {/* PostgreSQL */}
      <path d="M506 104 a37 10 0 0 1 74 0 v62 a37 10 0 0 1 -74 0 z" className="box" />
      <ellipse cx="543" cy="104" rx="37" ry="10" className="box" />
      <text x="543" y="146" className="lbl" textAnchor="middle" style={{ fontSize: 13 }}>Postgres</text>

      {/* Dashboard */}
      <rect x="462" y="236" width="118" height="88" rx="2" className="box" />
      <text x="474" y="256" className="lbl">Dash</text>
      <g>
        <circle cx="500" cy="290" r="3" fill="var(--color-ink)" />
        <circle cx="520" cy="278" r="2.5" fill="var(--color-ink)" />
        <circle cx="552" cy="300" r="2.5" fill="var(--color-ink)" />
        <circle cx="538" cy="286" r="7" className="fill-accent" />
        <circle cx="530" cy="306" r="4" className="fill-accent" />
        <text x="474" y="318" className="lbl-sm">cells, forecasts</text>
      </g>

      {/* Flows */}
      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M156 122 L178 140" className="line" markerEnd={m} />
        <path d="M156 212 L178 194" className="line-soft" markerEnd={m} />
        <path d="M288 163 L322 163" className="line" markerEnd={m} />
        <path d="M488 140 L506 132" className="line" markerEnd={m} />
        <path d="M543 176 L543 236" className="line" markerEnd={m} />
        <path d="M462 292 L440 292" className="line-soft" markerEnd={m} />
      </g>

      {/* The public page: a static copy */}
      <rect x="290" y="270" width="150" height="44" rx="2" className="box" strokeDasharray="3 4" />
      <text x="302" y="288" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>GitHub Pages</text>
      <text x="302" y="304" className="lbl-sm">static copy, via Actions</text>

      {/* Compose footer */}
      <rect x="20" y="340" width="560" height="24" rx="2" className="fill-zone" />
      <text x="32" y="356" className="lbl-sm" style={{ fontSize: 11 }}>Docker Compose: Kafka, Postgres, Spark master and two workers, streaming job, producers, dashboard</text>
    </svg>
  )
}

function Research() {
  const m = 'url(#arr-research)'
  const checks = ['Citations', 'Budget, reagents', 'Reviewer critique']
  return (
    <svg {...svgProps} aria-label="Flow: a hypothesis passes rule-based feasibility tests and an AI quality gate, is searched in Semantic Scholar, OpenAlex and PubMed and gets a novelty verdict with citations; a plan is generated with a safety screen in the prompt, its citations, budget and reagents are checked, a second AI call reviews it as a critic, and the result is an experiment plan with protocol, materials, budget and success criteria.">
      <Arrow id="arr-research" />
      <rect x="40" y="14" width="520" height="34" rx="2" className="box" />
      <text x="54" y="36" className="lbl">Hypothesis, in plain language</text>

      <rect x="150" y="66" width="300" height="30" rx="2" className="box" />
      <text x="164" y="86" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>
        Gate: feasibility rules, AI quality check
      </text>

      {[
        ['Semantic Scholar', 40],
        ['OpenAlex', 220],
        ['PubMed', 400],
      ].map(([label, x]) => (
        <g key={label as string}>
          <rect x={x as number} y="116" width="160" height="34" rx="2" className="box" />
          <text x={(x as number) + 12} y="138" className="lbl">
            {label}
          </text>
        </g>
      ))}

      <rect x="170" y="172" width="260" height="34" rx="2" className="box-ink" />
      <text x="184" y="194" className="lbl-inv">Novelty verdict, with citations</text>

      <rect x="110" y="226" width="380" height="34" rx="2" className="box" />
      <text x="124" y="248" className="lbl">Plan generation</text>
      <text x="262" y="248" className="lbl-sm">safety screen in the prompt</text>

      {checks.map((c, i) => (
        <g key={c}>
          <rect x={40 + i * 180} y="280" width="160" height="28" rx="2" className="box" />
          <text x={52 + i * 180} y="299" className="lbl-sm" style={{ fill: 'var(--color-ink)' }}>
            {c}
          </text>
        </g>
      ))}

      <rect x="40" y="328" width="520" height="38" rx="2" className="box-accent" />
      <text x="54" y="352" className="lbl-inv">Experiment plan: protocol, materials, budget, success criteria</text>

      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M300 48 L300 66" className="line" markerEnd={m} />
        <path d="M300 96 L120 116" className="line" markerEnd={m} />
        <path d="M300 96 L300 116" className="line" markerEnd={m} />
        <path d="M300 96 L480 116" className="line" markerEnd={m} />
        <path d="M120 150 L230 172" className="line-soft" markerEnd={m} />
        <path d="M300 150 L300 172" className="line-soft" markerEnd={m} />
        <path d="M480 150 L370 172" className="line-soft" markerEnd={m} />
        <path d="M300 206 L300 226" className="line" markerEnd={m} />
        <path d="M200 260 L120 280" className="line" markerEnd={m} />
        <path d="M300 260 L300 280" className="line" markerEnd={m} />
        <path d="M400 260 L480 280" className="line" markerEnd={m} />
        <path d="M300 308 L300 328" className="line" markerEnd={m} />
      </g>
    </svg>
  )
}

function LifeOps() {
  const m = 'url(#arr-lifeops)'
  const inputs = ['Inbox', 'Calendar', 'A messy note']
  const outputs = ['Ranked tasks', 'Week plan', 'Calendar blocks', 'Email drafts']
  return (
    <svg {...svgProps} aria-label="Flow: inbox, calendar and a free-form note go into a planner that produces prioritised tasks, a week plan, calendar blocks and email drafts; an approval gate sits between the planner and anything that touches the calendar or mail. The public demo uses a sample inbox and calendar, and emails are only ever drafted, never sent.">
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
        <path d="M388 98 L472 64" className="line" markerEnd={m} />
        <path d="M448 145 L472 125" className="line" markerEnd={m} />
        <path d="M448 170 L472 185" className="line" markerEnd={m} />
        <path d="M448 195 L472 240" className="line" markerEnd={m} />
        <path d="M88 290 L88 180" className="line-soft" markerEnd={m} />
      </g>
      <text x="24" y="312" className="lbl-sm">Sample inbox and calendar, or Google via OAuth</text>
      <rect x="24" y="340" width="556" height="24" rx="2" className="fill-zone" />
      <text x="36" y="356" className="lbl-sm">Emails are only drafted, never sent. Calendar changes wait for your yes.</text>
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
  const m = 'url(#arr-vr)'
  const dim = { fill: '#cfcfc8' }
  return (
    <svg {...svgProps} aria-label="Schematic cross-section of a pirate ship with four rooms on two decks. The player starts in a prison cell inside the prison room (broom and key, then a number lock with a logbook clue), goes on to the storage room, stacks crates up through a hole in the ceiling into the cannon room, fires a cannon through the wall into the captain's room, and escapes through a door hidden behind a bookshelf whose lock is coded by a blinking lantern.">
      <Arrow id="arr-vr" />
      {/* Mast and flag */}
      <path d="M330 112 L330 22" className="line" />
      <path d="M330 22 L376 32 L330 42 Z" className="box-ink" />
      {/* Hull and decks */}
      <path d="M30 112 L570 112 L522 330 L78 330 Z" className="box" />
      <path d="M54 222 L546 222" className="line-soft" />
      <rect x="462" y="218" width="36" height="8" className="fill-zone" />

      {/* Upper deck */}
      <rect x="70" y="124" width="220" height="88" rx="2" className="box" />
      <text x="82" y="146" className="lbl">Captain&apos;s room</text>
      <text x="82" y="168" className="lbl-sm">a bookshelf hides the door;</text>
      <text x="82" y="184" className="lbl-sm">a lantern blinks the code</text>
      <rect x="300" y="124" width="230" height="88" rx="2" className="box" />
      <text x="312" y="146" className="lbl">Cannon room</text>
      <text x="312" y="168" className="lbl-sm">a torch fires the cannon</text>
      <text x="312" y="184" className="lbl-sm">through the wall</text>

      {/* Lower deck */}
      <rect x="92" y="232" width="198" height="86" rx="2" className="box" />
      <rect x="100" y="242" width="82" height="66" rx="2" className="box-ink" />
      <text x="110" y="264" className="lbl-inv">Cell</text>
      <text x="110" y="282" className="lbl-sm" style={dim}>broom</text>
      <text x="110" y="298" className="lbl-sm" style={dim}>and key</text>
      <text x="192" y="254" className="lbl">Prison room</text>
      <text x="192" y="276" className="lbl-sm">logbook clue,</text>
      <text x="192" y="292" className="lbl-sm">number lock</text>
      <rect x="300" y="232" width="206" height="86" rx="2" className="box" />
      <text x="312" y="254" className="lbl">Storage room</text>
      <text x="312" y="276" className="lbl-sm">stack crates up</text>
      <text x="312" y="292" className="lbl-sm">to the hole above</text>
      {/* Crates */}
      <rect x="452" y="298" width="18" height="18" className="box" />
      <rect x="470" y="298" width="18" height="18" className="box" />
      <rect x="470" y="280" width="18" height="18" className="box" />

      {/* Exit */}
      <rect x="60" y="56" width="112" height="36" rx="2" className="box-accent" />
      <text x="74" y="80" className="lbl-inv">Escaped</text>

      {/* The way out */}
      <g style={{ color: 'var(--color-ink)' }}>
        <path d="M290 302 L314 302" className="line" markerEnd={m} />
        <path d="M480 276 L480 196" className="line" markerEnd={m} />
        <path d="M318 200 L262 200" className="line" markerEnd={m} />
        <path d="M116 124 L116 92" className="line" markerEnd={m} />
      </g>
      <text x="486" y="208" className="lbl-sm">hole</text>

      <rect x="20" y="342" width="560" height="24" rx="2" className="fill-zone" />
      <text x="32" y="358" className="lbl-sm">Godot 4.2, XR Tools and Jolt physics. Models from Blender and free libraries.</text>
    </svg>
  )
}
