import { useParams } from "react-router-dom"


function List() {

    const {id} = useParams()

  return (
    <div className="selected-list">

    </div>
  )

}

export default List