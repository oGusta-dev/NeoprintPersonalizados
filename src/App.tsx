import { useEffect, useRef, useState, type ReactNode } from "react"

// Número temporário informado para testes; substituir pelo contato oficial antes de publicar.

const WHATSAPP_NUMBER = "5591984932957"

const WHATSAPP_SETUP_MESSAGE =
  "WhatsApp não configurado: falta informar o número oficial com DDI e DDD."

const formatBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

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

    // Preço ainda não informado; manter como null evita inventar valores.
    unitPrice: null as number | null,
  },
] as const

const customizationExamples = [
  {
    id: "batman-front",
    src: "/assets/personalizados/batman-frente.jpg",
    alt: "Caneca personalizada com ilustração do Batman e tema de café.",
  },
  {
    id: "love-front",
    src: "/assets/personalizados/com-amor-frente.jpg",
    alt: "Caneca personalizada com ilustração romântica e a frase Com amor, com você para sempre.",
  },
  {
    id: "ieccap-front",
    src: "/assets/personalizados/ieccap-frente-branca.jpg",
    alt: "Caneca branca personalizada com a identidade visual IECCAP.",
  },
  {
    id: "ieccap-back",
    src: "/assets/personalizados/ieccap-costas-branca.jpg",
    alt: "Vista da outra face da caneca IECCAP com uma mensagem institucional.",
  },
  {
    id: "neoprint",
    src: "/assets/personalizados/neoprint.jpg",
    alt: "Caneca personalizada com a marca Neoprint.",
  },
  {
    id: "coffee-front",
    src: "/assets/personalizados/quero-cafe-frente.jpg",
    alt: "Caneca personalizada com uma estampa sobre café.",
  },
  {
    id: "coffee-back",
    src: "/assets/personalizados/quero-cafe-costas.jpg",
    alt: "Outra vista da caneca personalizada com a frase Sem café, sem condições.",
  },
  {
    id: "batman-back",
    src: "/assets/personalizados/batman-costas.jpg",
    alt: "Outra vista da caneca personalizada com tema Batman e café.",
  },
  {
    id: "love-back",
    src: "/assets/personalizados/com-amor-costas.jpg",
    alt: "Outra vista da caneca personalizada com tema romântico.",
  },
] as const

const customizationRows = [
  {
    id: "first",
    reverse: false,
    hidden: false,
    images: customizationExamples,
  },
  {
    id: "second",
    reverse: true,
    hidden: true,
    images: [...customizationExamples].reverse(),
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

function WhatsAppIcon() {
  return (
    <svg className="whatsapp-icon" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.148-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479s1.064 2.875 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.87 9.87 0 0 1-1.51-5.26c.003-5.45 4.436-9.884 9.893-9.884 2.64 0 5.122 1.03 6.994 2.904a9.83 9.83 0 0 1 2.898 6.997c-.003 5.45-4.437 9.875-9.902 9.875m8.413-18.287A11.815 11.815 0 0 0 12.05 5.1C5.495 5.1.16 10.435.16 16.14c0 1.986.52 3.924 1.51 5.633L.062 24l6.393-1.677a12.023 12.023 0 0 0 5.587 1.422h.005c6.62 0 12.02-5.397 12.023-12.018a11.92 11.92 0 0 0-3.506-8.229Z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 4h2l2.2 11.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 9H6" />
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m9 5 7 7-7 7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m6 6 12 12M18 6 6 18" />
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
        <WhatsAppIcon />
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
      <WhatsAppIcon />
      {children}
    </a>
  )
}

function App() {
  const [activeView, setActiveView] =
    useState<typeof productViews[number]["id"]>("frente")

  const [menuOpen, setMenuOpen] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)

  const [cartNotice, setCartNotice] = useState("")

  const [cartItems, setCartItems] = useState<Record<string, number>>({})

  const [headerScrolled, setHeaderScrolled] = useState(false)

  const headerRef = useRef<HTMLElement>(null)

  const heroRef = useRef<HTMLElement>(null)

  const heroCopyRef = useRef<HTMLDivElement>(null)

  const menuToggleRef = useRef<HTMLButtonElement>(null)

  const cartTriggerRef = useRef<HTMLButtonElement>(null)

  const cartDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    let previousValue: boolean | null = null

    const updateHeaderSurface = () => {
      const header = headerRef.current
      const hero = heroRef.current
      const heroCopy = heroCopyRef.current

      if (!header || !hero || !heroCopy) return

      const lightAreaBottom = window.matchMedia("(max-width: 960px)").matches
        ? heroCopy.getBoundingClientRect().bottom
        : hero.getBoundingClientRect().bottom
      const nextValue = lightAreaBottom <= header.offsetHeight

      if (nextValue !== previousValue) {
        previousValue = nextValue
        setHeaderScrolled(nextValue)
      }
    }

    updateHeaderSurface()
    window.addEventListener("scroll", updateHeaderSurface, { passive: true })
    window.addEventListener("resize", updateHeaderSurface)

    return () => {
      window.removeEventListener("scroll", updateHeaderSurface)
      window.removeEventListener("resize", updateHeaderSurface)
    }
  }, [])

  const currentView =
    productViews.find((view) => view.id === activeView) ?? productViews[0]

  const cartProducts = products.flatMap((product) => {
    const quantity = cartItems[product.id] ?? 0

    return quantity > 0 ? [{ ...product, quantity }] : []
  })

  const cartCount = cartProducts.reduce(
    (count, product) => count + product.quantity,

    0,
  )

  const orderTotal = cartProducts.some((product) => product.unitPrice === null)
    ? null
    : cartProducts.reduce(
        (total, product) => total + (product.unitPrice ?? 0) * product.quantity,

        0,
      )

  const formatPrice = (price: number | null) =>
    price === null ? "A confirmar" : formatBRL.format(price)

  const orderMessage = [
    "🧾 PEDIDO",

    "",

    "📝 ITENS:",

    ...cartProducts.flatMap((product) => [
      `• ${product.name}`,
      `  Quantidade: ${product.quantity}`,
      `  Valor unitário: ${formatPrice(product.unitPrice)}`,
      `  Subtotal: ${formatPrice(
        product.unitPrice === null
          ? null
          : product.unitPrice * product.quantity,
      )}`,
      "",
    ]),

    `💰 TOTAL: ${formatPrice(orderTotal)}`,

    "",

    "Aguardo a confirmação dos valores e dos detalhes do pedido.",
  ].join("\n")

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

  useEffect(() => {
    const dialog = cartDialogRef.current

    if (!dialog) return

    if (cartOpen && !dialog.open) dialog.showModal()

    if (!cartOpen && dialog.open) dialog.close()
  }, [cartOpen])

  const closeMenu = () => setMenuOpen(false)

  const addToCart = (productId: string, productName: string) => {
    setCartItems((items) => ({
      ...items,

      [productId]: (items[productId] ?? 0) + 1,
    }))

    setCartNotice(`${productName} adicionado ao carrinho.`)
  }

  const updateQuantity = (productId: string, change: number) => {
    setCartItems((items) => {
      const nextQuantity = (items[productId] ?? 0) + change

      if (nextQuantity <= 0) return items

      return { ...items, [productId]: nextQuantity }
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((items) => {
      const remainingItems = { ...items }

      delete remainingItems[productId]

      return remainingItems
    })
  }

  const closeCart = () => setCartOpen(false)

  const orderUrl = cartCount > 0 ? whatsappUrl(orderMessage) : null

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <header
        ref={headerRef}
        className={`site-header${headerScrolled ? " site-header--scrolled" : ""}`}
      >
        <div className="container header-inner">
          <a
            className="brand"
            href="#inicio"
            aria-label="Neoprint Personalizados — início"
          >
            <img
              src="/assets/logo-neoprint-sem-fundo.svg"
              alt="Neoprint Personalizados"
              width="1220"
              height="1552"
            />
          </a>

          <nav className="main-nav" aria-label="Navegação principal">
            <a href="#inicio">Início</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#personalizacao">Personalização</a>
          </nav>

          <button
            ref={cartTriggerRef}
            className="header-cart-trigger"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={cartOpen}
            aria-controls="cart-dialog"
            aria-label={`Abrir carrinho: ${cartCount} ${
              cartCount === 1 ? "item" : "itens"
            }`}
            onClick={() => setCartOpen(true)}
          >
            <CartIcon />
            <span className="cart-trigger-label">Carrinho</span>
            <span className="cart-count" aria-hidden="true">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </button>

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
            <a href="#catalogo" onClick={closeMenu}>
              Catálogo
            </a>
            <a href="#personalizacao" onClick={closeMenu}>
              Personalização
            </a>
          </nav>
        </div>
      </header>

      <dialog
        ref={cartDialogRef}
        id="cart-dialog"
        className="cart-dialog"
        aria-labelledby="cart-title"
        onCancel={(event) => {
          event.preventDefault()

          closeCart()
        }}
        onClose={() => setCartOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeCart()
        }}
      >
        <div className="cart-panel">
          <div className="cart-header">
            <div>
              <span className="section-index">Seu pedido</span>
              <h2 id="cart-title">Carrinho</h2>
            </div>
            <button
              className="cart-close"
              type="button"
              aria-label="Fechar carrinho"
              onClick={closeCart}
            >
              <CloseIcon />
            </button>
          </div>

          {cartProducts.length === 0 ? (
            <div className="cart-empty">
              <CartIcon />
              <h3>Seu carrinho está vazio.</h3>
              <p>Adicione a caneca ao pedido para organizar os itens aqui.</p>
              <a
                className="button button-primary"
                href="#catalogo"
                onClick={closeCart}
              >
                Ver a caneca
              </a>
            </div>
          ) : (
            <>
              <ul className="cart-items">
                {cartProducts.map((product) => (
                  <li className="cart-item" key={product.id}>
                    <img
                      src={productViews[0].src}
                      alt=""
                      width="96"
                      height="56"
                    />
                    <div className="cart-item-main">
                      <h3>{product.name}</h3>
                      <div className="cart-item-controls">
                        <div
                          className="quantity-control"
                          role="group"
                          aria-label={`Quantidade de ${product.name}`}
                        >
                          <button
                            type="button"
                            aria-label={`Diminuir quantidade de ${product.name}`}
                            disabled={product.quantity <= 1}
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            −
                          </button>
                          <span aria-live="polite">{product.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar quantidade de ${product.name}`}
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="cart-remove"
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-footer">
                <p>
                  Este carrinho apenas organiza os itens; nenhuma compra é
                  concluída no site. Ao continuar, o WhatsApp abre com a
                  mensagem pronta para você revisar e enviar.
                </p>
                {orderUrl ? (
                  <a
                    className="button button-primary cart-checkout"
                    href={orderUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    Finalizar pedido no WhatsApp
                  </a>
                ) : (
                  <WhatsAppButton
                    className="button-primary cart-checkout"
                    message={orderMessage}
                  >
                    Finalizar pedido no WhatsApp
                  </WhatsAppButton>
                )}
                {!WHATSAPP_NUMBER && (
                  <p className="action-note" role="status">
                    {WHATSAPP_SETUP_MESSAGE}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>

      <p className="sr-only" role="status" aria-live="polite">
        {cartNotice}
      </p>

      <main id="conteudo">
        <section
          ref={heroRef}
          className="hero"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="container hero-grid">
            <div className="hero-copy" ref={heroCopyRef}>
              <div className="hero-eyebrow">
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
                <a className="button button-primary" href="#catalogo">
                  Ver o modelo
                  <ArrowIcon />
                </a>
                <WhatsAppButton
                  className="hero-contact-button"
                  message="Olá! Gostaria de conversar sobre uma caneca personalizada."
                >
                  Pedir personalizada
                </WhatsAppButton>
              </div>
              <p className="hero-note">
                O WhatsApp está configurado para testes; confirme o número
                oficial antes de publicar.
              </p>
            </div>

            <div
              className="product-stage"
              role="group"
              aria-label="Visualização da caneca"
            >
              <div className="product-light" aria-hidden="true" />
              <div className="product-image-wrap">
                <picture
                  className={`hero-product-picture hero-product-picture--${currentView.id}`}
                >
                  <source srcSet={currentView.webp} type="image/webp" />
                  <img
                    key={currentView.id}
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
              <button
                className={`product-view-toggle hero-view-toggle ${
                  activeView === "verso" ? "reverse" : ""
                }`}
                type="button"
                aria-label={`Mostrar ${
                  activeView === "frente" ? "verso" : "frente"
                } da caneca`}
                onClick={() =>
                  setActiveView(activeView === "frente" ? "verso" : "frente")
                }
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </section>

        <section
          className="catalog section"
          id="catalogo"
          aria-labelledby="catalog-title"
        >
          <div className="container">
            <div className="section-heading catalog-heading">
              <div>
                <span className="section-index">Catálogo</span>
                <h2 id="catalog-title">Veja os nossos modelos</h2>
              </div>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="card-visual">
                    <picture
                      className={`card-product-picture card-product-picture--${currentView.id}`}
                    >
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
                    <button
                      className={`product-view-toggle ${
                        currentView.id === "verso" ? "reverse" : ""
                      }`}
                      type="button"
                      aria-label={
                        currentView.id === "frente"
                          ? "Ver a estampa do verso da caneca"
                          : "Ver a estampa da frente da caneca"
                      }
                      title={
                        currentView.id === "frente" ? "Ver verso" : "Ver frente"
                      }
                      onClick={() =>
                        setActiveView((view) =>
                          view === "frente" ? "verso" : "frente",
                        )
                      }
                    >
                      <ChevronIcon />
                    </button>
                  </div>
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <button
                      className="button button-primary card-button"
                      type="button"
                      onClick={() => addToCart(product.id, product.name)}
                    >
                      <CartIcon />
                      Adicionar ao carrinho
                    </button>
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
              <div className="custom-copy">
                <span className="section-index">Personalização</span>
                <h2 id="custom-title">Sua ideia pode virar a próxima estampa.</h2>
                <p>
                  Uma frase para presentear, uma data especial ou um brinde para
                  a sua empresa. Conte o que imaginou à Neoprint e converse sobre
                  as possibilidades.
                </p>
                <div className="custom-action">
                  <WhatsAppButton
                    className="button-primary custom-button"
                    message="Olá! Quero conversar sobre a personalização de uma caneca com a minha ideia."
                  >
                    Conte o que imaginou
                  </WhatsAppButton>
                  {!WHATSAPP_NUMBER && (
                    <p className="action-note" role="status">
                      {WHATSAPP_SETUP_MESSAGE}
                    </p>
                  )}
                </div>
              </div>
              <div className="custom-art">
                <div
                  className="custom-gallery"
                  role="region"
                  aria-label="Exemplos de canecas personalizadas"
                  tabIndex={0}
                >
                  {customizationRows.map((row) => (
                    <div
                      className={`custom-gallery-row${
                        row.reverse ? " custom-gallery-row--reverse" : ""
                      }`}
                      aria-hidden={row.hidden || undefined}
                      key={row.id}
                    >
                      {[0, 1].map((copy) => (
                        <div
                          className="custom-gallery-track"
                          role={
                            !row.hidden && copy === 0 ? "list" : undefined
                          }
                          aria-hidden={copy === 1 || undefined}
                          key={copy}
                        >
                          {row.images.map((example) => (
                            <figure
                              className="custom-gallery-card"
                              role={
                                !row.hidden && copy === 0
                                  ? "listitem"
                                  : undefined
                              }
                              key={example.id}
                            >
                              <img
                                src={example.src}
                                alt={example.alt}
                                width="1440"
                                height="804"
                                loading="lazy"
                                decoding="async"
                              />
                            </figure>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
              src="/assets/logo-neoprint-sem-fundo.svg"
              alt="Neoprint Personalizados"
              width="1220"
              height="1552"
              loading="lazy"
              decoding="async"
            />
          </a>
          <nav aria-label="Navegação do rodapé">
            <a href="#inicio">Início</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#personalizacao">Personalização</a>
          </nav>
          <p>Frente e verso no mesmo modelo.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
