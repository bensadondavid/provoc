import { useState } from "react"
import { Link } from "react-router-dom"

interface formData{
  username : string,
  email : string, 
  password : string
}

function SignUp() {

  const [formData, setFormData] = useState<formData>({
      username : '',
      email : '',
      password : ''
    })
  
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setFormData( prev => ({...prev, [name] : value }))
    }

  return (

   <div className="sign-up">
        <div className="sign-up-card">
          <p className="sign-up-title">Sign Up</p>
          <form>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          <div className="sign-up-links">
            <Link to={'/login'}>Already have an Account ?</Link>
          </div>
        </div>
    </div>

  )

}

export default SignUp