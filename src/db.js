import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        
        await mongoose.connect("mongodb+srv://miyukinohika:m4OKmNRFt1heq7pk@bdmomo.q5yot.mongodb.net/?retryWrites=true&w=majority&appName=bdmomo")
        console.log('>>> Database Momonails esta conectado <<<<')
    }catch (error){
        console.log(error);
    }
}
