import { useState, useEffect } from 'react';  // import useEffect
import ContactList from './components/ContactList';
import Stats from './components/Stats';
import './App.css';
import CompanyList from './components/CompanyList';

function App() {
    const [contacts, setContacts] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch((error) => {
                console.error('Error:', error);
            });
        fetch('http://localhost/api/companies')  // Fetch companies
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    return (
        <div className='page'>
            <h1>Contactor</h1>
            <ContactList contacts={contacts} setContacts={setContacts} />
            <CompanyList companies={companies} setCompanies={setCompanies} />
            <p>Click a contact to view associated phone numbers</p>
            <p>Click a company to view associated information</p>
            <Stats />
        </div>
    );
}

export default App;