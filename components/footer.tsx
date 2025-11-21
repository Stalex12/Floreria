"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { useStoreConfig } from "@/hooks/use-store-config"

export function Footer() {
  const { config } = useStoreConfig()
  const currentYear = new Date().getFullYear()
  
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Lógica de WhatsApp ---
  const cleanPhone = config.phone ? config.phone.replace(/\D/g, "") : ""
  const message = encodeURIComponent("Hola, quisiera consultar el catálogo")
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`

  // --- Lógica de Email ---
  const mailtoUrl = `mailto:${config.email}`

  // --- Lógica de Google Maps ---
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address || "")}`

  // Si no está montado, no mostramos nada para evitar el "falso" dato del servidor
  if (!isMounted) {
    return (
      <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
             {/* Un esqueleto simple de carga mientras llega la data real */}
             <div className="h-8 bg-slate-800 rounded w-1/4 mb-8"></div>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
                <div className="h-32 bg-slate-800 rounded"></div>
             </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-purple-300">
              {config.storeName || "Florería"}
            </h3>
            <p className="text-sm text-gray-400">Arreglos florales personalizados para cada ocasión especial.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300">
              Contacto
            </h4>
            <div className="space-y-3">
              
              {/* TELÉFONO / WHATSAPP */}
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-purple-400" />
                <a 
                  href={whatsappUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                  title="Enviar mensaje por WhatsApp"
                >
                  {config.phone}
                </a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-purple-400" />
                <a 
                   href={mailtoUrl}
                   className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {config.email}
                </a>
              </div>

              {/* DIRECCIÓN (GOOGLE MAPS) */}
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-purple-400 mt-1 flex-shrink-0" />
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors text-left"
                  title="Ver ubicación en Google Maps"
                >
                  {config.address}
                </a>
              </div>

            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-300">
              Síguenos
            </h4>
            <div className="flex space-x-4">
              {config.socialMedia?.facebook && (
                <Link
                  href={config.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </Link>
              )}
              
              {config.socialMedia?.instagram && (
                <Link
                  href={config.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
              )}
              
              {config.socialMedia?.twitter && (
                <Link
                  href={config.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
              )}
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-sm text-purple-300">Horario</h5>
              <div className="text-xs text-gray-400 space-y-1">
                <div>
                  <p>Lun-Vie: {config.businessHours?.monday || "Cerrado"}</p>
                  <p>Sábado: {config.businessHours?.saturday || "Cerrado"}</p>
                  <p>Domingo: {config.businessHours?.sunday || "Cerrado"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {config.storeName || "Florería"}. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}