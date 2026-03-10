function EmployeeCard({ employee }) {

  if (!employee) {
    return null;
  }

  const { id, name, email, phone, website, company } = employee;

  return (
    <div
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
      <p><strong>Company:</strong> {company?.name}</p>

    </div>
  );
}

export default EmployeeCard;