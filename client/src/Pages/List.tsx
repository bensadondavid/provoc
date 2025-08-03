import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../Components/Header"
import EraseIcon from "../assets/icons/EraseIcon"
import EditIcon from "../assets/icons/EditIcon"
import AddIcon from "../assets/icons/AddIcon"

interface Word{
  firstLanguage : string,
  secondLanguage : string,
}

interface EditWord{
  id : string,
  firstLanguage : string,
  secondLanguage : string,
}

interface Words{
  id : string,
  firstLanguage : string,
  secondLanguage : string,
  createdAt : string
}

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  wordsNumber : number
}

function List() {

    const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'
    const {id} = useParams()
    const token = localStorage.getItem('token')

    const [words, setWords] = useState<Words[]>([])
    const [list, setList] = useState<List>()
    const getList = async()=>{
      try{
        const response = await fetch(`${urlBack}/lists/list/${id}`,{
          method : 'GET',
        })
        const data = await response.json()
        if(!response.ok){
          return console.log(data.message)
        }
        setWords(data.words)
        setList(data.list)
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{      
      getList()
    },[])

    const [formData, setFormData] = useState<Word>({
      firstLanguage : '',
      secondLanguage : '',
    })
    const [addNewWord, setAddNewWord] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const handleFormData = (e : React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setFormData(
        prev => ({
          ...prev, [name] : value
        })
      )
    }
    const addWord = async(e : React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      console.log("✅ addWord triggered");
      try{
        const response = await fetch(`${urlBack}/words/new-word`, {
          method : 'POST',
          headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({...formData, listId : id})
        })
        const data = await response.json()
        if(!response.ok){
          return setErrorMessage(data.message)
        }
        setWords((prev)=>[...prev, data.newWord])
        setFormData({ firstLanguage: '', secondLanguage: '' });
        setAddNewWord(false);
        setErrorMessage('');
      }
      catch(error){
        console.log(error);
      }
    }

    const deleteWord = async(wordId : string)=>{
      try{
        const response = await fetch(`${urlBack}/words/delete-word`, {
          method : 'DELETE',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify({id : wordId})
        })
        const data = await response.json()
        if(!response.ok){
          console.log(data.message)
          setErrorMessage(data.message)
          return
        }
        setWords((prev) => prev.filter(word => word.id !== wordId));
        }
        catch(error){
          console.log(error);
        }
    }

    const [edit, setEdit] = useState<string>('')
    const [wordToEdit, setWordToEdit] = useState<EditWord>({
      id : '',
      firstLanguage : '',
      secondLanguage : ''
    })
    const handleWordToEdit = (e : React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setWordToEdit(prev=>({
        ...prev, [name] : value
      }))
    }
    const editWord = async(e : React.FormEvent<HTMLFormElement>, wordToEdit : EditWord)=>{
      e.preventDefault()
      try{
        const response = await fetch(`${urlBack}/words/edit-word`, {
          method : 'PUT',
          headers : {'Content-type' : 'application/json'},
          body : JSON.stringify(wordToEdit)
        })
        const data = await response.json()
        if(!response.ok){
          console.log(data.message);
          setErrorMessage(data.message)
          return
        }
        setWords((prev)=>(
          prev.map((word)=> word.id === data.updatedWord.id ? data.updatedWord : word)
        ))
        setEdit('')
      }
      catch(error){
        console.log(error)
      }
    }

  return (
    <>
      <Header />
      <div className="selected-list">
        <p className="selected-list-title">{list?.name}</p>
        <div className="selected-list-container">
          <div className="selected-list-container-title">
            <p>{list?.firstLanguage}</p>
            <p>{list?.secondLanguage}</p>
            <p>Created at</p>
            <p>Edit/Erase</p>
          </div>
          {words?.map((word)=>(
            <div key={word.id}>
              {edit === word.id ?
              <form className="edit-word"  onSubmit={(e)=>editWord(e, wordToEdit)}>
                <input type="text" name='firstLanguage' value={wordToEdit.firstLanguage} onChange={handleWordToEdit} placeholder={word.firstLanguage} />
                <input type="text" name='secondLanguage' value={wordToEdit.secondLanguage} onChange={handleWordToEdit} placeholder={word.secondLanguage} />
                <p>{new Date(word.createdAt).toLocaleDateString()}</p>
                <div className="word-icons">
                  <button type="submit"><EditIcon /></button>
                  <button onClick={()=>setEdit('')}><EraseIcon /></button>
                </div>
              </form>
              :
              <div className="word">
                <p>{word.firstLanguage}</p>
                <p>{word.secondLanguage}</p>
                <p>{new Date(word.createdAt).toLocaleDateString()}</p>
                <div className="word-icons">
                  <button onClick={()=>{setEdit(word.id) ; setWordToEdit({id : word.id, firstLanguage : word.firstLanguage, secondLanguage : word.secondLanguage})}}><EditIcon /></button>
                  <button onClick={()=>deleteWord(word.id)}><EraseIcon /></button>
                </div>
              </div>
              }
            </div>
          ))}
          {addNewWord ?
          <>
          <form onSubmit={addWord} className="word-form">
            <input type="text" name="firstLanguage" value={formData.firstLanguage} onChange={handleFormData} placeholder={list?.firstLanguage} />
            <input type="text" name="secondLanguage" value={formData.secondLanguage} onChange={handleFormData} placeholder={list?.secondLanguage} />
            <p>/</p>
            <div className="word-form-icons">
              <button type="submit"><AddIcon /></button>
              <button type="button" onClick={()=>setAddNewWord(false)}><EraseIcon /></button>
            </div>
          </form>
          </>
          :
          <></>}
          {errorMessage &&
          (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large', marginTop : '50px'}}>{errorMessage}</p>)
          }
          {!addNewWord &&
          <button onClick={()=>{setAddNewWord(true); setFormData({firstLanguage : '', secondLanguage : ''})}} className="add-word">Add Word</button>
          }
        </div>
      </div>
    </>
  )

}

export default List