import { Schema, model } from "mongoose";

const Commentshema = new Schema(
{ 
   message:{
    type: String,
    required: true,
   },

   user:{
    type: Schema.Types.ObjectId,
    path: 'User',
    required: true,

   },
},
{
    timestamps: true,
    versionKey: false

}
);

const Comment = model('Comment',Commentshema);

export default Comment;