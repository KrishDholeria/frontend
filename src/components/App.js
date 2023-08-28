import { useEffect } from "react";
import notesStore from "../Stores/notesStore";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  //state
  const store = notesStore();
  //use effect 
  useEffect(() => {
    store.fetchNotes();
  });


  return (
    <div className="App">
      <Notes/>

      <UpdateForm/>

      <CreateForm/>
    </div>
  );
}

export default App;
