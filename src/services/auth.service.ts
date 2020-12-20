import { UserRepository } from "./user.service";
import { PassportStatic, Passport, use, Authenticator  } from 'passport';
import * as passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export class AuthService {
    private userService: UserRepository;
    private _passport: any;

    constructor() {
        this.userService = new UserRepository();
        this._passport = passport;
    }

    public async validadeUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if(user && user.username == username) {
            const { password, ...result } = user;
            return result;
        }

        throw Error('usuario invalido');
    }

    public async authentication(username: string, password: string) {
        console.log("dwdwwd");

        this._passport.default.use(new LocalStrategy(
                function(username: string, password: string, done: Function) {
                    console.log("username", username);
                    console.log("pass", password);
                    done();
                }
        ));
        return new Promise((resolve, reject) => {
            this._passport.default.authenticate('local', async (err: any, user: any, info: any) => {
                console.info("err", err);
                if (err) { return reject(err); }

                try {
                    
                    const validate = await this.validadeUser(username, password);
                    console.log("validate", validate);

                    if(validate)
                        resolve(validate);
   
                } catch (error) {
                    reject(err)
                }
            });
        })
    }
}