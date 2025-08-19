import { useState } from "react"
import { useLocation } from "react-router-dom"

interface Password{
    password : string,
    confirmation : string
}

function ResetPassword() {

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const urlBack = import.meta.env.URL_BACK || 'http://localhost:3000'
    const [message, setMessage] = useState<string>('')
    const [formData, setFormData] = useState<Password>({
        password : '', 
        confirmation : ''
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormData(
            prev => ({...prev, [name] : value})
        )
    }

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${urlBack}/new-password`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({'password' : formData.password, token})
            })
            const data = await response.json()
            if(!response.ok){
                setMessage(data.message)
                return console.log(data.message)
            }
            setMessage(data.message)
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <div className="reset-password">
        <form onSubmit={handleSubmit}>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <input type="password" name="confirmation" value={formData.confirmation} onChange={handleChange} />
            <button type="submit">Sumbit</button>
            {message &&
            (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{message}</p>)
            }
        </form>
    </div>
  )

}

export default ResetPassword