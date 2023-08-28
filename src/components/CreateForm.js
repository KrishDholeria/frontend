import notesStore from "../Stores/notesStore";

export default function CreateForm() {
    const store = notesStore();
    if(store.createForm._id) return <></>;
    return (
        <div>
        <h2>Add New Note:</h2>
        <form onSubmit={store.createNote}>
          <input onChange={store.updateCreateFormFeild} type="text" value={store.createForm.title} name="title"/>
          <textarea onChange={store.updateCreateFormFeild} name="body" value={store.createForm.body}/>
          <button type="submit">Create Note</button>
        </form>
      </div>
    );
}