import NavigationBar from "../components/Navigation/NavigationBar"
import { Outlet } from "react-router-dom"
import Container from "../components/Container"

const Root = () => {
  return (
    <>
      <NavigationBar />

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}

export default Root
