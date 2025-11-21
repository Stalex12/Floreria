import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      <Navbar />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-serif font-bold text-[var(--azul-profundo)] mb-12">Política de Privacidad</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">1. Introducción</h2>
            <p>
              En Florería, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política
              de privacidad explica cómo recopilamos, utilizamos y protegemos tu información.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">2. Información que Recopilamos</h2>
            <p>
              Recopilamos información que nos proporciona voluntariamente, como tu nombre, dirección de correo
              electrónico, número de teléfono y dirección de envío cuando realizas una compra o te registras en nuestro
              sitio.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">3. Uso de Información</h2>
            <p>
              Utilizamos tu información para procesar pedidos, enviar confirmaciones de compra, responder a consultas y
              mejorar nuestros servicios.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">4. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad para proteger tu información personal contra acceso, alteración,
              divulgación o destrucción no autorizados.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">5. Cookies</h2>
            <p>
              Nuestro sitio utiliza cookies para mejorar tu experiencia de navegación. Puedes controlar las cookies a
              través de la configuración de tu navegador.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">6. Derechos del Usuario</h2>
            <p>
              Tienes derecho a acceder, corregir o eliminar tu información personal. Contáctanos en info@floreria.com
              para ejercer estos derechos.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[var(--rosa)] mb-3">7. Cambios en esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos
              sobre cambios significativos por correo electrónico.
            </p>
          </div>

          <div className="bg-[var(--gris-claro)] p-6 rounded-lg mt-8">
            <p className="text-sm">
              Última actualización: Noviembre 2024. Si tienes preguntas sobre esta política, contáctanos en
              info@floreria.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
