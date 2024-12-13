import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { createNote, getNotes,deleteNote,editNote } from "../services/NotesServices";

export default function NotesPage(): JSX.Element {
  const navigate = useNavigate();
  const [notesData, setNotesData] = useState<string[]>([]);
  const [note, setNote] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [notesLoader, setNotesLoader] = useState<boolean>(false);
  const [edit, setEdit] = useState<[number,string]>([-1,'']);
  const [socket,SetSocket]=useState<WebSocket|null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null);

 
  useEffect(() => {
    (async function wrapper() {
      const { token } = JSON.parse(localStorage.getItem('auth') || '{}');
      if (token) {
        setNotesLoader(true);
        const data = await getNotes(token);
        setNotesData([...data.data.notes]);
        setNotesLoader(false);
      }
    })();
  }, []);
  
  useEffect(()=>{
      const ws=new WebSocket('ws://https://notesapp-m984.onrender.com')
    const { _id } = JSON.parse(localStorage.getItem('auth') || '{}');
    if(_id){
    ws.onopen=()=>{
        ws.send(JSON.stringify(_id))
    }
    ws.onmessage = (event) => {
     
        setNotesData([...JSON.parse(event.data)]);
      };
    SetSocket(ws)
    return()=>ws.close()
    }
  },[])

  useEffect(() => {
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", adjustHeight);
      adjustHeight(); 
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", adjustHeight);
        
      }
    };
  }, []);

  // Submit note content
  async function submitContent() {
    const { token } = JSON.parse(localStorage.getItem('auth') || '{}');
    if(edit[0]==-1){
    if (note.length !== 0 && token) {
      setLoader(true);
      try {
        await createNote(note, token);
        setLoader(false);
        setNote(''); // Clear the textarea after successful submission
      } catch (error) {
        console.error("Error submitting note:", error);
        setLoader(false);
      }
    }
}
else{
  await editNote(edit[1],token,note)
  setEdit([-1,''])
  setNote('')
}    const data = await getNotes(token);
setNotesData([...data.data.notes]);
// socket?.send('subscribeToNotes')

  }
  async function deleteContent(noteId:string) {
    const { token,} = JSON.parse(localStorage.getItem('auth') || '{}');
    const query=await deleteNote(noteId,token)
    setNotesLoader(true);
    // socket?.send('subscribeToNotes')
    setNotesData(notesData.filter((el)=>el._id!=noteId))
    const data = await getNotes(token);
    setNotesData([...data.data.notes]);
    setNotesLoader(false);
  }
  async function editContent(noteId:string,i:number,content:string) {
    const { token } = JSON.parse(localStorage.getItem('auth') || '{}');
    setEdit([i,noteId])
    setNote(content)

  }
  function dayDateExtractor(timeString:string){
    const dateObj=new Date(timeString)
    const day = dateObj.toLocaleString('en-US', { weekday: 'long' });  
    const date = dateObj.getDate()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1;  // 

return `${date}:${month}:${year}  ${day}`;
  }
  return (
    <>
      {localStorage.getItem('auth') !== null ? (
        <>
          <div className="flex mx-5 py-3" style={{ fontFamily: 'oswald' }}>
            <div className="gap-2 w-[45vw] h-[50px] fixed bottom-[120px] left-[27.5vw] flex items-center z-10">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your Notes Here"
                ref={textareaRef}
                className="border-[1px] border-black w-[100%] outline-none resize-none px-4 py-2 rounded-lg overflow-hidden focus:border-blue-400"
              />
              <button
                onClick={() => { submitContent(); }}
                className="text-white bg-black px-3 py-2 rounded-full transition-all duration-200 border-[1px] border-black hover:text-black hover:bg-white"
              >
                <ion-icon name="arrow-up-outline"></ion-icon>
              </button>
              {loader && <div className="loader self-center mt-1 ml-3"></div>}
            </div>
            <h1
              className="navbar-heading text-[22px] border-[1px] px-2 border-black cursor-pointer"
              onClick={() => navigate('/')}
            >
              Notes
            </h1>
          </div>

          {notesLoader ? (
            <div className=""></div>
          ) : (
            notesData.length !== 0 && (
              <div className="flex flex-col items-start gap-2 ml-10 mt-10" style={{ fontFamily: 'oswald' }}>
                {notesData.map((el, i) => (
                  <div key={i} className={`flex flex-col border-[1px] border-black  px-5 py-3 gap-2 transition-all duration-300 ${edit[0]===i?'bg-black text-white':'bg-[#ffe54c]'}`}>
                    <h1 className="font-bold text-[16px]">{el.content}</h1>
                    <div className="flex gap-2  justify-between items-center">
                    <h1 className="text-[12px]">{dayDateExtractor(el.createdAt)}</h1>
                    <div className="flex gap-1 text-[16px]">
                      <button onClick={()=>editContent(el._id,i,el.content)}><ion-icon name="create-outline" /></button>
                      <button onClick={()=>deleteContent(el._id)}><ion-icon name="trash-outline" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </>
      ) : (
        <h1 className="text-center mt-32 text-[24px] font-thin">
          <span className="font-bold underline cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span> To Start Taking <span className="font-bold">Notes</span>.
        </h1>
      )}
    </>
  );
}


