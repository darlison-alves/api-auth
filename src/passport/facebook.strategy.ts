import { Request } from "express";
import { Profile, Strategy } from 'passport-facebook';
import { UserModel } from "../model/user.model";

export class FacebookStrategy extends Strategy {
    constructor() {
        super(
        {
            clientID: process.env.FACEBOOK_APP_ID || "",
            clientSecret: process.env.FACEBOOK_APP_SECRET || "",
            callbackURL: process.env.FACEBOOK_URL_CALLBACK || "",
            profileFields:["email", "name"],
            display: "touch",
            enableProof: true
        }, 
        (accessToken: string, refreshToken: string, profile: Profile, done: Function) =>
         this.logIn(accessToken, refreshToken, profile, done)
        )
    }

    async logIn(accessToken: string, refreshToken: string, profile: Profile, done: Function ) {
        const { last_name,  first_name, id } = profile._json;
        let isNew = false;
        let user = await UserModel.findOne({ provider_id: id });
        if(!user) {
            isNew = true;
            user = new UserModel( {
                name: `${first_name} ${last_name}`,
                username: profile.username || profile.id,
                provider: profile.provider,
                provider_id: profile.id
               } );
        }
            
        if(isNew) {
            console.log("novo")
            await user.save();
        }
        else {
            console.log("update")
            await user.replaceOne(user.toObject());
        }

        const { password, ..._user } = user.toObject();

        done(null, _user);
    }
}