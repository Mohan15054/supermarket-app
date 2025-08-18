'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CardList from '@/components/Cards/CardList';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

// Client-side API fetching
async function fetchClientSideData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
    const posts = await response.json();
    
    return posts.map((post, index) => ({
      title: `Hybrid Post ${post.id}`,
      description: post.title.substring(0, 50) + '...',
      imageUrl: `https://picsum.photos/200/300?random=${400 + index}`,
      body: post.body.substring(0, 100) + '...',
      fetchedAt: new Date().toLocaleTimeString(),
      source: 'Client-side fetch'
    }));
  } catch (error) {
    console.error('Client-side API error:', error);
    return [];
  }
}

export default function HybridSSRPage({ initialData }) {
  const [products, setProducts] = useState(initialData || []);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch data from client
  const fetchData = async () => {
    setLoading(true);
    const data = await fetchClientSideData();
    setProducts(data);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  // Set up client-side polling
  useEffect(() => {
    // Set last updated for initial data
    if (initialData) {
      setLastUpdated('Server-rendered');
    }

    // Set up interval to fetch every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e1f5fe', borderRadius: '8px' }}>
          <h2>🔄 Hybrid SSR + Client Polling</h2>
          <p><strong>How it works:</strong></p>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>Initial data: Server-side rendered (SSR)</li>
            <li>Updates: Client-side polling every 10 seconds</li>
            <li>Best of both: Fast initial load + real-time updates</li>
            <li>API calls after initial load use client's network</li>
          </ul>
          <p><strong>Initial Load:</strong> Server network</p>
          <p><strong>Updates:</strong> Client network</p>
          {lastUpdated && (
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          )}
          {loading && (
            <p style={{ color: '#ff6b6b' }}><strong>Status:</strong> Fetching from client...</p>
          )}
        </div>
        
        {loading && products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>Loading initial data...</h3>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '1rem auto'
            }}></div>
          </div>
        ) : (
          <CardList cards={products} />
        )}
      </main>
    </div>
  );
}
