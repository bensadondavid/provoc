import { useEffect, useRef, useState } from "react";
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

  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'
  const token = localStorage.getItem('token')

// Get the params
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const listId = params.get('id')
  const firstLanguage = params.get('firstLanguage')
  const secondLanguage = params.get('secondLanguage')

  // Game variables
  const [list, setList] = useState<List>()
  const [word, setWord] = useState<Word | null>(null)
  const [words, setWords] = useState<Word[]>([])
  const [completedWords, setCompletedWords] = useState<Word[]>([])
  const wordRef = useRef<HTMLInputElement>(null)
  const [score, setScore] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [gameStatus, setGameStatus] = useState(false)
  const [finalTime, setFinalTime] = useState<string | null>(null)

// Timer
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

  // Get the words

  useEffect(()=>{
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
    getWords()
  },[urlBack, listId])


// Choose the language
  const [firstLang, setFirstLang] = useState<"firstLanguage" | "secondLanguage" | null>(null)
  const [secondLang, setSecondLang] = useState<"firstLanguage" | "secondLanguage" | null>(null)

  const chooseLanguage = ()=>{
    if (firstLanguage && secondLanguage && list?.firstLanguage) {
      if(list?.firstLanguage === firstLanguage){
        setFirstLang("firstLanguage")
        setSecondLang("secondLanguage")
      }
      else if(list?.firstLanguage === secondLanguage){
        setFirstLang("secondLanguage")
        setSecondLang("firstLanguage")
      }
    }
  }

  useEffect(() => {
  if (list && firstLanguage && secondLanguage) {
    chooseLanguage();
  }
}, [list, firstLanguage, secondLanguage]);


// Choose the word
const chooseWord = ()=>{
  if(!firstLang){
    return null
  }
  const remainingWords = words?.filter((w)=> !completedWords.some(cw => cw[firstLang] === w[firstLang]))
  const index = Math.floor(Math.random()*remainingWords.length)
  setWord(remainingWords[index])
}

// Choose the first word
useEffect(() => {
  if (words.length > 0 && firstLang) {
    chooseWord();
  }
}, [words, firstLang]);


// Verify the answer
const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  if(word && wordRef.current && secondLang && wordRef.current.value.trim().toLowerCase() === word[secondLang].trim().toLowerCase()){
    setCompletedWords(prev=> [...prev, word])
    setScore(s => s + 1)
    setTotal(t => t + 1)
    setErrorMessage('')
    wordRef.current.value = ''
    return
  }
  chooseWord()
  setTotal(t => t + 1)
  if(wordRef.current) wordRef.current.value = ''
}

// Send the stats

const sendStats = async()=>{
  try{
    const response = await fetch(`${urlBack}/stats/send-stats`, {
      method : 'POST', 
      headers : 
      {'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body : JSON.stringify({listId, score, total})
    })
    const data = await response.json()
    if(response.ok){
      console.log(data.message);
      return setErrorMessage(data.message)
    }
  }
  catch(error){
    console.log(error)
  }
}

useEffect(() => {
  if (!firstLang) return;
  if (completedWords.length === words.length && words.length > 0) {
    setFinalTime(formatTime(elapsed))
    setGameStatus(true);
    sendStats()
    return;
  }
  chooseWord();
}, [completedWords])

  return (
    <>
    <Header />
    <div className="launch-game">
      <div className="launch-game-container">
      {!gameStatus ?
        <>
        <p className="word-to-translate">{firstLang && word && word[firstLang]}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="wordSecondLanguage" ref={wordRef} />
          <button type="submit">Submit</button>
        </form>
        <div className="score-timer">
          <p className="score">{score}/{total}</p>
          <p>{formatTime(elapsed)}</p>
          {errorMessage &&
          (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large', marginTop : '50px'}}>{errorMessage}</p>)
          }
        </div>
        </>
      :
      <p className="completed-game">You have finished the game with a score of {score} / {total} </p>
      }
      </div>
    </div>
    </>
  )

}

export default LaunchGame