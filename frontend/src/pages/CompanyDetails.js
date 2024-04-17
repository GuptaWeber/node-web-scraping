import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CompanyDetails = () => {
  const { clientId } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await fetch(`http://localhost:5001/clients/${clientId}`);
      const data = await response.json();

      setCompany(data);
    };

    fetchCompany();
  }, [clientId]);

  console.log(clientId);
  return (
    <div className="m-8">
      <h1 className="text-2xl mb-8 font-bold">Company Details</h1>
      <div className="mb-3" style={{ marginBottom: "10px" }}>
        CIN: {company.cin}
      </div>
      <div className="mb-3">Company Name: {company.companyName}</div>
      <div className="mb-3">Email: {company.email}</div>
      <div className="mb-3">Pin Code: {company.pinCode}</div>
      <div className="mb-3">Address: {company.address}</div>
    </div>
  );
};
