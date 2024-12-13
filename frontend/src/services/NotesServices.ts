import axios from "axios";

export const createNote=async(content:string,token:string)=> {
    console.log(23)
    try {
        const note = await axios.post(`https://notesapp-m984.onrender.com/note`,{content:content},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return note.data;
    } catch (e) {
        throw new Error(e.response.data.data.error.errorResponse.code)
    }
}
export const getNotes=async ( token)=> {

    const res = await axios.get(`https://notesapp-m984.onrender.com/note`,{ headers: {
        Authorization: `Bearer ${token}`
    } });
    if (res.status === 401) {
        throw new Error(`Incorrect Password or Email`)
    }
    return res.data;

}
export const deleteNote=async (id:string,token:string)=> {

    const res = await axios.delete(
        `https://notesapp-m984.onrender.com/note`, // URL
        {
          data: { id:id}, // Body data for the DELETE request
          headers: {
            Authorization: `Bearer ${token}` // Authorization header
          }
        }
      );
      
    if (res.status === 401) {
        throw new Error(`Incorrect Password or Email`)
    }
    return res.data;

}
export const editNote=async (id:string,token:string,content:string)=> {

    const res = await axios.patch(
        `https://notesapp-m984.onrender.com/note`, // URL
        { id: id, content: content }, // Body data for the PATCH request
        {
          headers: {
            Authorization: `Bearer ${token}` // Authorization header
          }
        }
      );
      
    if (res.status === 401) {
        throw new Error(`Incorrect Password or Email`)
    }
    return res.data;

}