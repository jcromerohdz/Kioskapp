import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const KioskContext = createContext()

const KioskProvider = ({children}) => {
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState({})

  const getCategories = async () => {
    try {
      const { data } = await axios('/api/categories')
      setCategories(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()

  }, [])

  const handleClickCategory = (id) =>{
    const category = categories.filter( cat => cat.id === id)
    setCurrentCategory(category[0])
  }


  return(
    <KioskContext.Provider
      value={{
        categories,
        currentCategory,
        handleClickCategory
      }}
    >
      {children}
    </KioskContext.Provider>
  )
}

export {
  KioskProvider
}

export default KioskContext