import './index.css'

const CountriesList = props => {
      const {eachCountry} = props 
      const {name,flag,population} = eachCountry
      

      return (
            <li>
                 <div className='col-md-4 col-lg-3'>
                  <div className='card-bg'>
                        <img className='country-flag' src={flag} alt="flag" />
                        <div className='population-container'>
                              <h1 className='country-name'>{name}</h1>
                              <p className='country-population'>{population}</p>
                        </div>
                        </div>
                  </div>
            </li>
      )
}


export default CountriesList