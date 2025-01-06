import { Link } from "react-router-dom"
import AddToCart from "./AddToCart"
import { ShopItemType } from "../../types/ProductType"
import { Heart } from "lucide-react"
import { useWishlist } from "../../hooks/useWishlist"

const ShopCards = ({ _id, name, price, imageUrl }: ShopItemType) => {
  const { wishlist, toggleWishlist } = useWishlist()

  const isLiked =
    wishlist?.data?.wishlist?.some(
      (item: { _id: string }) => item._id === _id,
    ) || false

  return (
    <article
      className="flex flex-col justify-between gap-4 w-[85%] h-full mx-auto "
      id={_id}
    >
      <div>
        <h3 className="font-montserrat  text-lg font-semibold text-gray-800 truncate ">
          {name}
        </h3>
        <div className="relative mt-2">
          <div
            className="absolute top-2 right-2 aspect-square w-10 rounded-full  flex justify-center items-center cursor-pointer bg-white"
            onClick={() => toggleWishlist(_id, isLiked)}
          >
            <Heart
              size={25}
              fill={isLiked ? "#D5006D" : "white"}
              stroke={isLiked ? "#D5006D" : "black"}
            />
          </div>
          <Link to={`/shop/${_id}`}>
            <img
              src={imageUrl}
              alt={name}
              className="w-full aspect-square  object-cover border border-gray-200 "
              loading="lazy"
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 mt-2">
        <p className="text-xl font-medium text-gray-800">${price}</p>
        <AddToCart id={_id} />
      </div>
    </article>
  )
}

export default ShopCards
