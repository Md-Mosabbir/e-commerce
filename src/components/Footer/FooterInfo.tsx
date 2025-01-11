import { Clock, Globe, Package } from "lucide-react"

const infoItems = [
  {
    icon: <Globe className="w-6 h-6" />,
    text: "Designing with love by lighting experts in Austria, Europe",
  },
  {
    icon: <Package className="w-6 h-6" />,
    text: "100-day money-back guarantee",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    text: "Global express shipping",
  },
]

export const FooterInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {item.icon}
          <span className="text-sm">{item.text}</span>
        </div>
      ))}
    </div>
  )
}
