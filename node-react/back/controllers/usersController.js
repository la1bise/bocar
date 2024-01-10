import bcrypt from "bcrypt"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const register = async (req, res) => {

    try {

        // REGEX permet de vérifier qu'il y a au moins une majuscule, minuscule, un chiffre et un caractère spéciale
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-]).{8,30}$/ 

        const {login, email, password} = req.body

    if(req.body.login.trim()=== ""
    || email.trim() === ""
    ||password.trim() === ""){
        return res.status(400).json({message: "veuillez remplir tous les champs"})
    }
    //Permet de savoir si l'utilisateur est déjà insrit
    const verifEmail = await User.findOne({email: req.body.email})

    if(verifEmail){
        return res.status(401).json({message: "cet email est déjà enregistré"})
    }
    //vérification du mot de passe respectant le regex
    if(!checkPwd.test(req.body.password)){
        return res.status(401).json({message: "mot de passe ne respect pas les condition"})
    }

    const newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    })

    //il va excuter le hachage de mot de passe avant la sauvegarde en BDD
    await newUser.save()
    res.status(200).json({message: "votre compte à bien était créé"})
    } catch (error) {
        res.status(500).json({message: "création de compte échoué"})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({"email" : email})

        if(!user){
            return res.status(404).json({messages: "aucun utilisateur trouver avec cette adress mail"})
        }
        // je compare le mot de passe insert dans le req.body.password avec celui stocké dans la BDD
        const isValidPwd = bcrypt.compareSync(password, user.password)

        if(!isValidPwd){
            res.status(401).json({message: "password is not valid"})
        }
        // je vais créer mon token sur le mdp correct
       
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TOKEN})

        res.status(200).json({
            id: user._id,
            login: user.login,
            role: user.role,
            token: token
        })
    } catch (err) {
        res.status(500).json({message: "error lors de la connexion"})
    }
}