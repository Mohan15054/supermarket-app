'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CardList from '@/components/Cards/CardList';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

// This calls our SERVER API route (data processing happens on server)
async function fetchFromServerAPI() {
  try {
    // This calls our API route which runs on the server
    const response = await fetch('/api/posts', {
      cache: 'no-store'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Server API error:', error);
    return [];
  }
}

// This is now a CLIENT COMPONENT with SERVER API calls
export default function TrueSSRPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Function to fetch data from server API
  const loadData = async () => {
    setLoading(true);
    const data = await fetchFromServerAPI();
    setProducts(data);
    setLoading(false);
  };
  
  useEffect(() => {
    // Initial load
    loadData();
    
    // Set up interval to refresh every 20 seconds
    const interval = setInterval(() => {
      loadData();
    }, 20000); // 20 seconds
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffeb3b', borderRadius: '8px' }}>
          <h2>🔄 Hybrid: SSR API + Auto-Refresh</h2>
          <p><strong>How it works:</strong></p>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>API route runs on the SERVER (server-side processing)</li>
            <li>Client calls server API every 20 seconds</li>
            <li>Best of both: Server processing + Auto refresh</li>
            <li>Data processing happens on server, not client</li>
            <li>Automatic updates every 20 seconds</li>
          </ul>
          <p><strong>API Source:</strong> Server API route calls JSONPlaceholder</p>
          <p><strong>Network:</strong> Server handles external API, client calls server</p>
          <p><strong>Auto-refresh:</strong> Every 20 seconds</p>
          {loading && <p><strong>Loading...</strong></p>}
        </div>
        
        <CardList cards={products} />
      </main>
    </div>
  );
}
