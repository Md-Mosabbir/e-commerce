import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      <SocialLink
        href="https://www.instagram.com/luminousred.light"
        icon={<Instagram size={40} />}
      />
      <SocialLink
        href="https://www.linkedin.com/company/luminousred/"
        icon={<Linkedin size={40} />}
      />
      <SocialLink
        href="https://www.facebook.com/luminousred.light"
        icon={<Facebook size={40} />}
      />
      <SocialLink
        href="https://www.youtube.com/channel/UCiMeGvnq_xRFsNqYj7dd05Q"
        icon={<Youtube size={40} />}
      />
    </div>
  )
}
const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({
  href,
  icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-gray-300 transition-colors bg-zinc-800 p-5 rounded-lg"
  >
    {icon}
  </a>
)
