import React, { useState, useContext, useEffect } from 'react'
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
console.log(API_ENDPOINT)
const AppContext = React.createContext()



const AppProvider = ({ children }) => {
  const [isloading , setloading] = useState(true)
  const [error , seterror] = useState({show : false , msg : ''})
  const [movies , setmovies ] = useState([])
  const [query, setquery] = useState('batman')

 const fetchMovies = async (url) => {
   setloading(true)
   try {
     const response = await fetch(url)
     const data = await response.json();
     if(data.Response === 'True'){
       setmovies(data.Search)
       seterror({show:false,msg:''})
     }
     else{
       seterror({show:true,msg:data.Error})
     }
     setloading(false)
   } catch (error) {
     console.log(error)
     
   }
 }
 
  useEffect(()=>{
    fetchMovies(`${API_ENDPOINT}&s=${query}`)
  },[query])
  return <AppContext.Provider value={{isloading,error,movies,query,setquery}}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
