import { Link, useNavigate } from "react-router-dom"
import UserIcon from "../assets/icons/UserIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import LogOut from "../assets/icons/LogOut"

function Header() {

  const navigate = useNavigate()

  const logOut = async()=>{
    try{
      localStorage.removeItem('token')
      navigate('/login')
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <header>
        <p className="header-title">PROVOC</p>
        <nav>
          <ul>
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/lists'}>My Lists</Link></li>
            <li><Link to={'/stats'}>Stats</Link></li>
            <li><Link to={'/my-account'}>My Account</Link></li>
          </ul>
        </nav>
        <div className="header-icons">
          <Link to={'/my-account'}><UserIcon /></Link>
          <Link to={'/settings'}><SettingsIcon /></Link>
          <button onClick={logOut}><LogOut /></button>
        </div>
    </header>
  )

}

export default Header