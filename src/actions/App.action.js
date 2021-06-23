export default class AppAction{
  static shouldShowError(currentValue, receivedValue){
    return !currentValue && receivedValue === 'Enter'
  }
}