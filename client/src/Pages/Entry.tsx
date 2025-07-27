import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { verifyUser } from '../Components/VerifyUser'

function Entry() {

  const urlBack = import.meta.env.VITE_URL_BACK || 'http://localhost:3000';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      const result = await verifyUser(urlBack);
      setIsAuthenticated(result);
    };
    checkAuth();
  }, [urlBack]);

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
            <Link to={isAuthenticated ? '/home' : '/login'}>Start Now</Link>
        </div>
    </div>
)

}

export default Entry