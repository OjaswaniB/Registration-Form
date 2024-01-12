const express= require("express")
const bodyParser = require("body-parser")
let ejs = require("ejs")
const mongoose = require('mongoose');
const Entry = require('./model/modelDb')

main().catch(err => {console.log(err), console.log("MONGO ERROR")});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RegistrationDb');
 console.log("MONGO CONNECTTION ESTABLISHED")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app= express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

app.get('/', async (req,res)=>{
    res.sendFile(__dirname +"/index.html")
})

app.post("/", async (req, res) => {
    try {
        const name = req.body.Name;
        const password1 = req.body.password1;
        const password2 = req.body.password2;

        if (password1 === password2) {
            const data = new Entry({
                name: req.body.Name,
                email: req.body.Email,
                password1: req.body.password1,
                password2: req.body.password2
            });

            await data.save(); 
            res.render('success', {Username: name });
        } else {
            res.render("failure");
        }
    } catch (error) {
        console.error(error);
        res.render("failure");
    }
});


app.listen(3000,()=>{
    console.log("THE SERVER IS WORKING ON PORT 3000")
})