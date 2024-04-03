import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { useQuery, gql } from "@apollo/client";
import Persons from "./Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

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
