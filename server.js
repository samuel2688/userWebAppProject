const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("sequelize");
const db = require("./models");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/users", (req, res) =>{
    return db.User.findAll()
    .then((users)=>res.send(users))
    .catch((err)=>{
        console.log("error occurred", JSON.stringify(err));
        return res.send(err);
    });
});

app.post("/users", (req,res)=>{
    const {firstName,lastName,age,color} = req.body;

    return db.User.create({firstName,lastName,age,color})
    .then((user)=> res.send(user))
    .catch((err)=>{
        console.log("error happend on creation", JSON.stringify(err))

        return res.status(400).send(err);
    });
});

app.delete("/users", (req,res)=>{
    return db.User.destroy({
        where : {id} = req.body})
        .then((user)=> res.sendStatus(user)) 
             
});


app.put("/users", (req,res)=>{
    return db.User.update({
        where : {id} = req.body})
        .then(()=> res.sendStatus(user))
        .catch((err) => {
            console.log("update failed");
    return res.status(400).send(err);
        });
    });



app.listen(port, ()=> {
    console.log(`server is running at: http://localhost:${port}`);
});