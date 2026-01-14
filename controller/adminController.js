import adminService from '../service/adminService.js'


function adminLoginRender(req,res){
    if(req.session.isAdmin){
        return res.redirect('/home')
    }
    return res.render('adminLogin',{errorMessage:null})
}

async function adminHomeRender(req,res){
    if(!req.session.isAdmin){
        return res.redirect('/')
    }
    const user=await adminService.getActiveUsersService();
    return res.render('adminHome',{user});
}

const adminEditUserLoad = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            return res.redirect('/admin')
        }

        const id = req.params.id
        const user = await adminService.getUserByIdService(id)

        if (!user) {
            return res.redirect('/home')
        }

        res.render('adminEdit', { user })
    } catch (error) {
        console.error("Edit load error:", error)
        res.redirect('/home')
    }
}



async function adminLoginDirection(req,res){
    const result= await adminService.adminLoginLogic();
    if(!result.success){
        return res.render('adminLogin',{errorMessage:null});
        
    }
    req.session.isAdmin=true;
    return res.redirect('/admin/home');
    
}



const adminEditUser = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            return res.redirect('/')
        }

        const id = req.params.id
        const { username, email } = req.body

        if (!username || !email) {
            return res.redirect(`/edit/${id}?error=1`)
        }

        await adminService.updateUserService(id, { username, email })

        res.redirect('/home')
    } catch (error) {
        console.error("Edit update error:", error.message)
        res.redirect(`/edit/${req.params.id}?error=1`)
    }
}

// ADD USER 
const adminAddUser = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            return res.redirect('/')
        }
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.redirect('/home?adderror=1')
        }
        await adminService.addUserService({ username, email, password })
        res.redirect('/home')

    } catch (err) {
        console.error("Add user error:", err.message)
        res.redirect('/home?adderror=1')
    }
}

// DELETE 
const adminDeleteUser = async (req, res) => {
    try {
        if (!req.session.isAdmin) {
            return res.redirect("/admin")
        }

        const id = req.params.id

        await adminService.deleteUserService(id);


        res.redirect("/admin/home")
    } catch (error) {
        console.error("Delete user error:", error)
        res.status(500).send("Failed to delete user")
    }
}


function adminLogout(req,res){
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

export default {adminAddUser,adminDeleteUser,adminLoginRender,adminLoginDirection,adminHomeRender,adminLogout,adminEditUserLoad,adminEditUser}
