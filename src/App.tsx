import { useEffect, useRef, useState, type ReactNode } from "react"

// Configure apenas com o número oficial, incluindo DDI e DDD, antes de publicar.
const WHATSAPP_NUMBER = ""
const WHATSAPP_SETUP_MESSAGE =
  "Número do WhatsApp ainda não configurado. O contato será ativado quando o número oficial com DDI e DDD for informado."

const productViews = [
  {
    id: "frente",
    label: "Frente",
    src: "/assets/caneca-quero-cafe.png"  ,
    webp: "/assets/caneca-quero-cafe.webp",
    width: 1157,
    height: 670,
    alt: "Frente da caneca com a estampa Quero Café! Ééé!",
  },
  {
    id: "verso",
    label: "Verso",
    src: "/assets/caneca-sem-cafe.png",
    webp: "/assets/caneca-sem-cafe.webp",
    width: 1126,
    height: 645,
    alt: "Verso da caneca com a estampa Sem Café, Sem Condições",
  },
] as const

const products = [
  {
    id: "quero-cafe",
    name: "Caneca “Quero Café! Ééé!”",
    description:
      "Um único modelo com duas vistas: “Quero Café! Ééé!” na frente e “Sem Café, Sem Condições” no verso.",
  },
] as const

function whatsappUrl(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "")
  return number
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : null
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.7-4.7A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.3 8.5c.5 3 2.2 4.7 5.2 5.2" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m12 3 1.2 4.1a5 5 0 0 0 3.4 3.4l4.4 1.3-4.4 1.3a5 5 0 0 0-3.4 3.4L12 21l-1.2-4.5a5 5 0 0 0-3.4-3.4L3 11.8l4.4-1.3a5 5 0 0 0 3.4-3.4L12 3Z" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {open ? (
        <path d="m6 6 12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

function WhatsAppButton({
  message,
  children,
  className = "",
}: {
  message: string
  children: ReactNode
  className?: string
}) {
  const url = whatsappUrl(message)

  if (!url) {
    return (
      <button
        className={`button button-disabled ${className}`}
        type="button"
        disabled
        aria-describedby="whatsapp-status"
        title="Configure o número oficial do WhatsApp antes de publicar"
      >
        <MessageIcon />
        {children}
      </button>
    )
  }

  return (
    <a
      className={`button ${className}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <MessageIcon />
      {children}
    </a>
  )
}

function App() {
  const [activeView, setActiveView] =
    useState<typeof productViews[number]["id"]>("frente")
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const currentView =
    productViews.find((view) => view.id === activeView) ?? productViews[0]

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="Neoprint Personalizados — início"
          >
            <img
              src="/assets/neo-print.png"
              alt="Neoprint Personalizados"
              width="804"
              height="804"
            />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#modelos">Modelo</a>
            <a href="#personalizacao">Personalização</a>
            <a href="#como-pedir">Como pedir</a>
          </nav>

          <WhatsAppButton
            className="button-small header-cta"
            message="Olá! Gostaria de falar com a Neoprint."
          >
            Falar no WhatsApp
          </WhatsAppButton>

          <button
            ref={menuToggleRef}
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <div
          className="mobile-navigation"
          id="mobile-navigation"
          hidden={!menuOpen}
        >
          <nav aria-label="Navegação móvel">
            <a href="#inicio" onClick={closeMenu}>
              Início
            </a>
            <a href="#modelos" onClick={closeMenu}>
              Modelo
            </a>
            <a href="#personalizacao" onClick={closeMenu}>
              Personalização
            </a>
            <a href="#como-pedir" onClick={closeMenu}>
              Como pedir
            </a>
          </nav>
          <WhatsAppButton
            className="button-small"
            message="Olá! Gostaria de falar com a Neoprint."
          >
            Falar no WhatsApp
          </WhatsAppButton>
          {!WHATSAPP_NUMBER && (
            <p>{WHATSAPP_SETUP_MESSAGE}</p>
          )}
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span aria-hidden="true" />
                Uma caneca, dois lados
              </div>
              <h1 id="hero-title">
                Um modelo, <span>duas atitudes.</span>
              </h1>
              <p>
                Conheça a caneca “Quero Café! Ééé!” e veja a estampa da frente e
                a do verso.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#modelos">
                  Ver as duas vistas
                  <ArrowIcon />
                </a>
                <WhatsAppButton message="Olá! Tenho interesse na caneca Quero Café! Ééé! Gostaria de consultar preço e disponibilidade.">
                  Falar sobre o modelo
                </WhatsAppButton>
              </div>
              {!WHATSAPP_NUMBER && (
                <p className="config-note" id="whatsapp-status" role="status">
                  {WHATSAPP_SETUP_MESSAGE}
                </p>
              )}
            </div>

            <div
              className="product-stage"
              role="group"
              aria-label="Visualização da caneca"
            >
              <div className="stage-label">
                <span>Frente e verso</span>
              </div>
              <div className="product-light" aria-hidden="true" />
              <div className="product-image-wrap">
                <picture key={currentView.id}>
                  <source srcSet={currentView.webp} type="image/webp" />
                  <img
                    className="hero-product-image"
                    src={currentView.src}
                    alt={currentView.alt}
                    width={currentView.width}
                    height={currentView.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="contact-shadow" aria-hidden="true" />

              <div
                className="view-switcher"
                aria-label="Escolha a vista do produto"
              >
                <span className="view-label">Visualizar</span>
                <div
                  className="view-options"
                  role="group"
                  aria-label="Vista da caneca"
                >
                  {productViews.map((view) => {
                    const selected = view.id === activeView
                    return (
                      <button
                        key={view.id}
                        type="button"
                        className={
                          selected ? "view-option active" : "view-option"
                        }
                        aria-pressed={selected}
                        onClick={() => setActiveView(view.id)}
                      >
                        <span className="view-dot" aria-hidden="true" />
                        {view.label}
                        {selected && (
                          <span className="sr-only">(selecionada)</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="catalog section"
          id="modelos"
          aria-labelledby="catalog-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-index">Catálogo</span>
                <h2 id="catalog-title">Um modelo, dois lados.</h2>
              </div>
              <p>
                Veja a frente e o verso da única caneca deste catálogo.
              </p>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="card-visual">
                    <span className="catalog-fact">Um modelo, duas vistas</span>
                    <picture className="card-product-picture">
                      <source srcSet={currentView.webp} type="image/webp" />
                      <img
                        key={currentView.id}
                        src={currentView.src}
                        alt={currentView.alt}
                        width={currentView.width}
                        height={currentView.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <span className="card-shadow" aria-hidden="true" />
                  </div>
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price-note">
                      Preço e disponibilidade são informados pela Neoprint.
                    </p>
                    <div
                      className="view-summary"
                      role="group"
                      aria-label="Selecionar vista da caneca"
                    >
                      {productViews.map((view) => (
                        <button
                          key={view.id}
                          type="button"
                          className={view.id === activeView ? "active" : ""}
                          aria-pressed={view.id === activeView}
                          onClick={() => setActiveView(view.id)}
                        >
                          <picture>
                            <source srcSet={view.webp} type="image/webp" />
                            <img
                              src={view.src}
                              alt=""
                              width={view.width}
                              height={view.height}
                              loading="lazy"
                              decoding="async"
                            />
                          </picture>
                          <span>{view.label}</span>
                        </button>
                      ))}
                    </div>
                    <WhatsAppButton
                      className="button-primary card-button"
                      message={`Olá! Tenho interesse no modelo ${product.name}.`}
                    >
                      Consultar este modelo
                    </WhatsAppButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="customization section"
          id="personalizacao"
          aria-labelledby="custom-title"
        >
          <div className="container">
            <div className="custom-panel">
              <div className="custom-icon">
                <SparkIcon />
              </div>
              <div className="custom-copy">
                <span className="section-index">Personalização</span>
                <h2 id="custom-title">Tem outra ideia em mente?</h2>
                <p>
                  Conte sua ideia à Neoprint e consulte as possibilidades de
                  personalização pelo atendimento.
                </p>
              </div>
              <WhatsAppButton
                className="button-primary custom-button"
                message="Olá! Quero consultar as possibilidades de personalização de uma caneca."
              >
                Perguntar sobre personalização
              </WhatsAppButton>
            </div>

            <section
              className="how-order"
              id="como-pedir"
              aria-labelledby="how-order-title"
            >
              <div className="how-order-heading">
                <span className="section-index">Atendimento</span>
                <h2 id="how-order-title">Consulte antes de decidir.</h2>
              </div>
              <ol>
                <li>
                  <span>1</span>
                  <p>
                    Veja as duas vistas da caneca ou conte sua ideia.
                  </p>
                </li>
                <li>
                  <span>2</span>
                  <p>
                    Consulte valores, disponibilidade e possibilidades com a
                    Neoprint.
                  </p>
                </li>
              </ol>
            </section>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a
            className="footer-brand"
            href="#inicio"
            aria-label="Voltar ao início"
          >
            <img
              src="/assets/neo-print.png"
              alt="Neoprint Personalizados"
              width="804"
              height="804"
              loading="lazy"
              decoding="async"
            />
          </a>
          <nav aria-label="Navegação do rodapé">
            <a href="#inicio">Início</a>
            <a href="#modelos">Modelo</a>
            <a href="#personalizacao">Personalização</a>
            <a href="#como-pedir">Como pedir</a>
          </nav>
          <p>Frente e verso no mesmo modelo.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
