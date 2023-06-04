import Users from "../modals/users.js";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("Email is required!");
        if (!number) return res.send("Number id required!");
        var email_Code = uuidv4();
        var number_Code = uuidv4();

        const isEmail = await Users.find({ email }).exec();
        if (isEmail.length) return res.send("Email already present");

        const isNumber = await Users.find({ number }).exec();
        if (isNumber.length) return res.send("Number already present");

        const user = new Users({
            email,
            number,
            otpForEmail: email_Code,
            otpForNumber: number_Code,
            isNumberverified: false,
            isEmailVerified: false
        });
        await user.save();
        res.send("Check your mobile and Email for OTP")
    } catch (error) {
        return res.send(error, "regisetr error here");
    }

}

export const check_RegisterEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email) return res.send("email is requires!");
        if (!otp) return res.send("OTP is required!");

        const user = await Users.find({ email }).exec();
        if (!user.length) return res.send("user not found");
        if (user[0].otpForEmail == otp) {
            await Users.findOneAndUpdate({ email }, { isEmailVerified: true }).exec();
            return res.send("Email OTP verified!")
        }
        return res.send("Wrong OTP")
    }
    catch (error) {
        return res.send(error)
    }

}


export const check_RegisterNumber = async (req, res) => {
    try {
        const { number, otp } = req.body;
        if (!number) return res.send("email is requires!");
        if (!otp) return res.send("OTP is required!");

        const user = await Users.find({ number }).exec();
        if (!user.length) return res.send("user not found");
        if (user[0].otpForNumber == otp) {
            await Users.findOneAndUpdate({ number }, { isNumberverified: true }).exec();
            return res.send("Mobile OTP verified!")
        }
        return res.send("Wrong OTP")
    }
    catch (error) {
        return res.send(error)
    }

}

export const Login = async (req, res) => {
    try {
        const { email, number } = req.body;
        if (!email) return res.send("Email is required!");
        if (!number) return res.send("Number is required!");

        const user = await Users.find({ email, number }).exec();
        if (!user.length) {
            return res.send("User not found!");
        }
        return res.send("Login Successful!")
    } catch (error) {
        return res.send("error")
    }
}

export const addProduct = async (req, res) => {
    try {
        const { email, P_name, P_price } = req.body;
        if (!email) return res.send("Email is required!")
        const user = await Users.find({ email }).exec();
        console.log(user[0])
        if (!user.length) return res.send("User not found!")
        const user_products={p_name:P_name,p_price:P_price};
        user[0].products.push(user_products);
    //    conso(user[0])
        await user[0].save();
        res.send("Product Added");
        // const user_Product = await Users.findOneAndUpdate({ _id: user[0]._id }, { products: [{ P_name: P_name, P_price: P_price }] });
       

    } catch (error) {
        return res.send(error);
    }
}

export const deleteProduct = async(req,res)=>{
    try{
        const {email,}=req.body;
        if(!email) return res.send("Email not found!");
        // if(!P_name) return res.send("Product Name is required!");
        const user=await Users.find({email}).exec();
        if(!user.length) return res.send("USer not found")
        // console.log(user[0])
        user[0].products=undefined;
        await user[0].save();
        return res.send(user[0])
    }catch(error){
        return res.send(error)
    }
}