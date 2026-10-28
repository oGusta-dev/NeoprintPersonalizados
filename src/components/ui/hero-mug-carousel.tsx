import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"

export type ProductCarouselView<TId extends string> = {
  id: TId
  label: string
  src: string
  webp?: string
  alt: string
  width: number
  height: number
}

type HeroMugCarouselProps<TId extends string> = {
  productName: string
  views: readonly ProductCarouselView<TId>[]
  activeView: TId
  onViewChange: (viewId: TId) => void
}

type DragGesture = {
  pointerId: number
  startX: number
  startY: number
  offsetX: number
  active: boolean
}

function getRelativeOffset(index: number, activeIndex: number, count: number) {
  let offset = index - activeIndex

  if (offset > count / 2) offset -= count
  if (offset < -count / 2) offset += count

  return offset
}

export default function HeroMugCarousel<TId extends string>({
  productName,
  views,
  activeView,
  onViewChange,
}: HeroMugCarouselProps<TId>) {
  const [dragOffset, setDragOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragGesture = useRef<DragGesture | null>(null)

  if (views.length === 0) return null

  const activeIndex = Math.max(
    0,
    views.findIndex((view) => view.id === activeView),
  )
  const selectedView = views[activeIndex] ?? views[0]
  const nextView = views[(activeIndex + 1) % views.length] ?? selectedView

  const changeView = (direction: number) => {
    if (views.length < 2) return

    const nextIndex =
      (activeIndex + direction + views.length) % views.length
    onViewChange(views[nextIndex].id)
  }

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (views.length < 2) return
    if (event.pointerType === "mouse" && event.button !== 0) return

    dragGesture.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: 0,
      active: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = dragGesture.current
    if (!gesture || gesture.pointerId !== event.pointerId) return

    const deltaX = event.clientX - gesture.startX
    const deltaY = event.clientY - gesture.startY

    if (!gesture.active) {
      if (Math.abs(deltaX) < 8 || Math.abs(deltaX) <= Math.abs(deltaY)) return
      gesture.active = true
      setDragging(true)
    }

    const limit = Math.max(64, event.currentTarget.clientWidth * 0.38)
    gesture.offsetX = Math.max(-limit, Math.min(limit, deltaX))
    setDragOffset(gesture.offsetX)
  }

  const finishDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    canceled = false,
  ) => {
    const gesture = dragGesture.current
    if (!gesture || gesture.pointerId !== event.pointerId) return

    dragGesture.current = null

    const threshold = Math.max(
      36,
      Math.min(76, event.currentTarget.clientWidth * 0.12),
    )
    const shouldChange =
      gesture.active && !canceled && Math.abs(gesture.offsetX) >= threshold

    setDragging(false)
    setDragOffset(0)

    if (shouldChange) changeView(gesture.offsetX < 0 ? 1 : -1)
  }

  return (
    <div
      className="product-stage"
      role="region"
      aria-roledescription="carrossel"
      aria-label={"Galeria de " + productName}
    >
      <div className="product-light" aria-hidden="true" />
      <div
        className="product-image-wrap"
        data-dragging={dragging ? "true" : "false"}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={(event) => finishDrag(event, true)}
      >
        {views.map((view, index) => {
          const offset = getRelativeOffset(index, activeIndex, views.length)
          const distance = Math.abs(offset)
          const isActive = distance === 0
          const scale = Math.max(0.5, 1 - distance * 0.22)
          const opacity = isActive ? 1 : Math.max(0.24, 0.82 - distance * 0.2)

          return (
            <picture
              key={view.id}
              className={
                "hero-product-picture" +
                (isActive ? " is-active" : " is-preview")
              }
              aria-hidden={!isActive}
              style={{
                ["--slide-x" as string]: offset * 70 + "%",
                ["--drag-x" as string]: dragOffset + "px",
                ["--slide-scale" as string]: String(scale),
                ["--slide-opacity" as string]: String(opacity),
                ["--slide-layer" as string]: String(100 - distance),
              }}
            >
              {view.webp ? (
                <source srcSet={view.webp} type="image/webp" />
              ) : null}
              <img
                className="hero-product-image"
                src={view.src}
                alt={view.alt}
                width={view.width}
                height={view.height}
                loading={isActive ? "eager" : "lazy"}
                fetchPriority={isActive ? "high" : "auto"}
                decoding="async"
                draggable={false}
              />
            </picture>
          )
        })}
      </div>
      <div
        className="contact-shadow"
        aria-hidden="true"
        style={{ transform: "translateX(" + dragOffset + "px)" }}
      />
      <span className="hero-gallery-hint">Arraste para explorar</span>
      {views.length > 1 ? (
        <button
          className={
            "product-view-toggle hero-view-toggle" +
            (activeIndex === views.length - 1 ? " reverse" : "")
          }
          type="button"
          aria-label={"Mostrar " + nextView.label + " da caneca"}
          onClick={() => changeView(1)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        Vista selecionada: {selectedView.label}
      </span>
    </div>
  )
}