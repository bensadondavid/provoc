import { useLocation } from "react-router-dom"
import Header from "../Components/Header"
import { useState, useEffect } from "react"

function NewGame() {

 const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'
 const[errorMessage, setErrorMessage] = useState<string>('')

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [gameParams, setGameParams] = useState({
  id: '',
  firstLanguage: '',
  secondLanguage: ''
});

useEffect(() => {
  const params = new URLSearchParams(location.search);
  setGameParams({
    id: params.get('id') || '',
    firstLanguage: params.get('firstLanguage') || '',
    secondLanguage: params.get('secondLanguage') || ''
  });
}, [location.search]);


  return (
    <>
      <Header />
      <div className="game">
        <h1 className="game-title">New Game</h1>
        <div className="game-container">
          <form>
            <label>Name <br />
              <input type="text" name="name" value={gameParams.name} onChange={handleChange} required />
            </label>
            <label>First Language <br />
              <input type="text" name="firstLanguage" value={formData.firstLanguage} onChange={handleChange} required />
            </label>
            <label>Second Language <br />
              <input type="text" name="secondLanguage" value={formData.secondLanguage} onChange={handleChange} required />
            </label>
              <button type="submit">Create</button>
              {errorMessage &&
              (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{errorMessage}</p>)
              }
          </form>
        </div>
      </div>
    </>
  )

}

export default NewGame