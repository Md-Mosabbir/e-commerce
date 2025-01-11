import { FooterInfo } from "./FooterInfo"
import { FooterLinks } from "./FooterLinks"
import { SocialLinks } from "./SocialLinks"
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-6 rounded-3xl my-10 mx-1">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <SocialLinks />
          </div>
          <FooterLinks />
          <FooterInfo />
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-4">
            The Food and Drug Administration has not evaluated these statements.
            In the European Union, the intended use of our products does not
            fall within the scope or article 2 section 1 of 2017/45 MDR. Our
            products are not intended to diagnose, treat, cure, or prevent any
            disease.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
