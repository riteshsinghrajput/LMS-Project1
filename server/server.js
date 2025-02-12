import { config } from 'dotenv';
config();
import { v2 } from 'cloudinary';
import app from './app.js';
import connectToDb from './config/DB.js';

const PORT = process.env.SERVER_PORT

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(PORT , async ()=>{
      connectToDb()
    console.log(`App is running at http://localhost:${PORT}`)
})