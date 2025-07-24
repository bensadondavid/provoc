import { createSlice } from "@reduxjs/toolkit";

interface List{
    id : string,
    name : string, 
    firstLanguage : string, 
    secondLanguage : string
}

const initialState : List[] = []

const listSlice = createSlice({
    name : 'list',
    initialState : initialState,
    reducers : {
        addList : (state, action)=>{
            state.push(action.payload)
        },
        clearList : ()=>{
            return []
        }
    }
})

export const { addList, clearList } = listSlice.actions
export default listSlice.reducer