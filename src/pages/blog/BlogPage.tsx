import './BlogPage.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLeaf, FaArrowRight, FaClock } from 'react-icons/fa';

import floridos1  from '../../assets/floridos1.png';
import floridos2  from '../../assets/floridos2.png';
import floridos3  from '../../assets/floridos3.png';
import floridos4  from '../../assets/floridos4.png';
import floridos5  from '../../assets/floridos5.png';
import floridos6  from '../../assets/floridos6.png';
import planta1    from '../../assets/planta1.png';
import planta3    from '../../assets/planta3.png';

/* ──────────────────────────────────────────────────────────
   DATOS DE BLOG
   Para agregar un artículo nuevo, añade un objeto aquí.
   featured: true → aparece como post destacado en el hero.
   Solo uno debería tener featured: true a la vez.
────────────────────────────────────────────────────────── */
export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'guia-flores-temporada-colombia',
    featured: true,
    category: 'Guías',
    title: 'Qué flores están de temporada en Colombia este mes',
    excerpt:
      'Colombia es uno de los mayores exportadores de flores del mundo, y eso significa que en cada temporada hay variedades frescas y a mejor precio. Aquí te contamos cuáles elegir y por qué.',
    image: floridos1,
    author: 'Floridos',
    date: '8 de marzo, 2026',
    readTime: '4 min',
    tags: ['temporada', 'flores', 'colombia'],
  },
  {
    id: 2,
    slug: 'como-cuidar-rosas-en-casa',
    featured: false,
    category: 'Cuidados',
    title: 'Cómo hacer que tus rosas duren más de dos semanas',
    excerpt:
      'Con los trucos correctos, un ramo de rosas puede durar el doble de lo normal. Agua, corte en ángulo, temperatura — cada detalle cuenta.',
    image: floridos2,
    author: 'Floridos',
    date: '1 de marzo, 2026',
    readTime: '3 min',
    tags: ['rosas', 'cuidados', 'tips'],
  },
  {
    id: 3,
    slug: 'plantas-que-purifican-el-aire',
    featured: false,
    category: 'Plantas',
    title: '5 plantas que purifican el aire de tu hogar (y son fáciles de cuidar)',
    excerpt:
      'Pothos, lirio de la paz, espatifilo — estas plantas no solo se ven bien: filtran toxinas del ambiente y mejoran la calidad del aire que respiras.',
    image: planta1,
    author: 'Floridos',
    date: '22 de febrero, 2026',
    readTime: '5 min',
    tags: ['plantas', 'hogar', 'bienestar'],
  },
  {
    id: 4,
    slug: 'decoracion-floral-bodas-2026',
    featured: false,
    category: 'Inspiración',
    title: 'Tendencias en decoración floral para bodas este año',
    excerpt:
      'Arcos de pampas, florales silvestres, tonos terrosos — el 2026 trae una estética más orgánica y menos rígida para las bodas. Te mostramos lo que más se está pidiendo.',
    image: floridos3,
    author: 'Floridos',
    date: '14 de febrero, 2026',
    readTime: '6 min',
    tags: ['bodas', 'tendencias', 'decoración'],
  },
  {
    id: 5,
    slug: 'historia-floridos',
    featured: false,
    category: 'Nosotros',
    title: 'Cómo nació Floridos: una historia de flores y familia',
    excerpt:
      'Desde un pequeño local en el centro de Popayán hasta convertirnos en la floristería de confianza de cientos de familias. Este es nuestro camino.',
    image: floridos4,
    author: 'Floridos',
    date: '5 de febrero, 2026',
    readTime: '7 min',
    tags: ['floridos', 'historia', 'familia'],
  },
  {
    id: 6,
    slug: 'suculentas-para-principiantes',
    featured: false,
    category: 'Plantas',
    title: 'Guía para principiantes: cómo empezar tu colección de suculentas',
    excerpt:
      'Las suculentas son perfectas para quienes se consideran "sin manos para las plantas". Aprende a elegirlas, plantarlas y no olvidar regarlas (casi nunca).',
    image: planta3,
    author: 'Floridos',
    date: '28 de enero, 2026',
    readTime: '4 min',
    tags: ['suculentas', 'principiantes', 'plantas'],
  },
  {
    id: 7,
    slug: 'significado-colores-flores',
    featured: false,
    category: 'Guías',
    title: 'El significado de los colores en las flores: elige bien tu regalo',
    excerpt:
      'Rojo es amor, amarillo es amistad, blanco es paz — pero hay muchos matices. Una guía completa para no mandar el mensaje equivocado con tus flores.',
    image: floridos5,
    author: 'Floridos',
    date: '20 de enero, 2026',
    readTime: '5 min',
    tags: ['significado', 'colores', 'regalos'],
  },
  {
    id: 8,
    slug: 'centro-de-mesa-diy',
    featured: false,
    category: 'DIY',
    title: 'Haz tu propio centro de mesa floral en menos de 30 minutos',
    excerpt:
      'Con flores de temporada, un poco de alambre floral y este paso a paso, puedes crear un centro de mesa que parece de floristería profesional.',
    image: floridos6,
    author: 'Floridos',
    date: '12 de enero, 2026',
    readTime: '8 min',
    tags: ['diy', 'tutorial', 'decoración'],
  },
];

/* ──────────────────────────────────────────────────────────
   PUBLICACIONES DE REDES SOCIALES
   ────────────────────────────────────────────────────────
   Para agregar una publicación nueva de Instagram/Facebook:
   1. Ve a la publicación en Instagram.com
   2. Haz clic en los "..." → "Insertar" → copia la URL del permalink
      (se ve así: https://www.instagram.com/p/CÓDIGO_DEL_POST/)
   3. Agrega un objeto a este array con esa URL en `instagramUrl`

   El componente se encarga de mostrar el embed automáticamente.
────────────────────────────────────────────────────────── */
const SOCIAL_POSTS = [
  {
    id: 'p1',
    instagramUrl: 'https://www.instagram.com/p/REEMPLAZA_CON_ID_REAL/',
    caption: 'Arreglo especial para San Valentín 🌹',
  },
  {
    id: 'p2',
    instagramUrl: 'https://www.instagram.com/p/REEMPLAZA_CON_ID_REAL_2/',
    caption: 'Nuevas plantas de temporada 🌿',
  },
  {
    id: 'p3',
    instagramUrl: 'https://www.instagram.com/p/REEMPLAZA_CON_ID_REAL_3/',
    caption: 'Decoración para bodas en Popayán 💐',
  },
];

const CATEGORIES = ['Todas', 'Guías', 'Cuidados', 'Plantas', 'Inspiración', 'Nosotros', 'DIY'];

/* ──────────────────────────────────────────────────── */

/* Instagram Embed Component */
const InstagramEmbed = ({ url }: { url: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carga el script de embeds de Instagram si no está cargado
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id  = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Si ya estaba cargado, re-procesa los embeds
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }
  }, [url]);

  return (
    <div ref={ref} className="instagram-embed-wrapper">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        data-instgrm-captioned
        style={{
          background: '#FFF',
          border: '0',
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '0',
          maxWidth: '100%',
          minWidth: '326px',
          padding: '0',
          width: '100%',
        }}
      />
    </div>
  );
};

/* Blog Card */
const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => {
  const navigate = useNavigate();
  return (
    <article
      className="blog-card"
      onClick={() => navigate(`/blog/${post.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
    >
      <div className="blog-card-image-wrapper">
        <img src={post.image} alt={post.title} className="blog-card-image" />
        <span className="blog-card-category">{post.category}</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span><FaClock size={9} /> {post.readTime} de lectura</span>
          <span>{post.date}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <span className="blog-card-read">
          Leer artículo <FaArrowRight size={11} />
        </span>
      </div>
    </article>
  );
};

/* ──────────────────────────────── MAIN PAGE ─── */
const BlogPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Todas');

  const featuredPost = BLOG_POSTS.find(p => p.featured);
  const regularPosts = BLOG_POSTS.filter(p => !p.featured);

  const filteredPosts = activeCategory === 'Todas'
    ? regularPosts
    : regularPosts.filter(p => p.category === activeCategory);

  return (
    <div className="blog-page">

      {/* ── HEADER ── */}
      <div className="blog-header">
        <div className="container">
          <p className="blog-eyebrow"><FaLeaf size={11} /> Historias & Novedades</p>
          <h1 className="blog-title">El <em>Blog</em> de Floridos</h1>
          <p className="blog-subtitle">
            Guías de cuidado, inspiración floral, tendencias y todo lo que pasa dentro y fuera de nuestra floristería
          </p>
        </div>
        <div className="blog-header-deco" />
      </div>

      <div className="container blog-container">

        {/* ── FEATURED POST ── */}
        {featuredPost && (
          <section className="featured-section">
            <div
              className="featured-card"
              onClick={() => navigate(`/blog/${featuredPost.slug}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${featuredPost.slug}`)}
            >
              <div className="featured-image-col">
                <img src={featuredPost.image} alt={featuredPost.title} className="featured-image" />
                <div className="featured-image-overlay" />
              </div>
              <div className="featured-text-col">
                <div>
                  <div className="featured-labels">
                    <span className="featured-badge">✦ Destacado</span>
                    <span className="featured-category">{featuredPost.category}</span>
                  </div>
                  <h2 className="featured-title">{featuredPost.title}</h2>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                </div>
                <div className="featured-footer">
                  <div className="featured-meta">
                    <span><FaClock size={10} /> {featuredPost.readTime} de lectura</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <span className="featured-cta">
                    Leer artículo completo <FaArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CATEGORY FILTER ── */}
        <section className="blog-posts-section">
          <div className="category-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── POSTS GRID ── */}
          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <p>No hay artículos en esta categoría todavía.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* ── SEPARADOR ── */}
        <div className="section-divider">
          <span className="divider-leaf">🌿</span>
          <span className="divider-text">En nuestras redes</span>
          <span className="divider-leaf">🌿</span>
        </div>

        {/* ── SOCIAL FEED ── */}
        <section className="social-section">
          <div className="social-header">
            <div className="social-header-text">
              <h2 className="social-title">Lo último en Instagram</h2>
              <p className="social-subtitle">
                Las mismas publicaciones llegan a nuestro Facebook e Instagram —
                síguenos para no perderte nada.
              </p>
            </div>
            <div className="social-actions">
              <a
                href="https://www.instagram.com/floristeriafloridos"
                target="_blank"
                rel="noreferrer"
                className="social-follow-btn instagram"
              >
                <FaInstagram size={15} /> @floristeriafloridos
              </a>
              <a
                href="https://www.facebook.com/floristeriafloridos"
                target="_blank"
                rel="noreferrer"
                className="social-follow-btn facebook"
              >
                <FaFacebook size={15} /> Floridos
              </a>
            </div>
          </div>

          {/* Grid de embeds */}
          <div className="social-grid">
            {SOCIAL_POSTS.map(post => (
              <div key={post.id} className="social-post-wrapper">
                <InstagramEmbed url={post.instagramUrl} />
              </div>
            ))}
          </div>

          {/* Nota de instrucciones — eliminar en producción si quieres */}
          <div className="social-instructions">
            <p>
              <strong>💡 Para agregar publicaciones:</strong> Ve a Instagram → abre la publicación →
              clic en "···" → "Insertar" → copia la URL del <code>data-instgrm-permalink</code> y
              pégala en el array <code>SOCIAL_POSTS</code> dentro de <code>BlogPage.tsx</code>.
            </p>
          </div>
        </section>

        {/* ── CTA NEWSLETTER ── */}
        <div className="newsletter-banner">
          <div className="newsletter-text">
            <h3>¿Te gustaría recibir nuestras historias?</h3>
            <p>Guías de cuidado, novedades y descuentos exclusivos — sin spam, solo flores.</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="tu@correo.com" className="newsletter-input" />
            <button
              className="newsletter-btn"
              onClick={() => {
                const msg = `🌸 *Floridos — Suscripción a novedades*\n\nHola, me gustaría recibir novedades y contenido de Floridos.`;
                window.open(`https://wa.me/573146890813?text=${encodeURIComponent(msg)}`, '_blank');
              }}
            >
              Suscribirme <FaArrowRight size={11} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;