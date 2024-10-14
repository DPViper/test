import React, { useState, useEffect } from 'react';
import Company from './Company';
import NewCompany from './NewCompany';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/companies')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch((error) => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  return (
    <div className='company-list'>
      <h2>Companies</h2>
      <NewCompany companies={companies} setCompanies={setCompanies} />
      <hr />
      {companies.map((company) => (
        <Company key={company.id} company={company} companies={companies} setCompanies={setCompanies} />
      ))}
    </div>
  );
}

export default CompanyList;
