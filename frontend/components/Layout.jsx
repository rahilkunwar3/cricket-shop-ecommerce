export default function Layout({ children }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Inline critical styles */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html, #__next {
          width: 100%;
          overflow-x: hidden;
        }
      `}</style>
      {children}
    </div>
  )
}