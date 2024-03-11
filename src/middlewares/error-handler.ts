import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler = (_error: ErrorRequestHandler, _request: Request, response: Response, _next: NextFunction) => {
  response.status(500).json({
    code: 'UNCONTROLLER_ERROR',
    message: 'An unexpected error has occurred. 😥'
  })
}