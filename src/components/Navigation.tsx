// Navigation component for scrolling between sections
function Navigation() {
  return (
    // Navigation container using Bootstrap flex utilities
    <nav className="d-flex gap-4">

      {/* Link to Home section */}
      <a href="#home" className="text-white text-decoration-none">
        Home
      </a>

      {/* Link to Tasks section */}
      <a href="#tasks" className="text-white text-decoration-none">
        Tasks
      </a>

      {/* Link to Features section */}
      <a href="#features" className="text-white text-decoration-none">
        Features
      </a>

      {/* Link to About section */}
      <a href="#about" className="text-white text-decoration-none">
        About
      </a>

    </nav>
  );
}

// Export Navigation component for use inside Header component
export default Navigation;