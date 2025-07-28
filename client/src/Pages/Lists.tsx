import Header from "../Components/Header"
import { useEffect, useState } from "react";
import InfosIcon from "../assets/icons/InfosIcon"
import PlayIcons from "../assets/icons/PlayIcons"
import AddIcon from "../assets/icons/AddIcon";
import { Link, useNavigate } from "react-router-dom";

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  wordsNumber : number,
  createdAt : string
}

function Lists() {

    const navigate = useNavigate()
    const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
    const [lists, setLists] = useState<List[]>([]);

    const getLists = async () => {
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
          if (!response.ok) throw new Error(data.message);
          setLists(data.lists);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getLists();
      }, []);
    
       const setList = (url : string)=>{
          navigate(`${url}`)
  }

  return (
    <>
        <Header />
        <div className="lists">
          <div className="lists-title">
            <h1>Your Lists</h1>
            <Link to={'/new-list'}><AddIcon /></Link>
          </div>
            <div className="lists-container">
                  <div className="lists-list-titles">
                  <p>Name</p>
                  <p>Languages</p>
                  <p>Length</p>
                  <p>Created at</p>
                  <p>Infos / Play</p>
                  </div>
                  {lists.map((list)=>(
                  <div className="lists-list" key={list.id}>
                      <p>{list.name}</p>
                      <p>{list.firstLanguage} / {list.secondLanguage}</p>
                      <p>{list.wordsNumber}</p>
                      <p>{new Date(list.createdAt).toLocaleDateString()}</p>
                  <div className="lists-buttons">
                  <button onClick={()=>setList(`/list/${list.id}`)}><InfosIcon /></button>
                  <button onClick={()=>{
                    const params = new URLSearchParams({name : list.id})
                    setList(`/new-game?${params.toString()}`,)}}>
                    <PlayIcons />
                  </button>
                      </div>
                      </div>
                      ))}
                </div>
        </div>
    </>
  )

}

export default Lists