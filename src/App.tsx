function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Todo List App
        </h1>
        <p style={{ color: '#6b7280' }}>
          React + TypeScript + Vite project initialized successfully
        </p>
      </div>
    </div>
  )
}

export default App
