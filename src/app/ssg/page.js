import Header from '@/components/Header';
import CardList from '@/components/Cards/CardList';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

// This function runs at build time
export async function generateStaticParams() {
  return [];
}

// Simulate data that would be fetched at build time
async function getStaticProducts() {
  return [
    {
      title: "SSG Apple",
      description: "Pre-built apples at build time",
      imageUrl: "https://picsum.photos/200/300?random=301",
    },
    {
      title: "SSG Banana",
      description: "Static bananas generated once",
      imageUrl: "https://picsum.photos/200/300?random=302",
    },
    {
      title: "SSG Orange",
      description: "Cached oranges for fast delivery",
      imageUrl: "https://picsum.photos/200/300?random=303",
    },
    {
      title: "SSG Milk",
      description: "Pre-generated dairy products",
      imageUrl: "https://picsum.photos/200/300?random=304",
    }
  ];
}

export default async function SSGPage() {
  // In a real app, this would run at build time
  const products = await getStaticProducts();
  
  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <h2>🏗️ Static Site Generation (SSG)</h2>
          <p><strong>How it works:</strong></p>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>Pages are pre-built at build/deploy time</li>
            <li>Static HTML files are served from CDN</li>
            <li>Fastest possible loading times</li>
            <li>Content is the same for all users</li>
          </ul>
          <p><strong>SEO:</strong> ✅ Perfect for search engines</p>
          <p><strong>Performance:</strong> ⚡⚡ Fastest loading - pre-built content</p>
        </div>
        <CardList cards={products} />
      </main>
    </div>
  );
}
