/**
 * What a visitor can say they are hiring for. Picking one puts the matching
 * projects first, pre-highlights the skills map and tailors the contact line.
 * Projects declare their roles in projects.ts; skills.ts maps a role to the
 * contexts (projects, internships, thesis, coursework) that count for it.
 */
export type Role = 'ml' | 'data' | 'software' | 'research'

export const roles: { id: Role; label: string }[] = [
  { id: 'ml', label: 'Machine learning' },
  { id: 'data', label: 'Data engineering' },
  { id: 'software', label: 'Software engineering' },
  { id: 'research', label: 'Research' },
]

export function roleLabel(role: Role) {
  return roles.find((r) => r.id === role)?.label ?? ''
}
