// src/lib/errors.ts

export class AppError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function toAppError(err: unknown) {
  if (err instanceof AppError) return err;
  return new AppError("Internal Server Error", 500);
}
