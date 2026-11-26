# Design notes

The site is a portfolio for a data-science student in Basel, so it borrows its
discipline from the place: Basel is where Emil Ruder and Armin Hofmann taught
the Swiss style. A strong grotesque, a modular grid, flush-left ragged-right
text, big scale contrasts and one accent. Nothing is decorated; every rule,
number and colour carries information.

## Tokens

Defined in `src/styles.css` under `@theme`, available as Tailwind utilities.

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#fbfbf8` | page background |
| `zone` | `#eeeee8` | inset panels inside diagrams |
| `ink` | `#000000` | display type, inverted blocks, outlines |
| `text` | `#262624` | body text |
| `muted` | `#6b6b66` | secondary text, labels |
| `rule` | `#d8d8d0` | list separators |
| `accent` | `#2439e0` | the one highlight: active skills, hover, focus rings |
| `accent-deep` | `#1a2ab5` | accent for small text, keeps contrast |

Type: Bricolage Grotesque, variable, self-hosted. One family; the range comes
from the axes. Display setting is weight 760, width 86 %, tracking −0.028 em
(`.display`); headings are weight 640, width 92 % (`.headline`); row and card
titles are weight 600 (`.title`); body is weight 400 at 17 px with 1.55 leading.

Scale (px): 14, 17, 21, 26, 34, 48, then fluid 44–76 for section headings and
68–240 for the name.

## Layout

Twelve columns, 24 px gutters, 1440 px maximum, side gutter fluid between
20 and 64 px. Every section opens the same way: heading on columns 1–6, lede on
columns 8–12, over a single black rule.

```
Hero       [place/date      ]                      [intro, 6 cols        ]
                                                   [See the projects] Email me
           [GOPAL                       ]          [statement, 4 cols    ]
           [KRISHNA                     ]
About      [prose, 7 cols                 ]        [fact sheet, 4 cols   ]
Projects   [rows, 7 cols                  ]        [sticky sketch, 5 cols]
Skills     [chips ............................................................]
           [map, 8 cols                              ] [list, 4 cols      ]
Background [date|kind|entry ................................................]
Contact    ███ black block: question, email set large, three links ███████████
```

## Motion

One choreographed moment: the hero rises on load (CSS clip reveals, staggered
by `--delay`). After that nothing moves unless the visitor does something:
project rows invert on hover and swap the sketch; the skills map draws itself
once when it scrolls into view and then only responds to hover and clicks;
page changes use the View Transitions API through TanStack Router.
`prefers-reduced-motion` collapses every animation and transition to nothing.

## The one bold element

The skills map. Skills are points inside dashed cluster boxes; choosing a
project, internship or course lights the skills it used and dims the rest.
The list beside it is the accessible version of the same data and reacts the
same way, so the SVG is hidden from assistive technology.

## The immersive view

A second reading of the same system, switched from the header and remembered
per browser. Nothing is redesigned; the token variables are swapped section
by section, so every component recolours itself:

| Section | Plain | Immersive |
| --- | --- | --- |
| header, hero, skills | paper | black, with the accent kept |
| about, contact | paper / black | ultramarine with white type |
| projects | paper rows | full-screen spreads alternating paper, grey and black, stacking on scroll |
| background | paper | paper |

Three things are added rather than restyled: a canvas field of drifting
points joined to their neighbours and pushed by the pointer (streams and
embeddings, the two motifs in the work), a greeting with the time in Basel,
and the "what are you hiring for?" chips, which reorder the projects,
pre-light the skills map and change the contact line. The constellation
lines on the skills map are drawn per cluster, never across the map.

## What was deliberately avoided

Cream-and-terracotta, dark-mode-with-neon, hairline-everything newspaper
grids, card kits with one radius for everything, eyebrow labels in caps,
middle-dot meta strings, arrows glued to link text, skill bars with
percentages, stock photography, gradient blobs.
