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
    <section className="filter-section">

      {/* Section Title */}
      <h3>Filter Tasks</h3>

      {/* Filter chips */}
      <div className="filter-chips">
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            className={`filter-chip ${
              selectedFilter === filterOption ? "active" : ""
            }`}
            onClick={() => onFilterChange(filterOption)}
          >
            {filterOption}
          </button>
        ))}
      </div>
    </section>
  );
}