import NavigationBar from "../components/Navigation/NavigationBar"
import { Outlet } from "react-router-dom"
import Container from "../components/Container"
import Footer from "../components/Footer/Footer"

const Root = () => {
  return (
    <>
      <NavigationBar />

      <main className="min-h-screen mb-10">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default Root
