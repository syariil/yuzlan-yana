export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1e2022',
        color: '#c5a880',
        fontFamily: 'serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>🌸</p>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        404 — Halaman Tidak Ditemukan
      </h1>
      <p style={{ fontSize: '0.875rem', color: '#a0938a' }}>
        Sepertinya halaman ini belum ada.
      </p>
      <a
        href="/"
        style={{
          marginTop: '1.5rem',
          padding: '0.6rem 1.5rem',
          borderRadius: '999px',
          border: '1px solid #c5a880',
          color: '#c5a880',
          textDecoration: 'none',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        Kembali ke Undangan
      </a>
    </div>
  );
}

