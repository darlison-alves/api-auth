import { BaseError } from "./base.error";

export class UnauthorizedError extends BaseError {
    constructor() {
        super("usuário não autorizado!", 401);
    }
}