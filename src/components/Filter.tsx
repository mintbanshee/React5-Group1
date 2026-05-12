// ========================================================
// 📌 Filter Component (Controlled Component)
// ========================================================
// This component is responsible for rendering task filter
// buttons and sending the selected filter back to the parent
// component (App.tsx).
//
// It does NOT manage state internally. Instead, it relies on
// props from the parent component (controlled pattern).
// ========================================================

type FilterType = "All" | "Today" | "Upcoming" | "Completed";

type Props = {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export default function Filter({
  selectedFilter,
  onFilterChange,
}: Props) {

  // ========================================================
  // 📌 Filter Options Configuration
  // ========================================================
  const filters: FilterType[] = [
    "All",
    "Today",
    "Upcoming",
    "Completed",
  ];

  return (
    <section className="mb-4">

      {/* ========================================================
          📌 Section Title
      ======================================================== */}
      <h3 className="text-center mb-3">
        Filter Tasks
      </h3>

      {/* ========================================================
          📌 Filter Button Group
      ======================================================== */}
      <div className="d-flex flex-wrap gap-2 justify-content-center">

        {/* ========================================================
            📌 Render Filter Buttons Dynamically
        ======================================================== */}
        {filters.map((filterOption) => (
          <button
            key={filterOption}

            // ========================================================
            // 📌 Active state styling for selected filter
            // ========================================================
            className={`btn ${
              selectedFilter === filterOption
                ? "btn-primary"
                : "btn-outline-primary"
            }`}

            // ========================================================
            // 📌 Notify parent (App.tsx) when filter changes
            // ========================================================
            onClick={() => onFilterChange(filterOption)}
          >
            {filterOption}
          </button>
        ))}
      </div>
    </section>
  );
}