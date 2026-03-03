import { Link } from 'react-router-dom';
import './styles.css';

interface Post {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

const posts: Post[] = [
  {
    id: 1,
    category: 'Tendencias',
    title: 'Cómo vestir tu mesa navideña con flores',
    excerpt: 'Las flores no son solo para regalos. Descubre cómo un arreglo bien elegido puede transformar completamente tu mesa en estas fiestas.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=700&fit=crop',
    date: '28 Feb 2026',
    readTime: '4 min',
    slug: 'mesa-navidena-flores',
  },
  {
    id: 2,
    category: 'Inspiración',
    title: 'Peonías: la flor favorita de la temporada',
    excerpt: 'Ya sea por el color de una gema preciosa o el recuerdo de un momento especial, la peonía es la protagonista indiscutible de esta estación.',
    image: 'https://images.unsplash.com/photo-1444930694458-01babf71870c?w=600&h=800&fit=crop',
    date: '20 Feb 2026',
    readTime: '5 min',
    slug: 'peonias-temporada',
  },
  {
    id: 3,
    category: 'Cuidados',
    title: 'Diversidad en flor: celebra cada momento',
    excerpt: 'Mayo es el mes que da la bienvenida a la abundancia floral. Te contamos cuáles son las flores estrella y cómo combinarlas.',
    image: 'https://www.shutterstock.com/image-vector/collection-happy-womens-day-march-600nw-2413511041.jpg',
    date: '12 Feb 2026',
    readTime: '3 min',
    slug: 'diversidad-en-flor',
  },
];

const BlogSection = () => {
  return (
    <section className='blog-section'>
      <div className='container'>

        {/* ── HEADER ── */}
        <div className='blog-header'>
          <div className='blog-header__left'>
            <span className='blog-eyebrow'>Nuestro blog</span>
            <h2 className='blog-title'>El Diario<em> Florido</em></h2>
          </div>
          <Link to='/blog' className='blog-see-all'>
            Ver todas las publicaciones <span>→</span>
          </Link>
        </div>

        {/* ── GRID ── */}
        <div className='blog-grid'>

          {/* Card grande — izquierda */}
          <Link to={`/blog/${posts[0].slug}`} className='blog-card blog-card--featured'>
            <div className='blog-card__image-wrap'>
              <img src={posts[0].image} alt={posts[0].title} className='blog-card__img' />
              <div className='blog-card__overlay' />
            </div>
            <div className='blog-card__body'>
              <div className='blog-card__meta'>
                <span className='blog-card__cat'>{posts[0].category}</span>
                <span className='blog-card__dot' />
                <span className='blog-card__time'>{posts[0].readTime} lectura</span>
              </div>
              <h3 className='blog-card__title'>{posts[0].title}</h3>
              <p className='blog-card__excerpt'>{posts[0].excerpt}</p>
              <span className='blog-card__cta'>Leer más <span>→</span></span>
            </div>
          </Link>

          {/* Columna derecha — dos cards apiladas */}
          <div className='blog-col'>
            {posts.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className='blog-card blog-card--small'>
                <div className='blog-card__image-wrap'>
                  <img src={post.image} alt={post.title} className='blog-card__img' />
                  <div className='blog-card__overlay' />
                </div>
                <div className='blog-card__body'>
                  <div className='blog-card__meta'>
                    <span className='blog-card__cat'>{post.category}</span>
                    <span className='blog-card__dot' />
                    <span className='blog-card__time'>{post.readTime} lectura</span>
                  </div>
                  <h3 className='blog-card__title'>{post.title}</h3>
                  <p className='blog-card__excerpt'>{post.excerpt}</p>
                  <span className='blog-card__cta'>Leer más <span>→</span></span>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* ── READ MORE decorativo ── */}
        <div className='blog-read-more-wrap'>
          <Link to='/blog' className='blog-read-more-btn'>
            <span className='blog-read-more-btn__letter'>R</span>
            <span className='blog-read-more-btn__text'>LEER MÁS</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;