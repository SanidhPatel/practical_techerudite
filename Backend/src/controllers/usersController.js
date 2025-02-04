import { User } from '../models/userModels.js';

export const registerUser = async (req,res) =>{
    try{
        const registerUser = await User.registerUser(req.body);
        res.status(registerUser?.status).send(registerUser?.data);
    }catch(error) {
        res.status(500).json({"message":"Internal server error"});
        throw error;
    }
}

export const loginUser = async (req,res) =>{
    try{
        const loginUser = await User.loginUser(req.body);
        res.status(loginUser?.status).send(loginUser?.data);
    }catch(error) {
        res.status(500).json({"message":"Internal server error"});
        throw error;
    }
}


export const verifyUserEmail = async (req, res) => {
    const { email_token } = req.query;
    try{
        const verifyEmailData = await User.verifyUserEmail(email_token);
        res.status(verifyEmailData?.status).send(verifyEmailData?.data);
    }catch(error) {
        res.status(500).send('Error in email verification');
        throw error;
    }
};


