import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface formData{
  username : string, 
  password : string
}

function Login() {

  const navigate = useNavigate()
  const urlBack = import.meta.env.URL_BACK

  const [formData, setFormData] = useState<formData>({
    username : '',
    password : ''
  })

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setFormData( prev => ({...prev, [name] : value }))
  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
        const response = await fetch(urlBack, {
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify(formData)
        })
        const data = await response.json()
        if(!response.ok){
          setErrorMessage(data.message)
          return
        }
        navigate('/home')
    }
    catch(error){
      console.log(error)
    }
  }

  return (

    <div className="login">
        <div className="login-card">
          <p className="login-title">Log In</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
          {errorMessage &&
          (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{errorMessage}</p>)
          }
          <div className="login-links">
            <Link to={'/forgot-password'}>Forgot Password ?</Link>
            <Link to={'/sign-up'}>Sign Up</Link>
          </div>
        </div>
    </div>

  )

}

export default Login