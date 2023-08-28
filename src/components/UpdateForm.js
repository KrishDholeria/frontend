import notesStore from "../Stores/notesStore";

export default function UpdateForm() {
    const store = notesStore();
    if(!store.updateForm._id) return <></>;
    return (
        <div>
            <h2>Update Note:</h2>
            <form onSubmit={store.updateNote}>
              <input onChange={store.handleFeildChange} name="title" value={store.updateForm.title}/>
              <textarea onChange={store.handleFeildChange} name="body" value={store.updateForm.body}/>
              <button type="submit">Update Note</button>
            </form>
          </div>
    );
}