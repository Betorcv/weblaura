'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import Gallery from '@/components/Gallery'

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpEmail, setRsvpEmail] = useState('')
  const [rsvpPartner, setRsvpPartner] = useState('')
  const [rsvpAttending, setRsvpAttending] = useState('yes')
  const [rsvpLoading, setRsvpLoading] = useState(false)
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false)
  const [rsvpError, setRsvpError] = useState('')

  // Fecha de la boda: 12 de diciembre de 2026
  const weddingDate = new Date('2026-12-12T18:00:00').getTime()

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault()
    setRsvpLoading(true)
    setRsvpError('')

    try {
      // URL del Google Apps Script - funciona tanto en local como en producción
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbyGkinQi77bMdTRtD8UDpiEQjTznV24YVvrjOLqDwuCuF7HDTvFhgOyIqy1EGuG5ijE/exec'

      if (!scriptUrl) {
        throw new Error('Google Script URL no configurada')
      }

      const payload = {
        nombre: rsvpName,
        email: rsvpEmail,
        pareja: rsvpPartner,
        asistencia: rsvpAttending,
        fecha: new Date().toISOString()
      }

      console.log('Enviando datos a:', scriptUrl)
      console.log('Payload:', payload)

      // Enviar petición POST a Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requiere no-cors para peticiones desde navegador
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('Petición enviada (no-cors, no podemos ver la respuesta)')

      // Como usamos no-cors, no podemos verificar la respuesta
      // Pero la petición debería haberse enviado correctamente
      setRsvpSubmitted(true)
      setRsvpName('')
      setRsvpEmail('')
      setRsvpPartner('')
      setRsvpAttending('yes')

      setTimeout(() => {
        setRsvpSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setRsvpError('Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo o contáctanos directamente.')
    } finally {
      setRsvpLoading(false)
    }
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.names}>
            <h1 className={styles.heroName}>Carlos</h1>
            <span className={styles.ampersand}>&</span>
            <h1 className={styles.heroName}>Laura</h1>
          </div>
          <p className={styles.heroDate}>12 de Diciembre, 2026</p>
          <p className={styles.heroSubtitle}>Nos casamos y queremos compartir este día especial contigo</p>
        </div>
        <div className={styles.heroDecoration}></div>
      </section>

      {/* Countdown */}
      <section className={styles.countdownSection}>
        <h2 className={styles.sectionTitle}>Faltan</h2>
        <div className={styles.countdown}>
          <div className={styles.countdownItem}>
            <span className={styles.countdownNumber}>{countdown.days}</span>
            <span className={styles.countdownLabel}>Días</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownNumber}>{countdown.hours}</span>
            <span className={styles.countdownLabel}>Horas</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownNumber}>{countdown.minutes}</span>
            <span className={styles.countdownLabel}>Minutos</span>
          </div>
          <div className={styles.countdownItem}>
            <span className={styles.countdownNumber}>{countdown.seconds}</span>
            <span className={styles.countdownLabel}>Segundos</span>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestra Historia</h2>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <p>
                A veces, las mejores historias comienzan donde menos se espera. La nuestra empezó
                cuando nuestros caminos se cruzaron de la manera más inesperada. Lo que al principio
                fueron charlas casuales pronto se convirtió en risas compartidas, planes en común
                y la certeza de que juntos todo era mejor.
              </p>
              <p>
                Desde entonces, hemos recorrido el mundo de la mano, disfrutando cada viaje, cada
                momento con nuestra familia y amigos, y cada pequeño instante del día a día.
                Después de años de risas, aventuras y momentos inolvidables juntos, decidimos dar
                el siguiente paso y unir nuestras vidas para siempre.
              </p>
              <p className={styles.storyQuote}>
                &ldquo;El mejor amor es el que despierta el alma y nos hace anhelar más,
                que enciende nuestro corazón y trae paz a nuestras mentes.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles del Evento */}
      <section className={styles.eventSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestra Boda</h2>
          <div className={styles.eventDetails}>
            <div className={styles.eventCard}>
              <div className={styles.eventIcon}>📅</div>
              <h3>Fecha</h3>
              <p>12 de Diciembre, 2026</p>
              <p className={styles.eventTime}>18:00 horas</p>
            </div>
            <div className={styles.eventCard}>
              <div className={styles.eventIcon}>📍</div>
              <h3>Lugar</h3>
              <p>Madrid, España</p>
              <p className={styles.eventAddress}>
                Próximamente compartiremos<br />
                la ubicación exacta
              </p>
            </div>
          </div>
          <div className={styles.eventDescription}>
            <p>
              Estamos preparando cada detalle para que sea un día único e inolvidable.
              Pronto compartiremos más información sobre el lugar y todos los detalles del evento.
            </p>
            <p className={styles.eventHighlight}>¡OS ESPERAMOS!</p>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Momentos</h2>
          <Gallery />
        </div>
      </section>

      {/* Luna de Miel */}
      <section className={styles.honeymoonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestra Luna de Miel</h2>
          <div className={styles.honeymoonContent}>
            <div className={styles.honeymoonText}>
              <p>
                Después de nuestro día especial, celebraremos nuestra luna de miel en un destino
                que llevamos tiempo soñando. Este viaje será el comienzo de nuestra nueva vida juntos
                y queremos que sea inolvidable.
              </p>
              <p className={styles.honeymoonHighlight}>
                El destino perfecto para nuestra luna de miel nos espera. ¿Nos ayudas a hacerlo realidad?
              </p>
              <p className={styles.honeymoonNote}>
                Para nosotros lo más importante es vuestra compañía, pero si queréis tener un detalle
                y colaborar con nuestro viaje, podéis hacerlo a través de esta cuenta:
              </p>
              <div className={styles.bankAccount}>
                <p className={styles.bankNumber}>ES30 2085 4891 8503 3341 4404</p>
                <button
                  className={styles.copyButton}
                  onClick={() => {
                    navigator.clipboard.writeText('ES30 2085 4891 8503 3341 4404')
                    const button = document.activeElement as HTMLButtonElement
                    if (button) {
                      const originalText = button.textContent
                      button.textContent = '✓ Copiado'
                      setTimeout(() => {
                        button.textContent = originalText
                      }, 2000)
                    }
                  }}
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmación de Asistencia */}
      <section className={styles.rsvpSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>¿Nos confirmas?</h2>
          <p className={styles.rsvpSubtitle}>
            Por favor, confirma tu asistencia antes del 1 de Diciembre de 2026
          </p>
          {rsvpSubmitted ? (
            <div className={styles.rsvpSuccess}>
              <p>¡Gracias por confirmar! Te esperamos en nuestro día especial ❤️</p>
            </div>
          ) : (
            <form className={styles.rsvpForm} onSubmit={handleRSVP}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre completo *</label>
                <input
                  type="text"
                  id="name"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  required
                  placeholder="Tu nombre"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electrónico *</label>
                <input
                  type="email"
                  id="email"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="partner">Nombre de tu pareja/acompañante</label>
                <input
                  type="text"
                  id="partner"
                  value={rsvpPartner}
                  onChange={(e) => setRsvpPartner(e.target.value)}
                  placeholder="Opcional"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="attending">¿Asistirás a la boda? *</label>
                <select
                  id="attending"
                  value={rsvpAttending}
                  onChange={(e) => setRsvpAttending(e.target.value)}
                  required
                >
                  <option value="yes">Sí, asistiré</option>
                  <option value="no">No podré asistir</option>
                </select>
              </div>
              {rsvpError && (
                <div className={styles.rsvpError}>
                  <p>{rsvpError}</p>
                </div>
              )}
              <button
                type="submit"
                className={styles.rsvpButton}
                disabled={rsvpLoading}
              >
                {rsvpLoading ? 'Enviando...' : 'Confirmar Asistencia'}
              </button>
              <p className={styles.rsvpNote}>
                Si tienes alguna duda, puedes contactarnos por teléfono o WhatsApp
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Con amor, Carlos & Laura</p>
          <p className={styles.footerDate}>12 de Diciembre, 2026</p>
        </div>
      </footer>
    </main>
  )
}
