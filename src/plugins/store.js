import {configureStore} from "@reduxjs/toolkit";
import listNotesReducer from "../slices/listNotesSlices";

const store = configureStore({
    reducer: {
        listNotes: listNotesReducer,
    }
})

export default store;