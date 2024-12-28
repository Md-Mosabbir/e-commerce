import { Link } from "react-router-dom"

import AddToCart from "./AddToCart"
import { ShopItemType } from "../../types/ProductType"
const ShopCards = ({ _id, name, price, imageUrl }: ShopItemType) => {
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
            alt={name}
            className="w-full aspect-square object-center border border-primary"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex items-center  gap-3 justify-between">
        <p>${price}</p>
        <AddToCart id={_id} />
      </div>
    </article>
  )
}

export default ShopCards
