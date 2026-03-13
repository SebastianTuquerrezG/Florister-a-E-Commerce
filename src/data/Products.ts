/**
 * src/data/products.ts
 * Fuente única de verdad para todos los productos.
 * CatalogFlowers, CatalogPlants y SearchPage importan desde aquí.
 */

import floridos1  from '../assets/floridos1.png';
import floridos2  from '../assets/floridos2.png';
import floridos3  from '../assets/floridos3.png';
import floridos4  from '../assets/floridos4.png';
import floridos5  from '../assets/floridos5.png';
import floridos6  from '../assets/floridos6.png';
import floridos7  from '../assets/floridos7.png';
import floridos8  from '../assets/floridos8.png';

import planta     from '../assets/planta.png';
import planta1    from '../assets/planta1.png';
import planta2    from '../assets/planta2.png';
import planta3    from '../assets/planta3.png';
import planta4    from '../assets/planta4.png';
import planta5    from '../assets/planta5.png';
import planta6    from '../assets/planta6.png';
import planta7    from '../assets/planta7.png';
import planta8    from '../assets/planta8.png';

export interface Product {
  id:          number;
  name:        string;
  description: string;
  price:       number;
  rating:      number;
  inStock:     boolean;
  image:       string;
  category:    'flores' | 'plantas';
  slug:        string;
  // flores
  type?:       string;
  occasion?:   string;
  color?:      string;
  // plantas
  location?:   string;
  care?:       string;
}

export const FLOWERS: Product[] = [
  { id: 1,  name: 'Rosas Rojas',           type: 'Rosas',      occasion: 'Aniversario', color: 'Rojo',      price: 45000, rating: 4.8, inStock: true,  image: floridos1, category: 'flores', slug: 'rosas-rojas',           description: 'Docena de rosas rojas premium, símbolo de amor eterno'         },
  { id: 2,  name: 'Bouquet Primaveral',     type: 'Mixtos',     occasion: 'Cumpleaños',  color: 'Multicolor',price: 55000, rating: 4.6, inStock: true,  image: floridos2, category: 'flores', slug: 'bouquet-primaveral',    description: 'Mezcla vibrante de flores de temporada en colores pastel'      },
  { id: 3,  name: 'Girasoles Alegres',      type: 'Girasoles',  occasion: 'Cumpleaños',  color: 'Amarillo',  price: 38000, rating: 4.7, inStock: true,  image: floridos3, category: 'flores', slug: 'girasoles-alegres',     description: 'Ramo de girasoles frescos que iluminan cualquier espacio'      },
  { id: 4,  name: 'Tulipanes Holandeses',   type: 'Tulipanes',  occasion: 'Aniversario', color: 'Rosa',      price: 62000, rating: 4.9, inStock: true,  image: floridos4, category: 'flores', slug: 'tulipanes-holandeses',  description: 'Tulipanes importados de Holanda, elegancia y distinción'       },
  { id: 5,  name: 'Orquídeas Blancas',      type: 'Orquídeas',  occasion: 'Boda',        color: 'Blanco',    price: 85000, rating: 5.0, inStock: true,  image: floridos5, category: 'flores', slug: 'orquideas-blancas',     description: 'Arreglo de orquídeas blancas para ocasiones especiales'       },
  { id: 6,  name: 'Ramo de Novia',          type: 'Mixtos',     occasion: 'Boda',        color: 'Blanco',    price: 120000,rating: 4.9, inStock: true,  image: floridos6, category: 'flores', slug: 'ramo-novia',            description: 'Ramo bridal con peonías, rosas y eucalipto'                   },
  { id: 7,  name: 'Liliums Perfumados',     type: 'Liliums',    occasion: 'Cumpleaños',  color: 'Rosa',      price: 42000, rating: 4.5, inStock: false, image: floridos7, category: 'flores', slug: 'liliums-perfumados',    description: 'Liliums orientales con fragancia inigualable'                 },
  { id: 8,  name: 'Bouquet Solo Porque Sí', type: 'Mixtos',     occasion: 'Solo porque si', color: 'Multicolor',price: 35000, rating: 4.7, inStock: true,  image: floridos8, category: 'flores', slug: 'bouquet-solo-porque-si','description': 'Para decirle a alguien especial que piensas en él o ella'   },
];

export const PLANTS: Product[] = [
  { id: 201, name: 'Pothos Dorado',        type: 'Potos',           location: 'Interior', care: 'Fácil',    price: 18000, rating: 4.7, inStock: true,  image: planta,  category: 'plantas', slug: 'pothos-dorado',        description: 'Planta trepadora de fácil cuidado, ideal para colgar'          },
  { id: 202, name: 'Suculenta Mix',         type: 'Suculentas',      location: 'Interior', care: 'Fácil',    price: 12000, rating: 4.8, inStock: true,  image: planta1, category: 'plantas', slug: 'suculenta-mix',        description: 'Arreglo de suculentas variadas en maceta decorativa'           },
  { id: 203, name: 'Helecho Boston',        type: 'Helechos',        location: 'Interior', care: 'Moderado', price: 25000, rating: 4.5, inStock: true,  image: planta2, category: 'plantas', slug: 'helecho-boston',       description: 'Helecho frondoso ideal para interiores húmedos'                },
  { id: 204, name: 'Monstera Deliciosa',    type: 'Tropicales',      location: 'Interior', care: 'Moderado', price: 65000, rating: 4.9, inStock: true,  image: planta3, category: 'plantas', slug: 'monstera-deliciosa',   description: 'La reina de las plantas de interior, hojas grandes y elegantes' },
  { id: 205, name: 'Cactus Barrel',         type: 'Cactus',          location: 'Interior', care: 'Fácil',    price: 15000, rating: 4.6, inStock: true,  image: planta4, category: 'plantas', slug: 'cactus-barrel',        description: 'Cactus barril de bajo mantenimiento y larga vida'              },
  { id: 206, name: 'Lirio de la Paz',       type: 'Lirio de la Paz', location: 'Interior', care: 'Fácil',    price: 32000, rating: 4.8, inStock: true,  image: planta5, category: 'plantas', slug: 'lirio-paz',            description: 'Purifica el aire y florece en poca luz'                       },
  { id: 207, name: 'Palmera Areca',         type: 'Palmeras',        location: 'Interior', care: 'Moderado', price: 48000, rating: 4.7, inStock: false, image: planta6, category: 'plantas', slug: 'palmera-areca',        description: 'Palmera tropical que aporta frescura a cualquier espacio'      },
  { id: 208, name: 'Cactus San Pedro',      type: 'Cactus',          location: 'Exterior', care: 'Fácil',    price: 22000, rating: 4.4, inStock: true,  image: planta7, category: 'plantas', slug: 'cactus-san-pedro',     description: 'Cactus columnar resistente, perfecto para exteriores soleados' },
  { id: 209, name: 'Orquídea Phalaenopsis', type: 'Tropicales',      location: 'Interior', care: 'Experto',  price: 55000, rating: 5.0, inStock: true,  image: planta8, category: 'plantas', slug: 'orquidea-phalaenopsis',description: 'La orquídea más popular, flores duraderas y elegantes'         },
];

export const ALL_PRODUCTS: Product[] = [...FLOWERS, ...PLANTS];