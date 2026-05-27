import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashpassword = async(password : string) => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async(enteredPassword : string, hashedPassword: string) =>{
    const result = await bcrypt.compare(enteredPassword, hashedPassword);
    return result;

}


export const generateJWT = (payload: { id: any }) => {
    // El token se firma con una palabra secreta (SECRET) y una duración
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d' // El token durará 180 días
    });
};