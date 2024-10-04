export class ApiError extends Error {
  errors?: Record<string, any>[];

  constructor(message: string, errors?: Record<string, any>[]) {
    super(message);

    this.errors = errors;
  }
}
