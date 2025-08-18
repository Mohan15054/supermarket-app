'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CardList from '@/components/Cards/CardList';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

// Fetch data from JSONPlaceholder API
async function fetchApiData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
    const users = await response.json();
    
    return users.map((user, index) => ({
      title: `CSR User ${user.id}`,
      description: `${user.name} - ${user.email}`,
      imageUrl: `https://picsum.photos/200/300?random=${100 + index}`,
      body: `${user.company.name} - ${user.address.city}`,
      lastUpdated: new Date().toLocaleTimeString()
    }));
  } catch (error) {
    console.error('Error fetching API data:', error);
    return [];
  }
}

export default function CSRPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchApiData();
      setProducts(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to load data from API');
    } finally {
      setLoading(false);
    }
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

  if (loading && products.length === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <Navigation />
        <main className={styles.main}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>🔄 Loading Data from API (CSR)...</h2>
            <p>Fetching data from JSONPlaceholder Users API</p>
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
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Header />
        <Navigation />
        <main className={styles.main}>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
            <h2>❌ Error: {error}</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h2>🖥️ Client-Side Rendering (CSR) - API Polling Demo</h2>
          <p><strong>How it works:</strong></p>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            <li>Data is fetched from JSONPlaceholder API every 10 seconds</li>
            <li>JavaScript runs in browser to fetch data periodically</li>
            <li>Shows loading indicator during updates</li>
            <li>Content updates automatically without page refresh</li>
          </ul>
          <p><strong>API:</strong> JSONPlaceholder Users API</p>
          <p><strong>Update Frequency:</strong> Every 10 seconds</p>
          {lastUpdated && (
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          )}
          {loading && products.length > 0 && (
            <p style={{ color: '#ff6b6b' }}><strong>Status:</strong> Fetching new data...</p>
          )}
        </div>
        <CardList cards={products} />
      </main>
    </div>
  );
}
