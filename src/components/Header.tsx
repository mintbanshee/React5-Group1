// Import Navigation component
import Navigation from "./Navigation";

// Header component displayed at the top of the application
function Header() {
  return (
    // Header section with Bootstrap styling
    <header className="bg-dark text-white py-3 shadow-sm">
      
      {/* Bootstrap container for layout alignment */}
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Application logo and title */}
        <div>
          <h3 className="m-0">📘 Task & Study Planner</h3>
        </div>

        {/* Navigation links component */}
        <Navigation />

      </div>
    </header>
  );
}

// Export Header component for use in App.tsx
export default Header;