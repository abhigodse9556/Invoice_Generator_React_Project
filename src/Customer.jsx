import { useEffect, useState } from "react";
import Button from "./Components/Button";

function Customer({ onBack }) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/get-customers");

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError("Failed to fetch customers. Please try again.");
      // eslint-disable-next-line no-console
      console.error("Error fetching customers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="app-title">Customers</h1>
      <Button
        onClick={onBack}
        label="Back to Invoice"
        style={{ marginBottom: "10px" }}
      />

      {isLoading && <p>Loading customers...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && customers.length > 0 && (
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.cust_id}>
                <td>{customer.cust_id}</td>
                <td>{customer.cust_name}</td>
                <td>{customer.cust_mobile}</td>
                <td>{customer.cust_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isLoading && !error && customers.length === 0 && (
        <p>No customers found.</p>
      )}
    </div>
  );
}

export default Customer;

