import 'dotenv/config'
import app from './server';
import { connectDB } from './config/db';

const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
  console.log('El servidor esta corriendo por el puerto',port)
})