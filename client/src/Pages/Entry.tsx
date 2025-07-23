import { Link } from 'react-router-dom'

function Entry() {

  return (

    <div className="entry">
        <div className="entry-left-container">
            <div className="entry-left-inside">
                <img src="provoc-img.png"  />
            </div>
        </div>
        <div className="entry-right-container">
            <p className='entry-title'>Provoc</p>
            <p className="entry-description">Language Learning App</p>
            <Link to={'/login'}>Start Now</Link>
        </div>
    </div>

  )

}

export default Entry