import { Link } from "react-router-dom"
import { ShopCardTypes } from "../../types/ShopCardTypes"
import AddingToCart from "./AddingToCart"
const ShopCards = ({ _id, name, price, imageUrl, alt }: ShopCardTypes) => {
  return (
    <article
      className="w-full h-full flex flex-col justify-between gap-4"
      id={_id}
    >
      <Link to={`/shop/${_id}`}>
        <div>
          <h3 className="font-montzerrat text-base font-semibold">{name}</h3>
          <img
            src={imageUrl}
            alt={alt}
            className="w-full aspect-square object-center border border-primary"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex items-center  gap-3 justify-between">
        <p>${price}</p>
        <AddingToCart id={_id} />
      </div>
    </article>
  )
}

export default ShopCards
