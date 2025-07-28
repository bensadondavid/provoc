import { useState } from "react"
import Header from "../Components/Header"
import { useNavigate } from "react-router-dom"

interface NewList{
  name : string,
  firstLanguage : string,
  secondLanguage : string,
}

function NewList() {

  const navigate = useNavigate()
  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000'
  const token = localStorage.getItem('token')
  const[errorMessage, setErrorMessage] = useState<string>('')
  const [formData, setFormData] = useState<NewList>({
    name :'',
    firstLanguage : '',
    secondLanguage : ''
  })

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    setFormData(
      prev => ({...prev, [name] : value})
    )
  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${urlBack}/lists/new-list`, {
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${token}`,
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(formData)
      })
      const data = await response.json()
      if(!response.ok){
        return setErrorMessage(data.message)
      }
      navigate('/lists')
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>
        <Header />
        <div className="new-list">
            <h1 className="new-list-title">New List</h1>
              <form onSubmit={handleSubmit}>
                <label>Name <br />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>First Language <br />
                  <input type="text" name="firstLanguage" value={formData.firstLanguage} onChange={handleChange} required />
                </label>
                <label>Second Language <br />
                  <input type="text" name="secondLanguage" value={formData.secondLanguage} onChange={handleChange} required />
                </label>
                  <button type="submit">Create</button>
                 {errorMessage &&
                  (<p style={{textAlign : 'center', color : '#e409ef', fontSize : 'large'}}>{errorMessage}</p>)
                  }
              </form>
        </div>
    </>
  )

}

export default NewList