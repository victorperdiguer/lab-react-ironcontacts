import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import contacts from './contacts.json';

function App() {
  const [contactList, setContactList] = useState(contacts.slice(0, 5));

  const addContact = () => {
    const remainingContacts = contacts.filter(contact => !contactList.includes(contact));
    const randomContact = Math.floor(Math.random()*remainingContacts.length);
    const newContactList = [...contactList];
    newContactList.push(remainingContacts[randomContact])
    setContactList(newContactList);
  }

  const sortByName = () => {
    const sortedContactList = [...contactList].sort((a,b) => {
      if (a.name>b.name) {
        return 1
      }
      else {
        return -1
      }
    })
    setContactList(sortedContactList);
  }

  const sortByPopularity = () => {
    const sortedContactList = [...contactList].sort((a,b) => {
      if (a.popularity<b.popularity) {
        return 1
      }
      else {
        return -1
      }
    })
    setContactList(sortedContactList);
  }

  const deleteStar = (event) => {
    const newContactList = [...contactList].filter(contact => contact.id !== event.target.value);
    setContactList(newContactList);
  }

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button className='button' onClick={addContact}>Add random contact</button>
      <button className='button' onClick={sortByName}>Sort by name</button>
      <button className='button' onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Oscar</th>
            <th>Emmy</th>
          </tr>
        </thead>
        <tbody>
        {contactList.map((contact) => {
          return (
            <tr className='contact' key={contact.id}>
              <td>
                <button onClick={deleteStar} className="button" value={contact.id}>Delete</button>
                <img src={contact.pictureUrl} alt={contact.name} className="contact-pic"/></td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(1)}</td>
              {contact.wonOscar && <td>🏆</td>}
              {contact.wonEmmy && <td>🏆</td>}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
