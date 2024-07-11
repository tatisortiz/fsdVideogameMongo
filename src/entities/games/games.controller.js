import { Types } from "mongoose";
import Game from "./game.model.js"


export const createGame = async (req, res) => {
    try {
      console.log(1);
      const { title, description } = req.body
  console.log(title);
  console.log(description);
  
      if( !title || !description) {
         throw new Error('Title and description are required')
      }
  console.log(3);
      const newGame = await Game.create({
        title: title,
        description: description
      })
  
      res.status(201).json(
        {
          success: true,
          message: "Game created",
          data: newGame
        }
      )
    } catch (error) {
      if(error.message === 'Title and description are required') {
        return res.status(400).json(
          {
            success: false,
            message: "Error creating game",
            error: error.message
          }
        )
      }
  
      res.status(500).json(
        {
          success: false,
          message: "Error creating game",
          error: error.message
        }
      )
    }
  } 

export const getAllGames = async (req,res) => {
    try {
  const games=  await Game.find()
    
  res.status(200).json(
    {
      success: true,
      message: "Games retrieved successfully",
      data: games
    }

  )
      
    } catch (error) {
      res.status(500).json(
        {
        success: false,
        message: "Error retrieving games",
        error: error.message
        }
      )
      
    }
  }

export const updateGames= async (req,res) => {
  try {
    const Id = req.params.id
    const body = req.body

    const updgames = await Games.update (
      {
        Id: id
      }
    )

    



    res.status(201).json({
      success: true,
      message: "error update",
      data: updateGames
    })
    


    
  } catch (error) {
    res.status(500).json(
      {
        success: false,
        message: "Error Update games",
        error: error.message
      }
    )
    
  }
}

export const deleteGame= async(req, res) =>{
  try {
      const idDelete= req.params.id
      const idToDeleteValid= Types.ObjectId.isValid(idDelete)
      if(!idToDeleteValid){
          return res.status(400).json({
              success:false,
              message:"Id not valid"
          })
      }
      const deletedGame =await Game.findByIdAndDelete(idDelete)
      if(!deletedGame){
          return res.status(404).json({
              succes:false,
              message:"Not Game found"
          })
      }
      res.status(200).json({
          success:true,
          message:"Game deleted",
      })
      
  } catch (error) {
      return res.status(500).json({
          success:false,
          message:"Error deleting games",
          error:error.message
      })
  }
}