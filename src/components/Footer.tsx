// Footer component displayed at the bottom of the application
function Footer() {
  return (
    // Sticky footer section — styled via .custom-footer in App.css
    <footer className="text-center mt-auto custom-footer">

      {/* Bootstrap container for spacing and alignment */}
      <div className="container">

        {/* Footer copyright text */}
        <p className="mb-0">
          © 2026 Task &amp; Study Planner · React + TypeScript
        </p>

      </div>
    </footer>
  );
}

// Export Footer component
export default Footer;