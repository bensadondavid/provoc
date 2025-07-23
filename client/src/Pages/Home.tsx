

function Home() {

  return (

    <div className="home">
      <div className="home-first-container">
        <div className="new-game">
          <p className="new-game-title">New Game</p>
          <button className="new-game-button">Start a new game</button>
        </div>
        <div className="home-lists">
          <p className="home-lists-title">Your Lists</p>
        </div>
      </div>
      <div className="home-scnd-container">
        <div className="home-stats"></div>
        <div className="previous-session"></div>
      </div>
    </div>

  )

}

export default Home