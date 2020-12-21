import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    private readonly userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async getByUserName(req: Request, res: Response) {
        const query: any = req.query;
        const user = await this.userService.findOne(query.username);
        return user;
    }


    public async getUserFacebook(req: Request, res: Response) {
        console.log("ewewe", req.query);
        console.log("req", req.sessionID);
        console.log("isAuthenticated", req.isAuthenticated());
        console.log("user", req.user);
        return res.send({});
    }

    public async getById(req: Request, res: Response) {
        
        console.log("isAuthenticated", req.isAuthenticated());
        const params: any = req.params;
      
        const user = await this.userService.findOneById(params.id);

        if(!user)
            return res.status(404).send({
                message: "usuário não encontrado"
            })
        const { password, ..._user } = user.toObject();
        return res.send(_user);
    }
}