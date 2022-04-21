import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const KioskContext = createContext()

const KioskProvider = ({children}) => {
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState({})
  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false)
  const [order, setOrder] = useState([])

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

  useEffect(() => {
    setCurrentCategory(categories[0])

  }, [categories])

  const handleClickCategory = (id) =>{
    const category = categories.filter( cat => cat.id === id)
    setCurrentCategory(category[0])
  }

  const handleSetProduct = (product) =>{
    setProduct(product)
  }

  const handleChangeModal = () =>{
    setModal(!modal)
  }

  const handleAddOrder = ({categoryId, image, ...product}) =>{
    if(order.some(productState => productState.id === product.id)) {
      // Update Order
      console.log('Updating...')

      const updateOrder = order.map(productState => productState.id === product.id ? product : productState)
      setOrder(updateOrder)
    }else {
      setOrder([...order, product])
    }
  }

  return(
    <KioskContext.Provider
      value={{
        categories,
        currentCategory,
        handleClickCategory,
        product,
        handleSetProduct,
        modal,
        handleChangeModal,
        handleAddOrder
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