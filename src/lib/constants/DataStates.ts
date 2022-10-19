const DataStates = {
  NEVER: 'NEVER',
  FETCHING_FIRST: 'FETCHING_FIRST',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  OUTDATED: 'OUTDATED',
}

export const mergeDataStates = (states: string[]): string => {
  if (states.length === 0) return DataStates.NEVER
  if (states.some(s => s === DataStates.FAILURE)) return DataStates.FAILURE
  if (states.some(s => s === DataStates.OUTDATED)) return DataStates.OUTDATED
  if (states.some(s => s === DataStates.NEVER)) return DataStates.NEVER
  if (states.some(s => s === DataStates.FETCHING_FIRST)) return DataStates.FETCHING_FIRST
  if (states.some(s => s === DataStates.FETCHING)) return DataStates.FETCHING
  return DataStates.SUCCESS
}


export default DataStates