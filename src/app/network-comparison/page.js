import Header from '@/components/Header';
import Navigation from '@/components/Navigation/Navigation';
import styles from '../page.module.css';

export default function NetworkComparisonPage() {
  return (
    <div className={styles.page}>
      <Header />
      <Navigation />
      <main className={styles.main}>
        <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h1>🌐 Network & Rendering Comparison</h1>
          
          <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <h3>❓ Your Question: "Is SSR just JS + HTML rendering?"</h3>
            <p><strong>Answer:</strong> No! True SSR means the SERVER fetches data and renders HTML before sending to client.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* True SSR */}
            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '3px solid #4caf50' }}>
              <h3>⚡ TRUE Server-Side Rendering</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Where API calls happen:</strong>
                <ul style={{ fontSize: '0.9rem', color: '#1976d2' }}>
                  <li>🖥️ SERVER makes API calls</li>
                  <li>🌐 Uses SERVER's network connection</li>
                  <li>📦 Complete HTML sent to client</li>
                  <li>⚡ No loading states needed</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Process:</strong>
                <ol style={{ fontSize: '0.9rem' }}>
                  <li>Client requests page</li>
                  <li>Server fetches data from API</li>
                  <li>Server renders HTML with data</li>
                  <li>Complete page sent to client</li>
                </ol>
              </div>
              
              <div style={{ padding: '0.5rem', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
                <strong>Network:</strong> Server → API (not client → API)
              </div>
            </div>

            {/* Client-Side Rendering */}
            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '3px solid #2196f3' }}>
              <h3>🖥️ Client-Side Rendering (CSR)</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Where API calls happen:</strong>
                <ul style={{ fontSize: '0.9rem', color: '#1976d2' }}>
                  <li>💻 CLIENT makes API calls</li>
                  <li>🌐 Uses CLIENT's network connection</li>
                  <li>📦 Empty HTML sent first</li>
                  <li>⏳ Loading states required</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Process:</strong>
                <ol style={{ fontSize: '0.9rem' }}>
                  <li>Client receives empty HTML</li>
                  <li>JavaScript loads and executes</li>
                  <li>Client fetches data from API</li>
                  <li>Content rendered in browser</li>
                </ol>
              </div>
              
              <div style={{ padding: '0.5rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
                <strong>Network:</strong> Client → API (your network speed matters)
              </div>
            </div>

            {/* Hybrid Approach */}
            <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '3px solid #ff9800' }}>
              <h3>🔄 Hybrid SSR + CSR</h3>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Where API calls happen:</strong>
                <ul style={{ fontSize: '0.9rem', color: '#1976d2' }}>
                  <li>🖥️ Initial: SERVER fetches data</li>
                  <li>💻 Updates: CLIENT polling</li>
                  <li>📦 Fast initial load + real-time updates</li>
                  <li>⚡ Best of both worlds</li>
                </ul>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong>Process:</strong>
                <ol style={{ fontSize: '0.9rem' }}>
                  <li>Server renders initial HTML with data</li>
                  <li>Client receives complete page</li>
                  <li>Client starts polling for updates</li>
                  <li>Real-time updates without page refresh</li>
                </ol>
              </div>
              
              <div style={{ padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
                <strong>Network:</strong> Server → API (initial), Client → API (updates)
              </div>
            </div>

          </div>

          {/* Current Implementation Status */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#ffebee', borderRadius: '8px', border: '2px solid #f44336' }}>
            <h3>🚨 Current Implementation Analysis</h3>
            <p>Your current "SSR" page is actually <strong>CSR with polling</strong> because:</p>
            <ul style={{ margin: '1rem 0' }}>
              <li><code>'use client'</code> directive makes it run on client</li>
              <li>API calls happen from client's browser</li>
              <li>Uses client's network connection</li>
              <li>Shows loading states</li>
            </ul>
            <p><strong>To see true SSR:</strong> Visit the <code>/ssr-true</code> page (refresh to see new data)</p>
            <p><strong>For hybrid approach:</strong> Visit the <code>/ssr-hybrid</code> page</p>
          </div>

          {/* Navigation Links */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/ssr-true" style={{ padding: '0.5rem 1rem', backgroundColor: '#4caf50', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
              View True SSR
            </a>
            <a href="/csr" style={{ padding: '0.5rem 1rem', backgroundColor: '#2196f3', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
              View CSR
            </a>
            <a href="/ssr-hybrid" style={{ padding: '0.5rem 1rem', backgroundColor: '#ff9800', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
              View Hybrid
            </a>
            <a href="/ssr" style={{ padding: '0.5rem 1rem', backgroundColor: '#9c27b0', color: 'white', borderRadius: '4px', textDecoration: 'none' }}>
              View Current "SSR" (Actually CSR)
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
