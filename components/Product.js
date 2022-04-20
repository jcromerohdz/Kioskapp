import React from 'react'
import Image from 'next/dist/client/image'
import { formatCurrency } from '../helpers'
import useKiosk from '../hooks/useKiosk'

const Product = ({product}) => {
  const {handleSetProduct, handleChangeModal} = useKiosk()

  const {name, image, price } = product
  return (
    <div className='border p-3'>
      <Image 
        src={`/assets/img/${image}.jpg`} 
        alt={`Imagen Platillo ${name}`} 
        width={400}
        height={500}
      />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{name}</h3>
        <p className='mt-5 font-black text-4xl text-amber-400'>
          {formatCurrency(price)}
        </p>

        <button 
          type='button'
          className='bg-amber-400 hover:bg-amber-200 text-white hover:text-black w-full mt-5 p-3 uppercase font-bold rounded-md'
          onClick={() => {
            handleChangeModal()
            handleSetProduct(product)
          }}
        >
          Agregar
        </button>

      </div>
    </div>
  )
}

export default Product