export default class Validation {
  static shouldShowError(stage, value) {
    const validStageOne = stage === 0 && parseInt(value) > 2
    const validStageTwo = stage === 1 && ['c', 's', 'h'].includes(value)
    const validStageThree = stage === 2 && [true, false].includes(value)
    
    return !(validStageOne || validStageTwo || validStageThree)
  }
}