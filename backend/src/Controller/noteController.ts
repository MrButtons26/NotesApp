import Notes from "../Model/NotesModel";
import { Response,Request } from "express";
import jwt from 'jsonwebtoken'
import { promisify } from  'util'
import User from '../Model/UserModel'
import SignallingManager from '../utils/SignalingManager'

const manager=SignallingManager.getInstance()

export const create:(req:Request,res:Response)=>Promise<any>=async(req:Request,res:Response)=>{
try{
const {content}:{content:string}=req.body
const token:string|undefined = req.headers.authorization?.split(" ")[1];
const {id}:any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
const note = await Notes.create({ content:content,user:id });
manager.addNotes(note)


const user=await User.findById(id)

const updatedNotes=await User.findByIdAndUpdate(id,{notes:[...user.notes,note.id]})


res.send('done')
}
catch(e){
    res.status(400).json({
        status: `failed`,
        data: {
          error: e,
        },
      });
}

}
export const read:(req:Request,res:Response)=>Promise<any>=async(req:Request,res:Response)=>{
    try{
    const token:string|undefined = req.headers.authorization?.split(" ")[1];
    const {id}:any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user=await User.findById(id).populate({path:'notes',select:'-__v'})


    res.json({
        status:'success',
        data:{
         notes:[...user.notes]
        }
    })
}
catch(e){
    res.status(400).json({
        status: `failed`,
        data: {
          error: e,
        },
      });

}
}

export const update:(req:Request,res:Response)=>Promise<any>=async(req:Request,res:Response)=>{
    try{
    const {id,content}:{id:string,content:string}=req.body
    const token:string|undefined = req.headers.authorization?.split(" ")[1];
    manager.modifyNotes(id,content)
    const {Userid}:any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const note = await Notes.findByIdAndUpdate(id,{content:content});
    res.json({
        status:'successfully updated',
    })
}
catch(e){
    res.status(400).json({
        status: `failed`,
        data: {
          error: e,
        },
      });
} 
}

export const del:(req:Request,res:Response)=>Promise<any>=async(req:Request,res:Response)=>{
    try{
    const {id:noteId}:{id:string}=req.body
    const token:string|undefined = req.headers.authorization?.split(" ")[1];
    const {id}:any = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user=await User.findById(id)

    const notes=user.notes.filter((el:string)=>el!=noteId)
        await User.findByIdAndUpdate(id,{notes:notes})
        manager.delNotes(noteId)
    const note = await Notes.findByIdAndDelete(noteId);
    res.json({
        status:'successfully deleted',
    })
    }
    catch(e){
        res.status(400).json({
            status: `failed`,
            data: {
              error: e,
            },
          });
    }
}