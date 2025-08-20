import { useEffect, useState } from "react"
import Header from "../Components/Header"
import { Link, useNavigate } from "react-router-dom"
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

interface LastSession{
  id : string,
  name : string, 
  score : number, 
  total : number, 
  accuracy : number,
  completedAt : string
}

interface GlobalStats{
  totalSession : string,
  totalScore : string,
  totalWordsPlayed : string,
  totalAccuracy : string
}

function Home() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token')
  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
  const [lists, setLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [gameFirstLanguage, setGameFirstLanguage] = useState('');
  const [gameSecondLanguage, setGameSecondLanguage] = useState('');
  const [lastSessions, setLastSessions] = useState<LastSession[]>([])
  const [globalStats, setGlobalStats] = useState<GlobalStats>()

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

  const getLastSession = async()=>{
    try{
      const response = await fetch(`${urlBack}/stats/get-lasts-sessions`,{
        method : 'GET', 
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })
      const data = await response.json()
      if(!response.ok){
        return console.log(data.message)
      }
      setLastSessions(data.newLastSessions)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getLastSession()
  },[])


  const getGlobalStats = async()=>{
    try{
      const response = await fetch(`${urlBack}/stats/global-stats`, {
        method : 'GET', 
        headers : {'Authorization' : `Bearer ${token}`}
      })
      const data = await response.json()
      if(!response.ok){
        return console.log(data.message)
      }
      setGlobalStats(data.allStats)
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getGlobalStats()
  }, [])

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
            {lists.length === 0 ?
              <Link to='/lists' className="new-list-button-home">Create a new list</Link>
             :
            (lists.map((list)=>(
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
            )))
              }
          </div>
        </div>

        <div className="home-scnd-container">

          <div className="previous-sessions">
            <div className="previous-session-title">
              <p>Your last sessions</p>
              <CalendarIcon />
            </div>
            <div className="home-last-sessions-title">
              <p>List</p>
              <p>Score</p>
              <p>Accuracy</p>
              <p>Last session</p>
            </div>
            <div className="home-last-sessions">
              {lastSessions.map((last)=>(
              <div className="home-last-session" key={last.id}>
                <p>{last.name}</p>
                <p>{last.score} / {last.total}</p>
                <p>{last.accuracy.toFixed(2)} %</p>
                <p>{new Date(last.completedAt).toLocaleDateString()}</p>
              </div>
              ))}
            </div>
          </div>

          <div className="home-stats">
            <div className="home-stats-title">
              <p>Your statistics</p>
              <StatsIcon />
            </div>
              <div className="global-stats">
                <p>Completed words : <span>{globalStats?.totalScore}</span></p>
                <p>Total Words : <span>{globalStats?.totalWordsPlayed}</span></p>
                <p>Total Session : <span>{globalStats?.totalSession}</span></p>
                <p>Accuracy : <span>{globalStats?.totalAccuracy} %</span></p>
              </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;