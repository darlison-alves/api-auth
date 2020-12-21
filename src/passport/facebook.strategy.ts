import { Request } from "express";
import { Profile, Strategy } from 'passport-facebook';
import { UserModel } from "../model/user.model";

export class FacebookStrategy extends Strategy {
    constructor() {
        super(
        {
            clientID: process.env.FACEBOOK_APP_ID || "",
            clientSecret: process.env.FACEBOOK_APP_SECRET || "",
            callbackURL: "http://localhost:3000/facebook/callback",
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

        let user = await UserModel.findOne({ provider_id: id });
        if(!user)
            user = new UserModel( {
                 name: `${first_name} ${last_name}`,
                 username: profile.username || profile.id,
                 provider: profile.provider,
                 provider_id: profile.id
                } );

        if(!user.isNew)
            await user.save();
        else
            await user.update();

        const { password, ..._user } = user.toObject();

        done(null, _user);
    }
}