import { useEffect } from "react";
import notesStore from "../Stores/notesStore";

function App() {
  //state
  const store = notesStore();
  //use effect 
  useEffect(() => {
    store.fetchNotes();
  });


  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {store.notes && store.notes.map((note) =>{
          // console.log(note);
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={() => store.deleteNotes(note._id)} name="deleteNote">Delete</button>
                <button onClick={() => store.toggleUpdate(note)}>Update</button>
                <p>{note.body}</p>
              </div>
            )
          })
        }
      </div>

      {store.updateForm._id && (<div>
        <h2>Update Note:</h2>
        <form onSubmit={store.updateNote}>
          <input onChange={store.handleFeildChange} name="title" value={store.updateForm.title}/>
          <textarea onChange={store.handleFeildChange} name="body" value={store.updateForm.body}/>
          <button type="submit">Update Note</button>
        </form>
      </div>)}

      {!store.updateForm._id && (<div>
        <h2>Add New Note:</h2>
        <form onSubmit={store.createNote}>
          <input onChange={store.updateCreateFormFeild} type="text" value={store.createForm.title} name="title"/>
          <textarea onChange={store.updateCreateFormFeild} name="body" value={store.createForm.body}/>
          <button type="submit">Create Note</button>
        </form>
      </div>)}
    </div>
  );
}

export default App;
