// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[searchResults, setSearchResults]= useState([]);
  
  // retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => { 
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    const newContact = response.data; 
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const updateContactHandler = async (updatedContact) => {
    try {
      
      const response = await api.put(`/contacts/${updatedContact.id}`, updatedContact);
      const updatedContactData = response.data;
  
      
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === updatedContactData.id ? updatedContactData : contact
        )
      );
  
      
      alert("Contact updated successfully!");
    } catch (error) {
      
      console.error("Error updating contact:", error);
      alert("Error updating contact. Please try again.");
    }
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    }
    );
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {

     setSearchTerm(searchTerm);
     if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) => {
       return Object.values(contact)
        .join(" ")
        .toLowerCase().includes(searchTerm.toLowerCase());
      });

      setSearchResults(newContactList);
     }
     else{
      setSearchResults(contacts);
     }
  };
  
  
  useEffect(() => {
  //  const retrieveContacts = JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY));
  //  if (retrieveContacts) setContacts(retrieveContacts);
   const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
   };

   getAllContacts();

     }, []);

//   useEffect(() => {
//  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
//   }, [contacts]);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
}, [contacts]);

  return (
    // <div>Hello Praniti!!! You are doing great...keep it up champ :)</div>
    <div className="ui container">
      <Router>
     
      <Header />
      <Routes>
      {/* <Route path="/add" component={AddContact} />
      <Route path="/" component={ContactList} /> */}
              {/* <Route 
              path="/"
                 render={(props) =>(
                  <ContactList
                  {...props}
                contacts={contacts} 
          getContactId={removeContactHandler} />
          )} 
          />
          <Route
           path="/add" 
           render={(props) =>(
          <AddContact {...props} addContactHandler={addContactHandler} />)} /> 
       */}
      
     
           <Route path="/" element={<ContactList 
          contacts={ searchTerm.length < 1 ? contacts: searchResults} 
          getContactId={removeContactHandler} 
          term={searchTerm}
          searchKeyword={searchHandler}
          />} />


          <Route path="/add" element={<AddContact
           addContactHandler={addContactHandler} />} />

           <Route path="/edit" 
           render = {(props) =>(
            <EditContact {...props}
           updateContactHandler={updateContactHandler} />
           )} />  


           {/* <Route 
           path="/contact/:id" element={ContactDetail} /> */}
           <Route path="/contact/:id" 
           element={<ContactDetail contacts={contacts} />} />


      {/* <AddContact addContactHandler={addContactHandler}/>
      <ContactList  contacts={contacts} getContactId={removeContactHandler}/> */}
       </Routes>
      </Router>
     
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { uuid } from "uuidv4";
// import "./App.css";
// import Header from "./Header";
// import AddContact from "./AddContact";
// import ContactList from "./ContactList";

// function App() {
//   const LOCAL_STORAGE_KEY = "contacts";
//   // Initialize state from localStorage or with an empty array
//   const [contacts, setContacts] = useState(() => {
//     const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
//     return storedContacts || [];
//   });

//   const addContactHandler = (contact) => {
//     // Update state and then store in localStorage
//     const updatedContacts = [...contacts, contact];
//     setContacts(updatedContacts);
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
//   };

//   return (
//     <div className="ui container">
//       <Header />
//       <AddContact addContactHandler={addContactHandler}/>
//       <ContactList contacts={contacts}/>
//     </div>
//   );
// }

// export default App;

