import React from 'react';

function Company({ company, companies, setCompanies }) {
  async function deleteCompany() {
    const response = await fetch(`http://localhost/api/companies/${company.id}`, {
      method: 'DELETE',
    });

    let newCompanies = companies.filter((c) => c.id !== company.id);
    setCompanies(newCompanies);
  }

  return (
    <div className='company'>
      <h3>{company.name}</h3>
      <p>Address: {company.address}</p>
      <button className='button red' onClick={deleteCompany}>Delete Company</button>
      <button className='button green'>Edit Company</button>
    </div>
  );
}

export default Company;
