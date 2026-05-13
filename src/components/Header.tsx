// Import Navigation component
import Navigation from "./Navigation";

// Header component displayed at the top of the application
function Header() {
  return (
    // Header section — styled via .custom-header in App.css
    <header className="py-3 sticky-top custom-header">

      {/* Bootstrap container for layout alignment */}
      <div className="container d-flex justify-content-between align-items-center">

        {/* Application logo and title */}
        <div>
          <h3 className="m-0">📘 Task &amp; Study Planner</h3>
        </div>

        {/* Navigation links component */}
        <Navigation />

      </div>
    </header>
  );
}

// Export Header component for use in App.tsx
export default Header;