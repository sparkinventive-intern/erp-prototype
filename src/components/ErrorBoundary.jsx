import { Component } from 'react'

// Catches render-time crashes and shows the error instead of a
// blank white page — so problems are visible, not silent.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Spark ERP crashed:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'grid', placeItems: 'center',
          padding: 24, fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          <div style={{
            maxWidth: 560, background: '#fff', border: '1px solid #E6E9F0',
            borderRadius: 14, padding: 28, boxShadow: '0 8px 24px rgba(16,54,125,0.12)',
          }}>
            <h2 style={{ color: '#10367D', margin: 0, fontSize: 18 }}>
              Something went wrong
            </h2>
            <p style={{ color: '#64748B', fontSize: 14, marginTop: 8 }}>
              The page hit a runtime error. The details are below — and in the browser console.
            </p>
            <pre style={{
              background: '#F4F6FA', border: '1px solid #E6E9F0', borderRadius: 8,
              padding: 12, fontSize: 12, color: '#B91C1C', overflow: 'auto', marginTop: 12,
            }}>
              {String(this.state.error?.stack || this.state.error)}
            </pre>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'linear-gradient(135deg,#10367D,#2A5BC4)', color: '#fff',
                  border: 0, borderRadius: 8, padding: '8px 16px', fontWeight: 600,
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                Reload
              </button>
              <button
                onClick={() => { localStorage.removeItem('spark-erp'); window.location.reload() }}
                style={{
                  background: '#fff', color: '#10367D', border: '1px solid #CBD5E1',
                  borderRadius: 8, padding: '8px 16px', fontWeight: 600,
                  fontSize: 13, cursor: 'pointer',
                }}
              >
                Clear data & reload
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
