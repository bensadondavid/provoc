import { useState } from "react"
import { Link } from "react-router-dom"

interface formData{
  username : string, 
  password : string
}

function Login() {

  const [formData, setFormData] = useState<formData>({
    username : '',
    password : ''
  })

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setFormData( prev => ({...prev, [name] : value }))
  }

  return (

    <div className="login">
        <div className="login-card">
          <p className="login-title">Log In</p>
          <form>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
          <div className="login-links">
            <Link to={'/forgot-password'}>Forgot Password ?</Link>
            <Link to={'/sign-up'}>Sign Up</Link>
          </div>
        </div>
    </div>

  )

}

export default Login