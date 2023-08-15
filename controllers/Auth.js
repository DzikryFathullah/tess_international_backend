import User from '../models/UserModels.js'
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({msg: "User not found"});
    const isValidPassword = await argon2.verify(user?.password, req.body?.password);
    if (!isValidPassword) return res.status(400).json({ msg: "Wrong password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name= user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json(uuid, name ,email, role);
}

export const isMe = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({msg: "Please login"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "User doesn't exists"});
    res.status(200).json(user)
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({ msg: "Failed to logout"});
        res.status(200).json({ msg: "Logout successfully"});
    });
}