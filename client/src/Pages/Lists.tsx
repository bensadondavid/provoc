import Header from "../Components/Header"
import { useEffect, useState } from "react";
import InfosIcon from "../assets/icons/InfosIcon"
import PlayIcons from "../assets/icons/PlayIcons"
import { useNavigate } from "react-router-dom";

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  wordsNumber : number
}

function Lists() {

    const navigate = useNavigate()
    const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
    const [lists, setLists] = useState<List[]>([]);

    const getList = async () => {
        try {
          const token = localStorage.getItem('token')
          const response = await fetch(`${urlBack}/lists/all-lists`, {
            method: 'GET',
            headers : {
              'Authorization' : `Bearer ${token}`,
              'Content-type' : 'application/json'
            }
          });
          const data = await response.json();
          console.log(data.lists)
          if (!response.ok) throw new Error(data.message);
          setLists(data.lists);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getList();
      }, []);
    
       const setList = (listSelected : List)=>{
            const name = listSelected.name
            const url = `/new-game/${name}`
            navigate(url)
        }

  return (
    <>
        <Header />
        <div className="lists">
            <h1 className="lists-title">Your Lists</h1>
            <div className="lists-container">
                <div className="lists">
                <div className="lists-list-titles">
                <p>Name</p>
                <p>Languages</p>
                <p style={{transform : 'translateX(22px)'}}>Length</p>
                <p>Infos / Play</p>
                </div>
                {lists.map((list)=>(
                <div className="home-lists-list" key={list.id}>
                    <p>{list.name}</p>
                    <p>{list.firstLanguage} / {list.secondLanguage}</p>
                    <p>{list.wordsNumber}</p>
                <div className="home-lists-buttons">
                <button><InfosIcon /></button>
                <button onClick={()=>setList(list)}><PlayIcons /></button>
                </div>
                </div>
                ))}
                </div>
            </div>
        </div>
    </>
  )

}

export default Lists