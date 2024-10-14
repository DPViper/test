import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function EditCompany({ companies, setCompanies }) {
  const { companyId } = useParams();
  const history = useHistory();
  const [company, setCompany] = useState({ name: '', address: '' });

  useEffect(() => {
    fetch(`http://localhost/api/companies/${companyId}`)
      .then(response => response.json())
      .then(data => setCompany(data))
      .catch(error => console.error('Error fetching company:', error));
  }, [companyId]);

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost/api/companies/${companyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    });

    history.push('/companies');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Company Name' value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} required />
      <input type='text' placeholder='Company Address' value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} />
      <button className='button green' type='submit'>Update Company</button>
    </form>
  );
}

export default EditCompany;
