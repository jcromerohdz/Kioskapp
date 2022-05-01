import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

const KioskContext = createContext()

const KioskProvider = ({children}) => {
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState({})
  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false)
  const [order, setOrder] = useState([])
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')

  const router = useRouter()

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
    router.push('/')
  }

  const handleSetProduct = (product) =>{
    setProduct(product)
  }

  const handleChangeModal = () =>{
    setModal(!modal)
  }

  const handleAddOrder = ({categoryId, ...product}) =>{
    if(order.some(productState => productState.id === product.id)) {
      // Update Order
      const updateOrder = order.map(productState => productState.id === product.id ? product : productState)
      setOrder(updateOrder)

      toast.success('Orden Actualizada')
    }else {
      setOrder([...order, product])
      toast.success('Agreagado a la orden!!')
    }

    setModal(false)
  }

  const handleChangeStep = (step) => {
    setStep(step)
  }

  const handleEditAmounts = (id) => {
    console.log(id)
    const updatedProduct = order.filter( product => product.id === id)
    setProduct(updatedProduct[0])
    setModal(!modal)
  }

  const handleDeleteProduct = (id) => {
    console.log(id)
    const updateProduct = order.filter( product => product.id !== id)
    setOrder(updateProduct)
  }

  const placeOrder = async(e) => {
    e.preventDefault()
    console.log('Colocar Orden...')
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
        handleAddOrder,
        order,
        step, 
        handleChangeStep,
        handleEditAmounts,
        handleDeleteProduct,
        name,
        setName
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