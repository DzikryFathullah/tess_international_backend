import Users from "../models/UserModels.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']        
        });
        res.statu(200).json(response);
    }
    catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.statu(200).json(response);
    }
    catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createUser = async (req, res) => {
    const {
        name, 
        email, 
        password, 
        confirmPassword, 
        role
    } = req.body;
    if (password !== confirmPassword) 
    return res.status(400).json({msg: "Password & confirm password doens't match"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email:email,
            password: hashPassword,
            role: role
        });
        res.status(200).json({msg: "Register successfully"});
    }
    catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (user) res.status(404).json({ msg: "User doesn't exists"});
        const {
            name, 
            email, 
            password, 
            confirmPassword, 
            role
        } = req.body;
        let hashPassword;
        if (password === "" || password === null)
            hashPassword = user.password;
        else {
            if (password !== confirmPassword) res.status(400).json({ msg: "Password & confirm password doens't match"});
            hashPassword = await argon2.hash(password);
        }
        await Users.update({
            name: name,
            email:email,
            password: hashPassword,
            role: role
        },{
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "Update record successfully"});
    }
    catch (error) {
        res.statu(400).json({ msg: error.message})
    }

}

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (user) res.status(404).json({ msg: "User doesn't exists"});
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Delete User successfully" });
    }
    catch (error) {
        res.statu(400).json({ msg: error.message})
    }
}



