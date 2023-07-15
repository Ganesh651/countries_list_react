import {useState,useEffect} from 'react'
import CountriesList from './components/CountriesList'
import './App.css'

const apiResponseConstrains = {
  initial : "INITIAL",
  inProgress: "INPROGRESS",
  success : "SUCCESS",
  failure : "FAILURE"
}
const App =()=>{
  const [userInput,setUserInput] = useState("")
  console.log(userInput)
  const [apiResponse, setApiResponse] = useState({
    status : apiResponseConstrains.initial,
    data: null,
    errorMsg : null
  })

  useEffect(()=>{
    const getCountriesList = async () => {
      setApiResponse({
        status : apiResponseConstrains.inProgress,
        data: null,
        errorMsg : null})

      const response = await fetch("https://apis.ccbp.in/countries-data")
      const responseData = await response.json()
     
      if (response.ok === true){
        setApiResponse((prevApiResponse)=>({
  ...prevApiResponse,
  status : apiResponseConstrains.success,
  data: responseData,
}));
}else{
   setApiResponse((prevApiResponse)=>({
  ...prevApiResponse,
  status : apiResponseConstrains.failure,
  errorMsg: responseData.error_msg,
}));

      }
    }

    getCountriesList()

  },[])

const onChangeSearchInput = e =>{
  setUserInput(e.target.value)
  
}

 const renderLoaderView  = () => (
  <div className="col-12 mt-5" id="spinner">
    <div className="d-flex flex-row justify-content-center">
      <div className="spinner-border" role="status"></div>
    </div>
  </div>
 )

const renderSuccessView = () => {
  const {data} = apiResponse 
  
  return (
    <ul className='list-container'>
    {data.map(eachCountry=>(
      <CountriesList eachCountry={eachCountry} key={eachCountry.name} />
    ))}
    </ul>
  )
 }

 const renderFailureView = () => {
  const {errorMsg} = apiResponse
return(
    <p>{errorMsg}</p>
 )
 }
 

  const renderCountriesList = ()=>{
    const {status} = apiResponse
   
    switch(status){
      case apiResponseConstrains.inProgress:
        return renderLoaderView()
      case apiResponseConstrains.success:
        return renderSuccessView()
      case apiResponseConstrains.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="container pt-5">
        <div className="row">
            <h1 className="col-12 heading text-center">Find the Countries Population</h1>
            <div className="col-12 text-center mt-3">
                <input onChange={onChangeSearchInput} value={userInput}  type="search" placeholder="Search for a Country" className="form-control search-input" />
            </div>
            
        </div>
        {renderCountriesList()}
    </div>
  )
}
export default App;
