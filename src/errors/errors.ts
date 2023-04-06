import { ApplicationError } from "../protocols/contracts";

export function unauthorizedError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

export function conflictError(message: string): ApplicationError {
  return {
    name: "ConflictError",
    message,
  };
}

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export function badRequestError(): ApplicationError {
  return {
    name: "BadRequestError",
    message: "Something is wrong in the send format",
  };
}
