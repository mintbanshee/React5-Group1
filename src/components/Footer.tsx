// Footer component displayed at the bottom of the application
function Footer() {
  return (
    // Sticky footer section
    <footer className="bg-dark text-white text-center py-3 mt-auto custom-footer">

      {/* Bootstrap container for spacing and alignment */}
      <div className="container">

        {/* Footer copyright text */}
        <p className="mb-0">
          © 2026 Task & Study Planner | React + TypeScript
        </p>

      </div>
    </footer>
  );
}

// Export Footer component
export default Footer;