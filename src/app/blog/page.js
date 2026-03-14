export default function BlogPage() {
  return (
    <div className="pt-20 min-h-screen" style={{ background: '#f5f0e8' }}>
      {/* Desktop: full natural width. Mobile: tall crop centered on the content */}
      <div className="w-full hidden sm:block">
        <img
          src="/images/scrapbook-bg.png"
          alt="Scrapbook - The Different Lives"
          className="w-full h-auto"
        />
      </div>
      {/* Mobile: show as tall scrollable image filling the screen */}
      <div className="w-full sm:hidden overflow-x-auto">
        <img
          src="/images/scrapbook-bg.png"
          alt="Scrapbook - The Different Lives"
          style={{ height: '85vh', width: 'auto', maxWidth: 'none' }}
        />
      </div>
    </div>
  );
}
