import { stripLow } from "validator"
import express from "express"
class MyError extends Error {
    private static messageArray:string[]
    private constructor(message:string){
        super(message)
        if(message=='operational'){
        MyError.messageArray.push(message)
        }
        else{

        }
    }
     Instance():Error{
     MyError.constructor()
    }

}