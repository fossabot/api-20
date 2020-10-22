import { Request, Response, NextFunction } from 'express'

export type ErrorsMessageArray = Array<{ message: string, field?: string }>

export interface ObjectAny {
  [key: string]: any
}

export interface RequestHandlerObject {
  req: Request
  res: Response
  next: NextFunction
}
