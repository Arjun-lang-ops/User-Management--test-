import userService from '../service/userService.js';




function loginRender(req,res){
    if(req.session.isAdmin){
        return res.redirect('/admin/home')
    }
    if(req.session.isUser){
        return res.redirect('/home');
    }else{
        return res.render('userLogin',{ errorMessage: null })
    }
}

function homeRender(req,res){
    if(!req.session.isUser){
        return res.redirect('/');
    }
    return res.render('userHome');
    
}

function registerRender(req,res){
    if(!req.session.isUser){
        return res.render('userRegister',{ errorMessage: null });
    }else{
        return res.redirect('/home')
    }
}

async function loginDirection(req,res) {
    try{

        const {email,password}=req.body;
        let result=await userService.userLoginLogic(email,password);
        if(!result.success){
            return res.render('userLogin',{errorMessage:result.errorMessage,email})
        };
        req.session.isUser=true;
        return res.redirect('/home')

    }catch{
        res.render('userLogin',{errorMessage:'something went wrong'});

    }

};

async function registerDirection(req,res){
    try{
        const result = await userService.userRegisterLogic(req.body);
        if(!result.success){
            return res.render('userRegister',{errorMessage:result.errorMessage});
        }else{
            return res.redirect('/')
        }

    }catch(error){
        console.error('something went wrong in register',error);
        return res.render('userRegister',{errorMessage:'something went wrong'})

    }
}

function logoutUser(req,res){
    req.session.destroy(()=>{
        return res.redirect('/')
    })
}

export default {loginRender,loginDirection,registerDirection,homeRender,registerRender,logoutUser}