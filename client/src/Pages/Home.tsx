import { useEffect, useState } from "react"
import Header from "../Components/Header"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addList, clearList } from "../Store/listSlice"
import InfosIcon from "../assets/icons/InfosIcon"
import PlayIcons from "../assets/icons/PlayIcons"
import StatsIcon from "../assets/icons/StatsIcon"

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  lastReviewed : string
}

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state.list)

  const urlBack = '';
  const [lists, setLists] = useState<List[]>([
    {id : '1', name : 'work', firstLanguage : 'english', secondLanguage : 'french', lastReviewed : '28/02/2025' },
    {id : '1', name : 'work', firstLanguage : 'english', secondLanguage : 'french', lastReviewed : '28/02/2025' },
  ]);
  const [selectedListId, setSelectedListId] = useState('');
  const [firstLanguage, setFirstLanguage] = useState('');
  const [secondLanguage, setSecondLanguage] = useState('');

  const getList = async () => {
    try {
      const response = await fetch(urlBack, {
        method: 'GET',
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLists(data.lists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const selectedList = lists.find((list) => list.id === selectedListId);

  const launchGame = () => {
    if (!selectedListId || !firstLanguage || !secondLanguage) {
      alert("Please select both a list and a language");
      return;
    }
    if (firstLanguage === secondLanguage) {
      alert("First and second languages must be different");
      return;
    }
    if(state.length > 0){
      dispatch(clearList())
    }

    dispatch(addList({
      id : selectedListId,
      firstLanguage: firstLanguage,
      secondLanguage: secondLanguage,
    }));

    navigate('/new-game');
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
                setFirstLanguage('')
                setSecondLanguage('')
              }}>
                <option value="">Select a list</option>
                {lists.map((list) => (
                  <option key={list.id} value={list.id}>{list.name}</option>
                ))}
              </select>

              {selectedList && (
                <>
                <select value={firstLanguage} onChange={(e) => setFirstLanguage(e.target.value)}>
                  <option value="">Select a language</option>
                  <option value={selectedList.firstLanguage}>{selectedList.firstLanguage}</option>
                  <option value={selectedList.secondLanguage}>{selectedList.secondLanguage}</option>
                </select>
                <select value={secondLanguage} onChange={(e) => setSecondLanguage(e.target.value)}>
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
              <p style={{transform : 'translateX(22px)'}}>Last practice</p>
              <p>Infos / Play</p>
            </div>
            {lists.map((list)=>(
              <div className="home-lists-list" key={list.id}>
                <p>{list.name}</p>
                <p>{list.firstLanguage} / {list.secondLanguage}</p>
                <p>{list.lastReviewed}</p>
              <div className="home-lists-buttons">
              <button><InfosIcon /></button>
              <button><PlayIcons /></button>
              </div>
              </div>
            ))}
          </div>
        </div>

        <div className="home-scnd-container">

          <div className="previous-sessions"></div>

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