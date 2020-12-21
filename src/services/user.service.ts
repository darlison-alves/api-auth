import { IUser, UserModel } from "../model/user.model";

export class UserService {
    
    constructor() {}

    public async findOne(username:string): Promise<any> {
        return await UserModel.findOne({ username });
    }

    public async findOneById(id:string): Promise<any> {
        return await UserModel.findById(id);
    }

    public async update(id: string, user: IUser) {
        return await UserModel.findByIdAndUpdate(id, user);
    }

}