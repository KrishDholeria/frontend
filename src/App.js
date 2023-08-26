import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  //state
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id:null,
    title:"",
    body:"",
  });
  //use effect 
  useEffect(() => {
    fetchNotes();
  }, []);

  //functions
  const fetchNotes = async () => {
    // fetch the notes
    const res = await axios.get('http://localhost:3000/notes');
    // set on state
    setNotes(res.data.notes);
  }

  const updateCreateFormFeild = async (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
    console.log({name, value});
  };

  const createNote = async (e) => {
    //stop default effect
    e.preventDefault();
    // create the note
    const res = await axios.post('http://localhost:3000/notes', createForm);
    setNotes([...notes, res.data.note]);
    // reset form
    setCreateForm({
      title: "",
      body: "",
    });
  }

  const deleteNotes = async (_id) => {
    await axios.delete(`http://localhost:3000/notes/${_id}`);
    setNotes(notes.filter((note) => note._id!== _id));
  };

  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes && notes.map((note) =>{
          // console.log(note);
            return (
              <div key={note._id}>
                <h3>{note.title}</h3><button onClick={() => deleteNotes(note._id)} value={note._id} name="deleteNote">Delete</button>
                <p>{note.body}</p>
              </div>
            )
          })
        }
      </div>

      <div>
        <h2>Update Note:</h2>
        <form>
          <input name="title" value={updateForm.title}/>
          <textarea name="body" value={updateForm.body }/>
          <button type="submit">Update Note</button>
        </form>
      </div>

      <div>
        <h2>Add New Note:</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormFeild} type="text" value={createForm.title} name="title"/>
          <textarea onChange={updateCreateFormFeild} name="body" value={createForm.body}/>
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
}

export default App;
