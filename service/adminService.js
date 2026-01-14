
import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'


async function userModelLoad(req,res){
    try {
        const users=await userModel.find({status:'active'});
    return users;
    } catch (error) {
        console.error(error);
        return {errorMessage:'internal error'}
        
    }
};


//admin enter
async function adminLoginLogic(){
    const email='admin@gmail.com';
    const password='admin@123';

    if(!email || !password){
        return {success:false,errorMessage:'admin not found'}
    }
    return {success:true}

}

const getActiveUsersService = async () => {
    return await userModel.find({status:'active'})
}



// ADD USER
 const addUserService = async ({ username, email, password }) => {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user= new userModel({
        username,
        email,
        password:hashedPassword,
        status:'active'
    });
    await user.save();
    return {user};
}

const getUserByIdService = async (id) => {
    return await userModel.findById(id)
}

//update user
async function updateUserService(id, { username, email }){
    
    const existingUser = await userModel.findOne({
        email,
        _id: { $ne: id }
    })

    if (existingUser) {
        throw new Error('Email already exists')
    }

    return await userModel.findByIdAndUpdate(
        id,
        { username, email },
        { new: true }
    )
}


// DELETE USER
 async function deleteUserService(id){
    return await userModel.findByIdAndUpdate(id,{
        status:'inactive'
    },{new:true})
}





export default {adminLoginLogic,userModelLoad,getActiveUsersService,deleteUserService,addUserService,getUserByIdService,updateUserService}
