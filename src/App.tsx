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

  const [cardViewId, setCardViewId] =
    useState<typeof productViews[number]["id"]>("frente")

  const [menuOpen, setMenuOpen] = useState(false)

  const [cartOpen, setCartOpen] = useState(false)

  const [cartNotice, setCartNotice] = useState("")

  const [cartItems, setCartItems] = useState<Record<string, number>>({})

  const menuToggleRef = useRef<HTMLButtonElement>(null)

  const cartTriggerRef = useRef<HTMLButtonElement>(null)

  const cartDialogRef = useRef<HTMLDialogElement>(null)

  const currentView =
    productViews.find((view) => view.id === activeView) ?? productViews[0]

  const cardView =
    productViews.find((view) => view.id === cardViewId) ?? productViews[0]

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
            <a href="#modelos" onClick={closeMenu}>
              Modelo
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
                href="#modelos"
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
                    <MessageIcon />
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
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span aria-hidden="true" />
                Uma caneca, dois lados
              </div>
              <h1 id="hero-title">
                Sua caneca, <span>do jeitinho que você imaginar.</span>
              </h1>
              <p>
                Conheça a caneca “Quero Café! Ééé!” e veja a estampa da frente e
                a do verso.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#modelos">
                  Conheça a caneca
                  <ArrowIcon />
                </a>
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
          id="modelos"
          aria-labelledby="catalog-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-index">Catálogo · 1 modelo</span>
                <h2 id="catalog-title">Uma caneca, frente e verso.</h2>
              </div>
              <p>
                As duas imagens são vistas do mesmo produto, para você conferir
                cada estampa.
              </p>
            </div>

            <div className="product-list">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="card-visual">
                    <span className="catalog-fact">{cardView.label}</span>
                    <picture
                      className={`card-product-picture card-product-picture--${cardView.id}`}
                    >
                      <source srcSet={cardView.webp} type="image/webp" />
                      <img
                        key={cardView.id}
                        src={cardView.src}
                        alt={cardView.alt}
                        width={cardView.width}
                        height={cardView.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                    <button
                      className={`product-view-toggle ${
                        cardView.id === "verso" ? "reverse" : ""
                      }`}
                      type="button"
                      aria-label={
                        cardView.id === "frente"
                          ? "Ver a estampa do verso da caneca"
                          : "Ver a estampa da frente da caneca"
                      }
                      title={
                        cardView.id === "frente" ? "Ver verso" : "Ver frente"
                      }
                      onClick={() =>
                        setCardViewId((view) =>
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
                <h2 id="custom-title">Sua ideia, nossa personalização.</h2>
                <p>
                  Personalizamos canecas com criatividade, carinho e do jeitinho
                  que você imaginar.
                </p>
                <div className="custom-action">
                  <WhatsAppButton
                    className="button-primary custom-button"
                    message="Olá! Quero conversar sobre a personalização de uma caneca com a minha ideia."
                  >
                    Fale sobre a sua ideia
                  </WhatsAppButton>
                  {!WHATSAPP_NUMBER && (
                    <p className="action-note" role="status">
                      {WHATSAPP_SETUP_MESSAGE}
                    </p>
                  )}
                </div>
              </div>
              <div className="custom-art" aria-hidden="true">
                <span>Feita do seu jeito</span>
                <picture>
                  <source
                    srcSet="/assets/caneca-quero-cafe.webp"
                    type="image/webp"
                  />
                  <img
                    src="/assets/caneca-quero-cafe.png"
                    alt=""
                    width="1157"
                    height="670"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
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
          </nav>
          <p>Frente e verso no mesmo modelo.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
