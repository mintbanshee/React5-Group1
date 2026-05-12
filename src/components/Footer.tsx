// Footer component displayed at the bottom of the application
function Footer() {
  return (
    // Footer section with Bootstrap styling
    <footer className="bg-dark text-white text-center py-3 mt-5">
      
      {/* Bootstrap container for proper spacing and alignment */}
      <div className="container">
        
        {/* Footer copyright text */}
        <p className="mb-0">
          © 2026 Task & Study Planner | React + TypeScript
        </p>

      </div>
    </footer>
  );
}

// Export Footer component for use in App.tsx
export default Footer;