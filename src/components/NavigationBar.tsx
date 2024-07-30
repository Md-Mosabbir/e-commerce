import { Menu } from "lucide-react"
import Container from "./Container"
import Logo from "/Logo.svg"

import search from "/search.svg"
import { Link } from "react-router-dom"
import { SideMenu } from "./SideMenu"
import { useState } from "react"
import Cart from "./Cart"

const NavigationBar = () => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <header>
      <Container className="w-full grid grid-cols-3 items-center mx-auto  border-b">
        <div>
          <button
            onClick={() => {
              setIsVisible(true)
            }}
          >
            <Menu size={40} />
          </button>
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
      </Container>
      <SideMenu isVisible={isVisible} setVisible={setIsVisible} />
    </header>
  )
}

export default NavigationBar
