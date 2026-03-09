import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";
import "./styles/styles.css";

function App() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      <div className="cards">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
          />
        ))}
      </div>
    </div>
  );
}

export default App;