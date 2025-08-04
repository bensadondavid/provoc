import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import { useState, useEffect } from "react";

interface List {
  id: string;
  name: string;
  firstLanguage: string;
  secondLanguage: string;
  wordsNumber: number;
}

function NewGame() {
  const urlBack = import.meta.env.VITE_URL_BACK || "http://localhost:3000";
  const location = useLocation();

  const [lists, setLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [firstLanguage, setFirstLanguage] = useState('');
  const [secondLanguage, setSecondLanguage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || "";
    const firstLang = params.get("gameFirstLanguage") || "";
    const secondLang = params.get("gameSecondLanguage") || "";

    setSelectedListId(id);
    setFirstLanguage(firstLang);
    setSecondLanguage(secondLang);
  }, [location.search]);

  useEffect(() => {
    const getLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${urlBack}/lists/home-lists`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setLists(data.lists);
      } catch (error) {
        console.error(error);
      }
    };

    getLists();
  }, []);

  const selectedList = lists.find((list) => list.id === selectedListId);

  return (
    <>
      <Header />
      <div className="game">
        <h1 className="game-title">New Game</h1>
        <div className="game-container">
          <form>
            <select
              value={selectedListId}
              onChange={(e) => {
                setSelectedListId(e.target.value);
                setFirstLanguage('');
                setSecondLanguage('');
              }}
            >
              <option value="">Select a list</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>

            {selectedList && (
              <>
                <select
                  name="firstLanguage"
                  value={firstLanguage}
                  onChange={(e) => setFirstLanguage(e.target.value)}
                >
                  <option value="">Select a language</option>
                  <option value={selectedList.firstLanguage}>
                    {selectedList.firstLanguage}
                  </option>
                  <option
                    value={selectedList.secondLanguage}
                    disabled={selectedList.secondLanguage === selectedList.firstLanguage}
                  >
                    {selectedList.secondLanguage}
                  </option>
                </select>

                <select
                  name="secondLanguage"
                  value={secondLanguage}
                  onChange={(e) => setSecondLanguage(e.target.value)}
                >
                  <option value="">Select a language</option>
                  <option
                    value={selectedList.secondLanguage}
                    disabled={selectedList.secondLanguage === firstLanguage}
                  >
                    {selectedList.secondLanguage}
                  </option>
                  <option
                    value={selectedList.firstLanguage}
                    disabled={selectedList.firstLanguage === firstLanguage}
                  >
                    {selectedList.firstLanguage}
                  </option>
                </select>
              </>
            )}

            <button type="submit">Launch game</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewGame;