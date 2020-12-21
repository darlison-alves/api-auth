import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { BaseError } from '../errorCustom/base.error';
import { UserModel } from '../model/user.model';

export class LocalStrategy extends Strategy {
    constructor() {
        super((sername: string, password: string, done: Function) => this.logIn(sername, password, done));
    }

    async logIn(username: string, password_current: string, done: Function) {
        try {
            const user = await UserModel.findOne({ username });

            console.log("usermo", user);

            if(!user) 
                throw new BaseError('Usuário ou senha inválido', 403);

            // await usermo.encryptPassword();
            const isPasswordValid = await user.comparePassword(password_current);

            console.log("result", isPasswordValid);

            if(!isPasswordValid) 
                return done(new BaseError('Usuário ou senha inválido', 403), false);

            const { password ,...result } = user.toObject();
            done(null, result);
            
        } catch (error) {
            done(error, false);
        }
    }
}

export default passport;