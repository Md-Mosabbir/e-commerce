const Navigation = () => {
  return (
    <header className="w-1/2  rounded-full px-8 py-4 border border-background-950">
      <nav className=" w-full h-10">
        <ul className="flex font-normal justify-between h-full items-center text-background-950 ">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
