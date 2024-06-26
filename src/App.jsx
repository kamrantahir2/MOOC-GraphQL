import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useQuery, gql } from "@apollo/client";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Person = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}></button>
    </div>
  );
};

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });

  if (nameToSearch && result.data) {
    console.log("PERSON", result.data.findPerson);

    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name}: {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>Show Address</button>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [persons, setPersons] = useState([]);

  const result = useQuery(ALL_PERSONS);

  // useEffect(() => {
  //   if (!result.loading) {
  //     setPersons(result.data.allPersons);
  //   }
  // }, []);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {/* {console.log("STATE", persons)} */}
      <Persons persons={result.data.allPersons} />
    </>
  );
}

export default App;
