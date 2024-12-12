import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';

require('dotenv').config({ path: './.env' });
const app=express()

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.qs1tf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log(`DB Connection Successfull`)
})
app.listen(process.env.PORT,()=>{
    console.log('Listening at Port 3000')
})

export default app;
