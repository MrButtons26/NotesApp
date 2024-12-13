import express, { Request, Response } from 'express'
import app from './server'
import cors from 'cors'
import UserRouter from './Routes/UserRoutes'
import NoteRouter from './Routes/NoteRoutes'
import SignallingManager from './utils/SignalingManager'

  app.use(cors());
  app.use(express.json());
 const manager=SignallingManager.getInstance()
 async function  wrapper() {
  const data=await manager.getAllNotes()
 }
wrapper()
app.get('/',(req:Request,res:Response)=>{
 res.send('Test Path')
})
app.use(`/user`, UserRouter);
app.use(`/note`, NoteRouter);
app.all('*',(req:Request,res:Response)=>{
    res.status(404).json({status:'Fail',message:'This route could not be Found'})
})