import { useState, useEffect } from "react";

function App() {

  // State variables
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employee data when the page loads
  useEffect(() => {

    const fetchEmployees = async () => {

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const data = await response.json();

        setEmployees(data);
        setLoading(false);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

    };

    fetchEmployees();

  }, []);

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (loading) {
    return <h2>Loading employees...</h2>;
  }

  // Error state
  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Employee Directory</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* Employee cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {filteredEmployees.map((employee) => {

          const { id, name, email, phone, website, company } = employee;

          return (
            <div
              key={id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                background: "white"
              }}
            >
              <h3>{name}</h3>

              <p><strong>ID:</strong> {id}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Website:</strong> {website}</p>
              <p><strong>Company:</strong> {company.name}</p>

            </div>
          );

        })}
      </div>
    </div>
  );
}

export default App;