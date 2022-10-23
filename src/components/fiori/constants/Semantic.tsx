export type Semantic =
  'positive' |
  'negative' |
  'critical' |
  'informative'

export const Semantics: { [key: string]: Semantic } = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  CRITICAL: 'critical',
  INFORMATIVE: 'informative'
}