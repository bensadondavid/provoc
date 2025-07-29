import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "../Components/Header"

interface Words{
  id : string,
  name : string,
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
          </div>
          {words?.map((word)=>(
            <div className="word" key={word.id}>
              <p>{word.firstLanguage}</p>
              <p>{word.secondLanguage}</p>
              <p>{new Date(word.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )

}

export default List