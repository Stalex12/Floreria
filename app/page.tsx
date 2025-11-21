"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { supabase } from "@/lib/supabase"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

// Define the product interface based on Supabase schema
interface HomePageProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image_urls: string[];
  category: string;
  stock: number;
  featured: boolean;
  created_at?: string;
}

export default function Home() {
  const [products, setProducts] = useState<HomePageProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      setErrorProducts(null);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        setErrorProducts(error.message);
        setProducts([]);
      } else {
        setProducts(data as HomePageProduct[]);
      }
      setIsLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
            {/* Main Heading */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-tight">
              <span className="block drop-shadow-2xl">Mundo Eterno</span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 font-light max-w-3xl mx-auto drop-shadow-lg">
              Regalos que perduran
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/products"
                className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10">Explorar Colección</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/about"
                className="group px-10 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-2xl"
              >
                Nuestra Historia
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/70 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block">
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider bg-purple-50 px-4 py-2 rounded-full">
                Destacados
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900">
              Nuestras Flores Más Especiales
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección exclusiva de arreglos florales, cuidadosamente diseñados para cada ocasión especial
            </p>
          </div>

          {/* Products Grid */}
          {isLoadingProducts ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-center space-y-4">
                <Spinner className="size-12 mx-auto text-purple-600" />
                <p className="text-gray-500 text-lg">Cargando productos destacados...</p>
              </div>
            </div>
          ) : errorProducts ? (
            <div className="flex justify-center items-center h-96">
              <Alert variant="destructive" className="max-w-lg">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <AlertTitle className="text-lg font-semibold">Error al cargar productos</AlertTitle>
                <AlertDescription className="text-base">{errorProducts}</AlertDescription>
              </Alert>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🌸</div>
              <p className="text-gray-500 text-xl">No hay productos destacados disponibles en este momento.</p>
              <Link href="/products" className="inline-block mt-6 text-purple-600 hover:text-purple-700 font-semibold">
                Ver todos los productos →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image_urls[0] || "/placeholder.svg"}
                      description={product.description}
                      category={product.category}
                    />
                  </div>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                >
                  Ver Toda la Colección
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              ¿Por Qué Elegirnos?
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Comprometidos con la excelencia en cada detalle
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-4xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                🌸
              </div>
              <h3 className="text-2xl font-serif font-bold text-purple-300">
                Flores Naturales o Sinteticas
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Seleccionamos las mejores flores sean naturales o sinteticas para garantizar calidad
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-4xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                ✨
              </div>
              <h3 className="text-2xl font-serif font-bold text-purple-300">
                Diseño Personalizado
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Creamos arreglos únicos adaptados a tus necesidades, gustos y la ocasión especial que celebras
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 text-4xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                🚚
              </div>
              <h3 className="text-2xl font-serif font-bold text-purple-300">
                Entrega Rápida
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Servicio de entrega dentro de 24 horas para que tu arreglo llegue en buen estado y a tiempo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900">
            ¿Listo para Sorprender?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección completa y encuentra el arreglo perfecto para esa persona especial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/products"
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
            >
              Ver Todos los Productos
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white text-purple-600 text-lg font-semibold rounded-full border-2 border-purple-600 transition-all duration-300 hover:bg-purple-600 hover:text-white hover:scale-105"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}
