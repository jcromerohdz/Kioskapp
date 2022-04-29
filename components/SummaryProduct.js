import React from 'react'
import Image from 'next/dist/client/image'
import {formatCurrency} from '../helpers'

const SummaryProduct = ({product}) => {
  return (
    <div
      className='shadow p-5 mb-3 flex gap-10 item-center'
    >
      <div className='md:w-1/6'>

        <Image 
          width={300}
          height={400}
          alt={`Imagen Producto ${product.name}`}
          src={`/assets/img/${product.image}.jpg`}
        />
      </div>

      <div className='md:w-5/6'>
        <p className='text-3xl font-bold'>{product.name}</p>
        <p className='text-xl font-bold mt-2'>Cantidad {product.quantity}</p>
        <p className='text-xl font-bold text-amber-500 mt-2'>Precio: {formatCurrency(product.price)}</p>
        <p className='text-sm text-gray-700 mt-2'>Subtotal: {formatCurrency(product.price * product.quantity)}</p>


      </div>

    </div>
  )
}

export default SummaryProduct