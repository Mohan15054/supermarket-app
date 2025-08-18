import Header from '@/components/Header';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

export default function ComparisonPage() {
  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h1>📊 CSR vs SSR vs SSG Comparison + API Polling Demo</h1>
          
          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
            <h3>🚀 New Feature: API Polling Every 10 Seconds</h3>
            <p>Both CSR and SSR pages now demonstrate real-time data fetching:</p>
            <ul style={{ marginTop: '0.5rem' }}>
              <li><strong>SSR Page:</strong> Uses JSONPlaceholder Posts API</li>
              <li><strong>CSR Page:</strong> Uses JSONPlaceholder Users API</li>
              <li><strong>Update Frequency:</strong> Every 10 seconds automatically</li>
              <li><strong>Real-time Updates:</strong> No page refresh needed</li>
            </ul>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            
            {/* CSR Card */}
            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '2px solid #2196f3' }}>
              <h3>🖥️ Client-Side Rendering (CSR)</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>How it works:</strong>
                <ul style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <li>Empty HTML sent to browser</li>
                  <li>JavaScript downloads and executes</li>
                  <li>API calls made from browser</li>
                  <li>Content rendered after data loads</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>API Polling Demo:</strong>
                <ul style={{ fontSize: '0.9rem', color: '#1976d2' }}>
                  <li>Fetches Users API every 10 seconds</li>
                  <li>Shows loading state during updates</li>
                  <li>Updates timestamp on each fetch</li>
                  <li>Client-side interval management</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Pros:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'green' }}>
                  <li>Fast subsequent navigation</li>
                  <li>Reduced server load</li>
                  <li>Rich interactions</li>
                  <li>Real-time updates</li>
                </ul>
              </div>
              
              <div>
                <strong>Cons:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'red' }}>
                  <li>Poor SEO initially</li>
                  <li>Slower initial content load</li>
                  <li>Requires JavaScript</li>
                  <li>Loading states needed</li>
                </ul>
              </div>
            </div>

            {/* SSR Card */}
            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '2px solid #4caf50' }}>
              <h3>🖥️ Server-Side Rendering (SSR)</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>How it works:</strong>
                <ul style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <li>Data fetched on server</li>
                  <li>Complete HTML generated server-side</li>
                  <li>Full page sent to browser</li>
                  <li>Immediate content visibility</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>API Polling Demo:</strong>
                <ul style={{ fontSize: '0.9rem', color: '#388e3c' }}>
                  <li>Fetches Posts API every 10 seconds</li>
                  <li>Client-side polling after initial SSR</li>
                  <li>Hybrid approach for real-time data</li>
                  <li>Best of both worlds</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Pros:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'green' }}>
                  <li>Excellent SEO</li>
                  <li>Fast content visibility</li>
                  <li>Works without JavaScript</li>
                  <li>Fresh data on each request</li>
                </ul>
              </div>
              
              <div>
                <strong>Cons:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'red' }}>
                  <li>Slower page loads</li>
                  <li>Higher server load</li>
                  <li>Full page refreshes</li>
                  <li>Complex caching</li>
                </ul>
              </div>
            </div>

            {/* SSG Card */}
            <div style={{ padding: '1.5rem', backgroundColor: '#000000ff', borderRadius: '8px', border: '2px solid #ff9800' }}>
              <h3>🏗️ Static Site Generation (SSG)</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>How it works:</strong>
                <ul style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  <li>Pages built at deploy time</li>
                  <li>Static HTML files generated</li>
                  <li>Served from CDN</li>
                  <li>Instant loading</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Pros:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'green' }}>
                  <li>Fastest loading</li>
                  <li>Perfect SEO</li>
                  <li>Highly cacheable</li>
                  <li>Great security</li>
                </ul>
              </div>
              
              <div>
                <strong>Cons:</strong>
                <ul style={{ fontSize: '0.9rem', color: 'red' }}>
                  <li>Build time increases with pages</li>
                  <li>Static content only</li>
                  <li>Requires rebuild for updates</li>
                  <li>Not suitable for user-specific content</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#000000ff', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h2>🎯 When to Use Each Approach</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              <div>
                <h4 style={{ color: '#2196f3' }}>Use CSR when:</h4>
                <ul style={{ fontSize: '0.9rem' }}>
                  <li>Building SPAs with rich interactions</li>
                  <li>User-specific dashboards</li>
                  <li>Applications behind login</li>
                  <li>Real-time data updates</li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: '#4caf50' }}>Use SSR when:</h4>
                <ul style={{ fontSize: '0.9rem' }}>
                  <li>SEO is critical</li>
                  <li>Dynamic content based on requests</li>
                  <li>Personalized content</li>
                  <li>Frequently changing data</li>
                </ul>
              </div>
              
              <div>
                <h4 style={{ color: '#ff9800' }}>Use SSG when:</h4>
                <ul style={{ fontSize: '0.9rem' }}>
                  <li>Content doesn't change often</li>
                  <li>Marketing/landing pages</li>
                  <li>Blogs and documentation</li>
                  <li>Maximum performance needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
