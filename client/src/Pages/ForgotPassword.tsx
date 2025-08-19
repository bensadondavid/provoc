import { useState } from "react"
import Header from "../Components/Header"

function ForgotPassword() {

    const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isSent, setIsSent] = useState<boolean>(false)

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('')
    const handleInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setUsernameOrEmail(e.target.value)
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${urlBack}/users/forgot-password`,{
                method : 'POST',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({usernameOrEmail})
            })
            const data = await response.json()
            if(!response.ok){
                return setErrorMessage(data.message)
            }
            setIsSent(true)
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <>
    <Header />
    {!isSent ? 
    <div className="forgot-password">
        <form onSubmit={handleSubmit}>
            <input type="text" name="usernameOrEmail" value={usernameOrEmail} placeholder="Username or Email" onChange={handleInput} autoComplete="email" required />
            <button type="submit">Submit</button>
            {errorMessage &&
            (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large', marginTop : '50px'}}>{errorMessage}</p>)
            }
        </form>
    </div>
    :
    <div className="forgot-password-success">
        <p>We’ve sent you an email to reset your password</p>
    </div>
    }
    </>
  )

}

export default ForgotPassword
