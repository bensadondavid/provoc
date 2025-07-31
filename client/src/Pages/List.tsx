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
    const {name} = useParams()
    const token = localStorage.getItem('token')

    const [edit, setEdit] = useState<boolean>(false)
    const handleEdit = ()=>{}

    const [words, setWords] = useState<Words[]>([])
    const [list, setList] = useState<List>()
    const getList = async()=>{
      try{
        const response = await fetch(`${urlBack}/lists/list/${name}`,{
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
      try{
        const response = await fetch(`${urlBack}/new-word`, {
          method : 'POST',
          headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({...formData, listId : list.id})
        })
        const data = await response.json()
        if(!response.ok){
          return setErrorMessage(data.message)
        }
        setWords((prev)=>[...prev, data.newWord])
      }
      catch(error){
        console.log(error);
      }
    }

  return (
    <>
      <Header />
      <div className="selected-list">
        <p className="selected-list-title">{name}</p>
        <div className="selected-list-container">
          <div className="selected-list-container-title">
            <p>{list?.firstLanguage}</p>
            <p>{list?.secondLanguage}</p>
            <p>Created at</p>
            <p>Edit/Erase</p>
          </div>
          {words?.map((word)=>(
            <div className="word" key={word.id}>
              <p>{word.firstLanguage}</p>
              <p>{word.secondLanguage}</p>
              <p>{new Date(word.createdAt).toLocaleDateString()}</p>
              <div className="word-icons">
                <button><EditIcon /></button>
                <button><EraseIcon /></button>
              </div>
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
              <button onClick={()=>setAddNewWord(false)}><EraseIcon /></button>
            </div>
          </form>
          </>
          :
          <></>}
          {errorMessage &&
          (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{errorMessage}</p>)
          }
          <button onClick={()=>{setAddNewWord(true); setFormData({firstLanguage : '', secondLanguage : ''})}} className="add-word">Add Word</button>
        </div>
      </div>
    </>
  )

}

export default List