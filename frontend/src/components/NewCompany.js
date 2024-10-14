import React, { useState } from 'react';

function NewCompany({ companies, setCompanies }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  async function createCompany(e) {
    e.preventDefault();
    //"/contacts/:contactId/companies/:companyId"

    const response = await fetch('http://localhost/api/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, address }),
    });

    const data = await response.json();

    if (data.id) {
      setCompanies([...companies, data]);
    }

    setName('');
    setAddress('');
  }

  return (
    <form className='new-company' onSubmit={createCompany}>
      <input type='text' placeholder='Company Name' value={name} onChange={(e) => setName(e.target.value)} required />
      <input type='text' placeholder='Company Address' value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className='button green' type='submit'>Create Company</button>
    </form>
  );
}

export default NewCompany;
