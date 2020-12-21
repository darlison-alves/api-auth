import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errorCustom/unauthorized.error";

export function AuthenticatedMiddleware (req: Request, res: Response, next: NextFunction) {
    if(!req.isAuthenticated())
        throw new UnauthorizedError();
    next();
}