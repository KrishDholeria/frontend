import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    // fetch the notes
    const res = await axios.get('http://localhost:3000/notes');
    // set on state
    setNotes(res.data.notes);
  }
  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) =>{
            return (
              <div key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
