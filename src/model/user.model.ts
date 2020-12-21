import { model, Schema, Document } from 'mongoose';
import {  compare, compareSync, genSalt, genSaltSync, hash, hashSync } from 'bcryptjs';

export interface IUser {
    _id?: string;
    name: string;
    password: string;
    provider: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserMethod extends Document {    
    encryptPassword(): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}

export type User = IUser & IUserMethod;

const userSchema = new Schema<User>({
    name:       { type: Schema.Types.String },
    username:   { type: Schema.Types.String, unique: true },
    provider:   { type: Schema.Types.String , default: 'local'},
    password:   { type: Schema.Types.String }
}, {
    timestamps: true
});


userSchema.methods.encryptPassword = async function() {
    if(this.password) {
        const salt = await genSaltSync(10);
        const passwordHash = await hashSync(this.password, salt);
        this.password = passwordHash;
        console.log("passwordHash", passwordHash);
        console.log("passwordHash", this.password);
        console.log("this.", this);

    }
    return;
}

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    try {
        console.log("passwordHash", this.password);
        console.log("passwordHash 0", password);
        return await compareSync(password, this.password);        
    } catch (error) {
        throw error;
    }
}


export const UserModel = model<User>('users', userSchema);