import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt';


//login logic 

async function userLoginLogic(email,password){

    let user=await userModel.findOne({email});

    if(!user){
        return {success:false,errorMessage:'user not found'};
    };

    let passwordMatch= await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        return {success:false,errorMessage:'password incorrect'}
    }

    return {
        success:true,
        user
    }
};


//register logic

async function userRegisterLogic(data) {
    try {
        const { username, email, password, confirmPassword } = data;

        if (!username || !email || !password || !confirmPassword) {
            return { success: false, errorMessage: 'All fields are required' };
        }

        if (password.length < 6) {
            return { success: false, errorMessage: 'Password must be at least 6 characters' };
        }

        if (password !== confirmPassword) {
            return { success: false, errorMessage: 'Passwords do not match' };
        }

        const normalizedEmail = email.toLowerCase();

        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return { success: false, errorMessage: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email: normalizedEmail,
            password: hashedPassword
        });

        await user.save();
        return { success: true, user };

    } catch (error) {
        console.error('User registration error:', error);
        return { success: false, errorMessage: 'Internal server error' };
    }
}

export default {userLoginLogic,userRegisterLogic}