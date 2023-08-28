import { create } from 'zustand'
import axios from 'axios';

const notesStore = create((set) => ({
    notes: null,
    createForm: {
        title:"",
        body: "",
    },
    updateForm: {
        _id:null,
        title:"",
        body:"",
    },


    fetchNotes: async () => {
        // fetch the notes
        const res = await axios.get('http://localhost:3000/notes');
        // set on state
        set({
            notes: res.data.notes,
        }); 
    },
    updateCreateFormFeild: (e) => {
        const {name, value} = e.target;
        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value,
                }
            }
        });
        console.log({name, value});
    },
    createNote: async (e) => {
        //stop default effect
        e.preventDefault();
        // create the note
        const {createForm, notes} = notesStore.getState();
        const res = await axios.post('http://localhost:3000/notes', createForm);
        set({
            notes: [...notes, res.data.note],
            createForm: {
                title: "",
                body: "",
            },
        });
    },
    deleteNotes: async (_id) => {
        await axios.delete(`http://localhost:3000/notes/${_id}`);
        const {notes} = notesStore.getState();
        set({
            notes: notes.filter((note) => note._id!== _id),
        });
    },

    handleFeildChange: (e) => {
        const {name, value} = e.target;
        
        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value,
                }
            };
        })
      },

    updateNote: async (e) => {
        e.preventDefault();
        const {updateForm, notes} = notesStore.getState();
        const {title, body} = updateForm;
        await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {title, body });
        const newNotes = [...notes];
        const index = notes.findIndex((note) => {
          return note._id === updateForm._id;
        });
        newNotes[index] = {title, body};
        console.log(newNotes);
        set({
            notes: newNotes,
        });
    
        //clear update form state
        set({
            updateForm: {
                _id:null,
                title:"",
                body:"",
            }
        }
        );
    },
    toggleUpdate: (note) => {
        //set note value on state
        set({
            updateForm: {
                _id:note._id,
                title:note.title,
                body:note.body,
            }
            }
        );
    },
}))

export default notesStore;