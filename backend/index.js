require("dotenv").config();

// Modules
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const cors = require('cors')

const app = express();

// Middlewares
app.use(express.json());
app.use(cors())

let _id = 1;

// Schémas
    // User
    const userSchema = new mongoose.Schema({
        _id : Number,
        email : String,
        password : String
    });

    const joiUserSchema = Joi.object({
        email : Joi.string().min(4).max(255).required(),
        password : Joi.string().min(2).max(255).required(),
    })


    // Object
    const objectSchema = new mongoose.Schema({
        _id : Number,
        name : String,
        userId : Number
    });

    const joiObjectSchema = Joi.object({
        name : Joi.string().min(2).max(255).required(),
        userId : Joi.number().required()
    });

// Tables
const User = mongoose.model('User', userSchema);
const Object = mongoose.model('Object', objectSchema);

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/Eval")
.then( async function () {
    console.log("Connecté à la BDD");

    let object = await Object.findById(_id);

    while ( ! (object == null)) {
        _id = _id + 1;
        object = await Object.findById(_id);
    }
})
.catch( () => {
    console.log("Non connecté")
})

// Logique User
let token = null;

function authGuard(req, res, next) {
    if (!token) return res.status(401).json({erreur: "Vous devez vous connecter"})
  
    try {
      const decoded = jwt.verify(token, process.env.JWT); 
      req.user = decoded;
      next();
    } catch (exc) {
      return res.status(403).json({erreur: "Token Invalide"})
    }
}

app.get('/', (req, res) => {
    res.status(200).send({ message: "Hello world Node!" });
})

app.get('/moncompte',[authGuard], async (req, res) => {

    const user = await User.findById(req.user.id).exec()
    .then( (data) => {
        // delete data.password;
        data.password = undefined;
        res.status(200).send(data);
    })
    .catch( (err) => {
        res.status(404).send("Utilisateur non trouvé");
    })
    ;
})

app.post('/signup', async (req, res) => {
    const payload = req.body;

    const {error} = joiUserSchema.validate(payload);

    if ( ! error) {
        let id = _id++;

        const userFound = await User.findOne({email : payload.email}).exec()
            .then( async (data) => {
                if ( ! data) {
                    const salt = await bcrypt.genSalt(10);
                    let { password } = payload;
                    passwordHashed = await bcrypt.hash(password, salt);
                    payload.password = passwordHashed;
                    
                    const user = new User({...payload, _id : id});
                    await user.save();

                    delete payload.password;
                    res.status(201).send({...payload, _id : id});
                }

                else {
                    res.send("Cette adresse est déjà associé à un compte");
                };

            })
        ;
    }
    else {
        res.status(400).send({ erreur : error.details[0].message });
    }
})

app.post('/signin', async (req, res) => {
    const payload = req.body;

    const {error} = joiUserSchema.validate(payload);

    if ( ! error) {
        const user = await User.findOne({email : payload.email})
            .then( async (data) => {

                if (data) {
                    const passwordIsValid = await bcrypt.compare(payload.password, data.password);
                    if (passwordIsValid) {
                        token = jwt.sign( {email : data.email, id : data._id}, process.env.JWT);
                        res.header("x-auth-token", token).status(200).send(token);
                    }
                    else {
                        res.send("Mot de passe incorrect");
                    }
                    
                }
                else {
                    res.send("Ce compte n'existe pas");
                }
            })
    }

    else{
        res.status(400).send({ erreur : error.details[0].message });
    }

})

app.get('/signout', (req, res) => {
    if (token) {
        token = null;
        res.header("x-auth-token", token).status(200).send("Déconnecté");
    }

    else{
        res.send({ message : "Aucun utilisateur n'est connecté" });
    }
})


// Logique Object
app.get("/getAll", async (req, res) => {
    const objects = await Object.find();

    res.status(200).send(objects);
})

app.get("/getOne/:id", async (req, res) => {
    const payload = req.params;

    const object = await Object.findById(payload.id).exec()
        .then( (data) => {
            res.status(200).send(data);
        })
        .catch( (err) => {
            res.status(404).send("Object non trouvé");
        })
    ;
})

app.post("/addOne", async (req, res) => {
    const payload = req.body;
    
    const {error} = joiObjectSchema.validate(payload);

    if (error) {
        res.status(400).send({ erreur : error.details[0].message });
    }

    else{
        let id = _id++;
        const object = new Object({...payload, _id : id, userId: payload.userId});
        await object.save();
        res.status(201).send({payload, id : _id});
    }
})

app.put("/updateOne", async (req, res) => {
    const payload = req.body;

    const object = await Object.findByIdAndUpdate(payload.id, payload.name);

    object.name = payload.name;

    await object.save();

    res.status(201).send("Object a été modifier")
})

app.delete("/deleteOne/:id", async (req, res) => {
    const payload = req.params;

    // console.log(payload);

    // res.send(payload, req.params);

    Object.findByIdAndDelete({_id : parseInt(payload.id)}).exec()
        .then( (data) => {
            // res.status(200).send(data);
            res.send("Object supprimé");
        })
        .catch( (err) => {
            res.status(404).send("Object non trouvé");
        })
    ;
    
})

if (process.env.NODE_ENV !== 'test') 
{
    app.listen(process.env.PORT, () => { console.log(`Écoute sur le port ${process.env.PORT}`); })
}

