import { Link } from "react-router-dom"
import AddToCart from "./AddToCart"
import { ShopItemType } from "../../types/ProductType"
import { Heart } from "lucide-react"
import { useWishlist } from "../../hooks/useWishlist"

const ShopCards = ({ _id, name, price, imageUrl }: ShopItemType) => {
  const { wishlist, toggleWishlist } = useWishlist()

  const isLiked = wishlist.data.wishlist?.some(
    (item: { _id: string }) => item._id === _id,
  )

  return (
    <article
      className="w-full h-full flex flex-col justify-between gap-4"
      id={_id}
    >
      <div>
        <h3 className="font-montzerrat text-base font-semibold">{name}</h3>
        <div className="relative">
          <div
            className={
              "absolute top-0 right-0 m-1 aspect-square w-10 rounded-full shadow-sm flex justify-center items-center cursor-pointer bg-background"
            }
            onClick={() => toggleWishlist(_id, isLiked)}
          >
            <Heart
              size={25}
              fill={isLiked ? "#D5006D" : "white"}
              stroke={isLiked ? "#D5006D" : "black"}
            />
            {/* Adjust size based on state */}
          </div>
          <Link to={`/shop/${_id}`}>
            <img
              src={imageUrl}
              alt={name}
              className="w-full aspect-square object-center border border-primary"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-3 justify-between">
        <p>${price}</p>
        <AddToCart id={_id} />
      </div>
    </article>
  )
}

export default ShopCards
