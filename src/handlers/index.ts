import { Request, Response } from 'express';
import slug from 'slug';
import User from "../models/User";
import { hashpassword, checkPassword } from '../utils/auth';

export const createAccount= async( req: Request, res : Response)=> {

    const {email, password } = req.body;
    const userExists = await User.findOne({email});


    if(userExists) {
        const error = new Error('El email ya esta en uso!...') ;
        return res.status(409).json({error: error.message})   
    }

    const handle= slug(req.body.handle, '');
    const handleExists= await User.findOne({handle});

    if(handleExists) {
        const error= new Error('El nombre de usuario no esta disponible!...')
        return res.status(409).json({error: error.message})  
    }
    
    console.log(req.body);

    const user = new User(req.body);
    user.password = await hashpassword(password);
    user.handle= handle;

    await user.save();

    res.status(201).send('Registro creado correctamente!...');
}

export const login = async(req: Request, res: Response ) => {


    const{email,password}=req.body;

    const user = await User.findOne({ email });

        if(!user) {
        const error = new Error('el usuario no existe!...')
        return res.status(404).json({error: error.message}) 

        }
        const isPasswordCorrect = await checkPassword(password, user.password);
        console.log(isPasswordCorrect);
        if(!isPasswordCorrect) {
            const error = new Error('el password es incorrecto!...')
            return res.status(401).json({error: error.message})
        }
         res.json({"msg": "Usuario existente!..."});
    }
