import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ShoppingBag,
  X,
} from 'lucide-react';
import './shopStyles.css';
import { SHOP_POLICY_URL, shopProducts } from './shopData';

export default function ShopMain() {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const products = shopProducts.filter((product) => product?.id && product?.title);

  return (
    <section className="shop-page" aria-labelledby="shop-title">
      <div className="shop-shell shop-heading fade-up">
        <p className="shop-eyebrow">
          <ShoppingBag size={16} aria-hidden="true" />
          mayasarchive shop
        </p>
      </div>

      {products.length > 0 ? (
        <div className="shop-shell shop-product-grid" aria-label="Products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="shop-shell shop-empty" role="status">
          <span>01</span>
          <p>New pieces are being prepared.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

function ProductCard({ product, onOpen }) {
  const media = normaliseMedia(product.media, product.title);

  return (
    <button className="shop-product-card" type="button" onClick={onOpen}>
      <div className="shop-product-media">
        {media[0] && <ProductMedia item={media[0]} title={product.title} preview />}
      </div>
      <div className="shop-product-copy">
        <div>
          <h2>{product.title}</h2>
          {product.description && <p>{product.description}</p>}
        </div>
        <span className="shop-product-price">{product.price}</span>
      </div>
    </button>
  );
}

function ProductDialog({ product, onClose }) {
  const media = normaliseMedia(product.media, product.title);
  const [mediaIndex, setMediaIndex] = React.useState(0);
  const closeButtonRef = React.useRef(null);
  const hasMultipleMedia = media.length > 1;

  const showPrevious = React.useCallback(() => {
    setMediaIndex((index) => (index - 1 + media.length) % media.length);
  }, [media.length]);

  const showNext = React.useCallback(() => {
    setMediaIndex((index) => (index + 1) % media.length);
  }, [media.length]);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (hasMultipleMedia && event.key === 'ArrowLeft') showPrevious();
      if (hasMultipleMedia && event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasMultipleMedia, onClose, showNext, showPrevious]);

  return (
    <div
      className="shop-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="shop-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`shop-dialog-title-${product.id}`}
      >
        <button
          ref={closeButtonRef}
          className="shop-dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          title="Close"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="shop-dialog-gallery">
          <div className="shop-dialog-media">
            {media[mediaIndex] && (
              <ProductMedia
                key={`${media[mediaIndex].src}-${mediaIndex}`}
                item={media[mediaIndex]}
                title={product.title}
              />
            )}
          </div>

          {hasMultipleMedia && (
            <div className="shop-gallery-controls">
              <button type="button" onClick={showPrevious} aria-label="Previous media" title="Previous">
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <span aria-live="polite">
                {mediaIndex + 1} / {media.length}
              </span>
              <button type="button" onClick={showNext} aria-label="Next media" title="Next">
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="shop-dialog-details">
          <p className="shop-dialog-label">Product details</p>
          <div className="shop-dialog-title-row">
            <h2 id={`shop-dialog-title-${product.id}`}>{product.title}</h2>
            <strong>{product.price}</strong>
          </div>
          {product.description && <p className="shop-dialog-description">{product.description}</p>}

          <div className="shop-dialog-links">
            <a href={SHOP_POLICY_URL} target="_blank" rel="noopener noreferrer">
              My policies
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            {product.checkoutUrl ? (
              <a
                className="shop-pay-button"
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy now
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ) : (
              <span className="shop-pay-button is-disabled" aria-disabled="true">
                Pay link unavailable
              </span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function normaliseMedia(items, title) {
  if (!Array.isArray(items)) return [];

  return items
    .filter(Boolean)
    .map((item, index) => {
      if (typeof item === 'string') {
        return { src: item, alt: `${title} view ${index + 1}` };
      }
      return item;
    })
    .filter((item) => item?.src);
}

function ProductMedia({ item, title, preview = false }) {
  const isVideo = item.type === 'video' || /\.(mp4|webm|mov)(\?|$)/i.test(item.src);

  if (isVideo) {
    return (
      <video
        src={item.src}
        aria-label={item.alt || title}
        poster={item.poster}
        autoPlay={preview}
        controls={!preview}
        loop={preview}
        muted={preview}
        playsInline
        preload="metadata"
      />
    );
  }

  return <img src={item.src} alt={item.alt || title} />;
}
