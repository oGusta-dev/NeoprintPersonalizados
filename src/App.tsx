import { useEffect, useState, type ReactNode } from "react"

const WHATSAPP_NUMBER = "" // TODO: adicione o número oficial com DDI + DDD antes de publicar.

const productViews = [
  {
    id: "frente",
    label: "Frente",
    src: "/assets/caneca-quero-cafe.png",
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
      "Um único modelo com duas estampas: “Quero Café! Ééé!” na frente e “Sem Café, Sem Condições” no verso.",
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
  const currentView =
    productViews.find((view) => view.id === activeView) ?? productViews[0]

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [])

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
            <a href="#modelos">Modelos</a>
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
              Modelos
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
            <p>O WhatsApp aguarda a configuração do número oficial.</p>
          )}
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span aria-hidden="true" />
                Seu café com personalidade
              </div>
              <h1 id="hero-title">
                Sua caneca, <span>do jeitinho que você imaginar.</span>
              </h1>
              <p>
                Conheça a caneca “Quero Café! Ééé!” e veja os dois lados desse
                modelo cheio de atitude.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#modelos">
                  Ver o modelo
                  <ArrowIcon />
                </a>
                <WhatsAppButton message="Olá! Quero conversar sobre uma caneca personalizada.">
                  Pedir personalizada
                </WhatsAppButton>
              </div>
              {!WHATSAPP_NUMBER && (
                <p className="config-note" id="whatsapp-status" role="status">
                  O WhatsApp aguarda a configuração do número oficial. Os botões
                  serão habilitados antes da publicação.
                </p>
              )}
            </div>

            <div className="product-stage" aria-label="Visualização da caneca">
              <div className="stage-label">
                <span>Modelo em destaque</span>
                <strong>01</strong>
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
                <span className="section-index">01 / MODELOS</span>
                <h2 id="catalog-title">Um modelo, dois lados.</h2>
              </div>
              <p>
                O catálogo começa com uma caneca para quem leva o café a sério.
              </p>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="card-visual">
                    <span className="available-tag">Modelo disponível</span>
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
                    <span className="product-number">MODELO 01</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="price-note">
                      Consulte preço e disponibilidade pelo WhatsApp.
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
                      Comprar pelo WhatsApp
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
                <span className="section-index">02 / PERSONALIZAÇÃO</span>
                <h2 id="custom-title">Sua ideia pode virar caneca.</h2>
                <p>
                  Quer uma caneca personalizada? Conte sua ideia para a Neoprint
                  e comece a conversa pelo WhatsApp.
                </p>
              </div>
              <WhatsAppButton
                className="button-primary custom-button"
                message="Olá! Quero conversar sobre uma caneca personalizada."
              >
                Iniciar conversa
              </WhatsAppButton>
            </div>

            <section
              className="how-order"
              id="como-pedir"
              aria-labelledby="how-order-title"
            >
              <div className="how-order-heading">
                <span className="section-index">03 / COMO PEDIR</span>
                <h2 id="how-order-title">Comece pela sua escolha.</h2>
              </div>
              <ol>
                <li>
                  <span>1</span>
                  <p>
                    Escolha o modelo pronto ou fale sobre uma personalização.
                  </p>
                </li>
                <li>
                  <span>2</span>
                  <p>
                    Inicie a conversa pelo WhatsApp para consultar preço e
                    disponibilidade.
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
            <a href="#modelos">Modelos</a>
            <a href="#personalizacao">Personalização</a>
            <a href="#como-pedir">Como pedir</a>
          </nav>
          <p>Canecas que falam por você.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
