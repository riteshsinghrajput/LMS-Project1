import mongoose from "mongoose";


mongoose.set('strictQuery' , false);

const connectToDb = async()=>{
    try {
        console.log(process.env.MONGO_URI)
        const {connection} = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/LearnSphere`
        )
        if(connection){
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    } catch (error) {
        console.log(error);
    process.exit(1);
    }
}

export default connectToDb