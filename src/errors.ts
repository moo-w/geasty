export class GeastyError extends Error {
  constructor(message: string = 'Geasty Unknwon Error', options: ErrorOptions = {}) {
    super(message, options)
    this.name = 'GeastyError'
  }
}
