//const express= require('express')
import  express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';

const app = express()

const PORT =process.env.PORT || 4000


app.get('/healthy',(req, res)=> {
    res.json(
        {
            success: true,
            message:"Server is healthy"
        }
    )
})


dbConnection().then(()=> {
    console.log('Databse connected');
    app.listen(PORT, () => {
        console.log(`server runnig ${PORT}`);
    })
})

.catch (error => {
    console.log('Error connection database:'+ error);
})

