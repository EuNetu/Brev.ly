export class LinkAlreadyExistsError extends Error {
  constructor() {
    super('Link com o mesmo código já existe.')
  }
}