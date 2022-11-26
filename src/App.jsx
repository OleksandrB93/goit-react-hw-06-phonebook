import "./App.css";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { AppContainer, H1, H2 } from "App.styled";
import useLocalStorage from "hooks/useLocaleStorage";

import Phonebook from "components/Phonebook/Phonebook";
import SearchInput from "components/SearchInput/SearchInput";
import ContactList from "components/ContactList/ContactList";

export default function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const [filter, setFilter] = useState("");

  const formSubmitHandler = (name, phoneNumber) => {
    console.log(name);
    const newContact = {
      id: nanoid(),
      name,
      phoneNumber,
    };

    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contact`);
      return;
    }
    setContacts((contacts) => [newContact, ...contacts]);
  };

  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };

  const changeFilterInput = (event) => {
    setFilter(event.target.value);
  };

  const getContact = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  return (
    <AppContainer>
      <H1>Phonebook</H1>
      <Phonebook onSubmit={formSubmitHandler} />

      <H2>Contacts</H2>
      <SearchInput filter={filter} changeFilterInput={changeFilterInput} />

      <ContactList contacts={getContact()} deleteContact={deleteContact} />
    </AppContainer>
  );
}
