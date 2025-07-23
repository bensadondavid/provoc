import { Link } from "react-router-dom"
import UserIcon from "../assets/icons/userIcon"
import SettingsIcon from "../assets/icons/SettingsIcon"
import LogOut from "../assets/icons/LogOut"

function Header() {

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
          <Link to={'/login'}><UserIcon /></Link>
          <Link to={'/settings'}><SettingsIcon /></Link>
          <button><LogOut /></button>
        </div>
    </header>
  )

}

export default Header