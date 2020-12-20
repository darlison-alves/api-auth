import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { BaseError } from '../errorCustom/base.error';
import { UserRepository } from '../services/user.service';

export class LocalStrategy extends Strategy {
    private userRepository: UserRepository;
    constructor() {
        super((sername: string, password: string, done: Function) => this.logIn(sername, password, done));
        this.userRepository = new UserRepository();
    }

    async logIn(username: string, password: string, done: Function) {
        const user = await this.userRepository.findOne(username);
        console.info('user', user);

        if(user.password == password) 
            return done(null, { id: 1, name: "Darlinson", itens:[] });

        return done(new BaseError("senha invalida", 403), false);
    }
}

export default passport;