export const MERGE_ENTITIES = 'MERGE_ENTITIES'

export function mergeEntities (entities) {
  return {type: MERGE_ENTITIES, payload: { entities }}
}
