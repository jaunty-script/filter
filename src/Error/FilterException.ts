export default class FilterException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FilterException';
  }
}
