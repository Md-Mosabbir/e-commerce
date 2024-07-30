import { Link } from "react-router-dom"
import Container from "./Container"
import { LucideX } from "lucide-react"

type SideMenuProps = {
  isVisible: boolean
  setVisible: (isVisible: boolean) => void
}

export const SideMenu = ({ isVisible, setVisible }: SideMenuProps) => {
  return (
    isVisible && (
      <Container className="fixed w-full top-0 h-screen bg-textColour z-50">
        <nav className=" flex items-center h-full">
          <LucideX
            size={60}
            className="text-background absolute right-0 top-0 mx-4 my-4"
            onClick={() => setVisible(false)}
          />
          <ul className=" flex flex-col gap-16 font-cinzel text-background">
            <li>
              <Link
                to="/"
                className="text-5xl"
                onClick={() => setVisible(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="text-5xl"
                onClick={() => setVisible(false)}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-5xl"
                onClick={() => setVisible(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-5xl"
                onClick={() => setVisible(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    )
  )
}
