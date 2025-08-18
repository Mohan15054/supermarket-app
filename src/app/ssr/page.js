'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CardList from '@/components/Cards/CardList';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

// Fetch data from JSONPlaceholder API
async function fetchApiData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
    const posts = await response.json();
    
    return posts.map((post, index) => ({
      title: `SSR Post ${post.id}`,
      description: post.title.substring(0, 50) + '...',
      imageUrl: `https://picsum.photos/200/300?random=${200 + index}`,
      body: post.body.substring(0, 100) + '...',
      lastUpdated: new Date().toLocaleTimeString()
    }));
  } catch (error) {
    console.error('Error fetching API data:', error);
    return [];
  }
}

export default function SSRPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch data from API
  const fetchData = async () => {
    setLoading(true);
    const data = await fetchApiData();
    setProducts(data);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  // Fetch data on component mount and set up interval
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval to fetch every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
          <h2>🖥️ Server-Side Rendering (SSR) - API Polling Demo</h2>
          <p><strong>How it works:</strong></p>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>Data is fetched from JSONPlaceholder API every 10 seconds</li>
            <li>Client-side polling (SSR for initial render, CSR for updates)</li>
            <li>Real-time data updates without page refresh</li>
            <li>Uses useEffect and setInterval for periodic fetching</li>
          </ul>
          <p><strong>API:</strong> JSONPlaceholder Posts API</p>
          <p><strong>Update Frequency:</strong> Every 10 seconds</p>
          {lastUpdated && (
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          )}
          {loading && (
            <p style={{ color: '#ff6b6b' }}><strong>Status:</strong> Fetching new data...</p>
          )}
        </div>
        
        {loading && products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3>Loading data from API...</h3>
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
