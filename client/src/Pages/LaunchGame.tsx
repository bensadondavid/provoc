import { useNavigate } from "react-router-dom"


function LaunchGame() {

    const navigate = useNavigate()

    const setList = (url : string)=>{
          navigate(`${url}`)
  }

  return (
    <div className="launch-game">

    </div>
  )

}

export default LaunchGame