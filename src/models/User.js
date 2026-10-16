import mogoose from 'mongoose';

const UserSchema = new mogoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})

export const User = mogoose.model('User', UserSchema,'Barbe.com');