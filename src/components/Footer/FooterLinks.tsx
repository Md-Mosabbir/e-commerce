import React from "react"
import { Link } from "react-router-dom"

type LinkItem = {
  href: string
  label: string
  external?: boolean
}

const links: LinkItem[] = [
  { href: "/technology", label: "Technology" },
  { href: "/company", label: "Company" },
  { href: "/shop", label: "Shop" },
  { href: "/commercial", label: "Commercial" },
  { href: "/blog", label: "Blog" },
  { href: "/get-in-touch", label: "Contact" },
  { href: "/shipping-delivery", label: "Shipping & Delivery" },
  { href: "/privacy-policy/cookie-policy-eu", label: "Privacy Policy" },
  { href: "/revocation", label: "Revocation" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/imprint", label: "Imprint" },
  {
    href: "https://www.notion.so/luminouslabsgmbh/Press-kit-6b7bad337ee8446c86520f699e945887?pvs=4",
    label: "Press kit",
    external: true,
  },
]

export const FooterLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link) => (
        <FooterLink key={link.href} {...link} />
      ))}
    </div>
  )
}

type FooterLinkProps = {
  href: string
  label: string
  external?: boolean
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label, external }) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm hover:underline"
      >
        {label}
      </a>
    )
  }

  return (
    <Link to={href} className="text-sm hover:underline">
      {label}
    </Link>
  )
}
