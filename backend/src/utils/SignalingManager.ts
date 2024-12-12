import Notes from "../Model/NotesModel";
import {WebSocketServer,WebSocket} from 'ws'
class SignallingManager{
  private static instance:SignallingManager
  private static notes:any[]
  private static wsConnections=new Map<WebSocket,string>()
  private wss :WebSocketServer
  private constructor(){
    SignallingManager.notes=[]
    this.wss=new WebSocket.Server({port:process.env.WSPORT})
    console.log(`WebSocket server started on port 4000`);
    this.init()
  }
  init(){
  this.wss.on('connection',(ws)=>{
      console.log('hello')
      ws.on('message', function message(data) {
          console.log(String(data))
          if(String(data)=='subscribeToNotes'){
              console.log(11)
              if(SignallingManager.wsConnections.has(ws)){
                  const UserId=SignallingManager.wsConnections.get(ws)
                  let userNotes = SignallingManager.notes.filter((el) => String(el.user) == JSON.parse(UserId));
                  ws.send(JSON.stringify(userNotes))
                }
            }
            else{
                SignallingManager.wsConnections.set(ws,String(data))
                console.log('received: %s', data,SignallingManager.wsConnections);
            }});
            ws.on('close', function message(data) {
                SignallingManager.wsConnections.delete(ws)
        console.log( data,SignallingManager.wsConnections);

      });
  })
  }
  public static getInstance():SignallingManager{
    if(SignallingManager.instance){
        return SignallingManager.instance
    }
    SignallingManager.instance=new SignallingManager()
    return SignallingManager.instance;
  }
  async getAllNotes():Promise<any>{
   const allNotes:any[]=await Notes.find()
   SignallingManager.notes=[...allNotes]

  }
  addNotes(note:any){
    SignallingManager.notes.push(note)
  console.log(SignallingManager.notes)
  }
  delNotes(noteId:any){
    const auxillary=SignallingManager.notes.filter((el)=>el._id!=noteId)
    SignallingManager.notes=[...auxillary]
 
    }
    modifyNotes(noteId:string,content:string){
    SignallingManager.notes.forEach((el)=>{if(el._id==noteId){el.content=content}})     
        }
  view():void{

  }
}
export default SignallingManager;