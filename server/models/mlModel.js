import mongoose from "mongoose";

const mlSchema = new mongoose.Schema({
    emotionData: [String]
})

const mlModel = mongoose.model('MlModel', mlSchema);
export default mlModel;