import notesStore from "../Stores/notesStore";


export default function Note({note}) {
    const store = notesStore();
    return (
        <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => store.deleteNotes(note._id)} name="deleteNote">Delete</button>
            <button onClick={() => store.toggleUpdate(note)}>Update</button>
            <p>{note.body}</p>
        </div>
    )
}