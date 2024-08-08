import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet"
import { Link } from "react-router-dom"

import { MenuSquare } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"

export const SideMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <MenuSquare size={50} />
        </button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="bg-textColour text-background w-full border-none"
      >
        <SheetHeader>
          <SheetTitle className=" text-background">
            <Avatar className="border-2 w-16 h-16">
              <SheetClose asChild>
                <Link to="/profile">
                  {/* TODO: Replace with your own avatar*/}
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    loading="lazy"
                  />
                  <AvatarFallback></AvatarFallback>
                </Link>
              </SheetClose>
            </Avatar>
          </SheetTitle>
          <SheetDescription className="text-left font-montzerrat text-background text-base">
            Click to visit your profile
          </SheetDescription>
        </SheetHeader>

        <nav className=" flex items-center h-full">
          <ul className=" flex flex-col gap-16 font-cinzel text-background">
            <li>
              <SheetClose asChild>
                <Link to="/" className="text-5xl">
                  Home
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/shop" className="text-5xl">
                  Shop
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/about" className="text-5xl">
                  About
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link to="/contact" className="text-5xl">
                  Contact
                </Link>
              </SheetClose>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
