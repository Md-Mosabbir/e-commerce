import Logo from "/Logo.svg"

import search from "/search.svg"
import { Link } from "react-router-dom"
import { SideMenu } from "./SideMenu"

import Cart from "../Cart"

const NavigationBar = () => {
  return (
    <header className="flex justify-center border-b">
      <div className="w-full grid grid-cols-3 items-center  mx-3 px-5 md:mx-16 lg:mx-32">
        <div>
          <SideMenu />
        </div>
        <div className="justify-self-center">
          <Link to="/">
            <img src={Logo} alt="The logo" className="w-24 aspect-square" />
          </Link>
        </div>
        <div className="flex gap-4 justify-self-end">
          <Cart />
          <img src={search} alt="The search" className="w-8 aspect-square" />
        </div>
      </div>
    </header>
  )
}

export default NavigationBar
