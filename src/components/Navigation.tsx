// Import Navigation component dependencies
import ThemeToggle from "./ThemeToggle";

// Navigation component for scrolling between sections
function Navigation() {
  return (
    // Navigation container using Bootstrap flex utilities
    <nav className="d-flex align-items-center gap-4">

      {/* Link to Home section */}
      <a href="#home">Home</a>

      {/* Link to Tasks section */}
      <a href="#tasks">Tasks</a>

      {/* Link to Features section */}
      <a href="#features">Features</a>

      {/* Link to About section */}
      <a href="#about">About</a>

      {/* Dark / Light mode toggle */}
      <ThemeToggle />

    </nav>
  );
}

// Export Navigation component for use inside Header component
export default Navigation;