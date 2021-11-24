const express =require("express");

const mongoose = require("mongoose");

const connect = ()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017/movies");
}
const movieSchema = new mongoose.Schema({
    id:{type:Number,required:true},
    movie_name:{type:String,required:true},
    movie_genre:{type:String,required:true},
    production_year:{type:Number,required:true},
    budget:{type:Number,required:true},
},{
    versionKey:false,
    timestamps:true,
})
const movies = mongoose.model("moviedata", movieSchema)
const app = express();

app.use(express.json());


app.get("/movies", async (req,res)=>{
    try {
        const newmovies = await movies.find().lean().exec()
        return res.send({newmovies})
    } catch(e){
        res.status(500).json({mesaage :e.message})
    }
})



app.listen(2345, async function (){
    await connect();
    console.log("2345 running");
})