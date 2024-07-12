import { Schema, model } from "mongoose";


const Gameshema = new Schema(
{ 
   title:{
    type: String,
    required: true,
   },

   description:{
    type: String,
    required: true,

   },

   userFavourites: [
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
   ]
},
{
    timestamps: true,
    versionKey: false

}
);

const Game = model('Game',Gameshema);

export default Game;
