import { Link } from "react-router-dom"
import Container from "../components/Container"

const ErrorPage = () => {
  return (
    <Container className="flex justify-center items-center font-montzerrat h-screen flex-col gap-5 -mt-12">
      <h1 className="font-bold text-5xl">Error 404</h1>
      <p className="w-[60%] text-center font-cinzel text-lg">
        Oops! Maybe you are lost so, let me help you to get back home ;)
      </p>
      <Link to={"/"}>
        {" "}
        <button className="bg-black text-background w-32 h-14 rounded-2xl">
          Back to Home
        </button>{" "}
      </Link>
    </Container>
  )
}

export default ErrorPage
