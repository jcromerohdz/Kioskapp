import Layout from "../layout/Layout"
import useKiosk from "../hooks/useKiosk"
import SummaryProduct from "../components/SummaryProduct"

export default function Summary() {
  const { order } = useKiosk()
  return(
    <Layout pagina='Resumen'>
      <h1
        className="text-4xl font-black"
      >
        Resumen
      </h1>
      <p className="text-2xl my-10">
        Revisa tu orden
      </p>
      {order.length === 0 ? (
        <p className="text-center text-2xl">No hay elementos en tu orden!!</p>
      ) : (
        order.map(product => (
          <SummaryProduct 
            key={product.id}
            product={product}
          />

        ))
      )}
    </Layout>
  )

}