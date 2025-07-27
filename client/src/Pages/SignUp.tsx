import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

interface formData{
  username : string,
  email : string, 
  password : string
}

function SignUp() {

  const navigate = useNavigate()
  const urlBack = import.meta.env.VITE_URL_BACK  || 'http://localhost:3000/users/sign-up'

  const [formData, setFormData] = useState<formData>({
      username : '',
      email : '',
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
        navigate('/login')
    }
    catch(error){
      console.log(error)
    }
  }

  return (

   <div className="sign-up">
        <div className="sign-up-card">
          <p className="sign-up-title">Sign Up</p>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
          {errorMessage &&
          (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{errorMessage}</p>)
          }
          <div className="sign-up-links">
            <Link to={'/login'}>Already have an Account ?</Link>
          </div>
        </div>
    </div>

  )

}

export default SignUp