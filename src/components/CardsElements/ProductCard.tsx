import AddingToCart from "./AddingToCart"

const ProductCard = () => {
  return (
    <article className="w-56 px-2 py-3 bg-background border border-accent   flex flex-col justify-between my-3">
      <div className="w-full flex justify-end pb-4">
        <div className="w-40 aspect-square flex bg-red">
          <img
            src="https://via.placeholder.com/160"
            alt="Product"
            className="w-full h-full object-center rounded-2xl shadow-md"
          />
        </div>
      </div>

      <h3 className="font-montzerrat text-2xl pb-2">Product Name</h3>
      <div className="flex items-center gap-4">
        <span className="text-lg">Price</span>
        <AddingToCart />
      </div>
    </article>
  )
}

export default ProductCard
