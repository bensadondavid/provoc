import { useEffect, useState } from "react"
import Header from "../Components/Header"
import { useNavigate } from "react-router-dom"
import InfosIcon from "../assets/icons/InfosIcon"
import PlayIcons from "../assets/icons/PlayIcons"
import StatsIcon from "../assets/icons/StatsIcon"
import CalendarIcon from "../assets/icons/CalendarIcon"

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  wordsNumber : number
}

function Home() {

  const navigate = useNavigate();

  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
  const [lists, setLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [gameFirstLanguage, setGameFirstLanguage] = useState('');
  const [gameSecondLanguage, setGameSecondLanguage] = useState('');

  const getLists = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${urlBack}/lists/home-lists`, {
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

  const setList = (url : string)=>{
    navigate(`${url}`)
  }

  useEffect(() => {
    getLists();
  }, []);

  const selectedList = lists.find((list) => list.id === selectedListId);

  const launchGame = () => {
    if (!selectedListId || !gameFirstLanguage || !gameSecondLanguage) {
      alert("Please select both a list and a language");
      return;
    }
    if (gameFirstLanguage === gameSecondLanguage) {
      alert("First and second languages must be different");
      return;
    }

    const params = new URLSearchParams({
      id : selectedList?.id || '',
      name : selectedList?.name || '',
      gameFirstLanguage,
      gameSecondLanguage
    })
    setList(`/new-game?${params.toString()}`)
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="home-first-container">
          <div className="new-game">
            <p className="new-game-title">New Game</p>

            <div className="new-game-params">
              <select value={selectedListId} onChange={(e) => {
                setSelectedListId(e.target.value)
                setGameFirstLanguage('')
                setGameSecondLanguage('')
              }}>
                <option value="">Select a list</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>

              {selectedList && (
                <>
                <select value={gameFirstLanguage} onChange={(e) => setGameFirstLanguage(e.target.value)}>
                  <option value="">Select a language</option>
                  <option value={selectedList.firstLanguage}>{selectedList.firstLanguage}</option>
                  <option value={selectedList.secondLanguage}>{selectedList.secondLanguage}</option>
                </select>
                <select value={gameSecondLanguage} onChange={(e) => setGameSecondLanguage(e.target.value)}>
                  <option value="">Select a language</option>
                  <option value={selectedList.secondLanguage}>{selectedList.secondLanguage}</option>
                  <option value={selectedList.firstLanguage}>{selectedList.firstLanguage}</option>
                </select>
                </>
              )}
            </div>

            <button className="new-game-button" onClick={launchGame}>Start a new game</button>
          </div>

          <div className="home-lists">
            <p className="home-lists-title">Your Lists</p>
            <div className="home-lists-list-titles">
              <p>Name</p>
              <p>Languages</p>
              <p>Length</p>
              <p>Infos / Play</p>
            </div>
            {lists.map((list)=>(
              <div className="home-lists-list" key={list.id}>
                <p>{list.name}</p>
                <p>{list.firstLanguage} / {list.secondLanguage}</p>
                <p>{list.wordsNumber}</p>
              <div className="home-lists-buttons">
              <button onClick={()=>setList(`/list/${list.id}`)}><InfosIcon /></button>
              <button onClick={()=>{
                const params = new URLSearchParams({id : list.id})
                setList(`/new-game?${params.toString()}`,)}}>
                <PlayIcons /></button>
              </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-scnd-container">

          <div className="previous-sessions">
            <div className="previous-session-title">
              <p>Your last sessions</p>
              <CalendarIcon />
            </div>
          </div>

          <div className="home-stats">
            <div className="home-stats-title">
              <p>Your statistics</p>
              <StatsIcon />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;