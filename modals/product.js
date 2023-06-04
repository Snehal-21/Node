import mongoose from "mongoose";
import{Schema} from "mongoose";

const product=new Schema({
    P_name:String,
    P_price:Number,
    P_category:String

});

export default mongoose.model("Products",product);