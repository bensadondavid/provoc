import { useEffect, useState } from "react";
import Header from "../Components/Header"
import { useLocation } from "react-router-dom";

interface Word{
  firstLanguage : string,
  secondLanguage : string
}

interface List{
  id : string,
  name : string,
  firstLanguage : string, 
  secondLanguage : string
}

function LaunchGame() {

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const listId = params.get('id')
  const firstLanguage = params.get('firstLanguage')
  const secondLanguage = params.get('secondLanguage')
  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'

  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const [list, setList] = useState<List>()
  const [words, setWords] = useState<Word[]>([])

  const getWords = async()=>{
    try{
      const response = await fetch(`${urlBack}/lists/list/${listId}`,{
        method : 'GET',
        headers : {'Content-Type' : 'application/json'}
      })
      const data = await response.json()
      if(!response.ok){
        console.log(data.message)
        return 
      }
      setList(data.list)
      setWords(data.words)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getWords()
  },[])


  return (
    <>
    <Header />
    <div className="launch-game">
      <div className="launch-game-container">
        <p className="word-to-translate">{words[0].firstLanguage}</p>
        <form>
          <input type="text" />
          <button>Submit</button>
        </form>
        <div className="score-timer">
          <p className="score">Score</p>
          <p>{formatTime(elapsed)}</p>
        </div>
      </div>
    </div>
    </>
  )

}

export default LaunchGame