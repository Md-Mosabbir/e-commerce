import Container from "./Container"
import X from "/X.svg"
import Insta from "/Insta.svg"
import Linkedin from "/LinkedIn.svg"

const Footer = () => {
  return (
    <footer className="border -mx-5">
      <Container className="w-full py-2 mb-10 font-montzerrat">
        <div className="flex flex-col gap-3">
          <p className="font-semibold  text-2xl">Connect with us</p>

          <div className="flex gap-3">
            <a href="https://twitter.com" className="text-accent">
              <img src={X} alt="X logo" />
            </a>
            <a href="https://facebook.com" className="text-accent">
              <img src={Insta} alt="Instagram logo" />
            </a>
            <a href="https://linkedin.com" className="text-accent">
              <img src={Linkedin} alt="Linkedin logo" />
            </a>
          </div>

          <div className="flex flex-col  gap-3 mt-3">
            <p className="font-bold text-lg">Our Tests</p>
            <p>Our purity</p>
            <p>Certificates</p>
            <p>Certificates</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
