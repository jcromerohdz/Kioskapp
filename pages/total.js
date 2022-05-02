import { useEffect, useCallback } from "react"
import Layout from "../layout/Layout"
import useKiosk from "../hooks/useKiosk"
import { formatCurrency } from "../helpers"

export default function Summary() {

  const { order, name, setName, placeOrder, total } = useKiosk()

  const checkOrder = useCallback(() => {
    return order.length === 0 || name === '' || name.length < 3 
  }, [order, name])


  useEffect(() => {
    checkOrder()

  }, [order, checkOrder])


  return(
    <Layout pagina='Total y Confirmar Orden'>
      <h1
        className="text-4xl font-black"
      >
        Total y Confirmar Orden
      </h1>
      <p className="text-2xl my-10">
        Confirma tu orden a continuación
      </p>

      <form
        onSubmit={placeOrder}
      >
        <div>
          <label 
            htmlFor="nombre"
            className="block uppercase text-slate-900 font-bold text-xl">
            Nombre
          </label>
          <input 
            id="nombre"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">Total a pagar {""} <span className="font-bold">{formatCurrency(total)}</span></p>
        </div>

        <div className="mt-5">
          <input 
            type="submit"
            className={`${checkOrder() ? 'bg-sky-100': 'bg-sky-600 hover:bg-sky-800'} text-white uppercase font-bold w-full lg:w-auto px-5 py-2 rounded-md text-center`}
            value="Confirmar Orden"
            disabled={checkOrder()}
          />
        </div>

      </form>
    </Layout>
  )
}