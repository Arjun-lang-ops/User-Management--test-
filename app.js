import express from 'express';
import userRoutes from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js'
import nocache from 'nocache';
import session from 'express-session';
import connectDB from './config/db.js';


const app=express();

//database connected
connectDB();


//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(nocache());

//session
app.use(session({
    secret:'mySecretKey',
    resave:false,
    saveUninitialized:false

}))

app.use('/',userRoutes);
app.use('/admin',adminRoute)


app.listen(3000,()=>{
    console.log('server created at 3000')
})
app.use('/',(req,res)=>{
    res.send("NOT FOUND")
});