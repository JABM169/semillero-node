import { CorsOptions } from 'cors';
import { errors } from 'undici-types';

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === 'http://localhost:5173'){
            callback(null , true)
            

        } else {
               callback(new Error('errors de cors'))  
        }
      
       
    }
};