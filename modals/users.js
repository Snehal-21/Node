import mongoose from "mongoose";
import { Schema } from "mongoose";
import { object } from "webidl-conversions";
const product=new Schema({
    p_name:String,
    p_price:String
})
const user=new Schema({
    name:String,
    email:String,
    number:Number,
    password:String,
    otpForEmail:String,
    otpForNumber:String,
    isNumberverified:Boolean,
    isEmailVerified:Boolean,
    products:[product]

});

export default mongoose.model("Users",user);