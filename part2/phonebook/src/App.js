import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import requestService from "./services/persons";

function App() {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState([]);
  const [notify, setNotify] = useState([]);

  const Notification = ({ message, stat }) => {
    // result: success or failed
    return (
      <div id="notification" className={stat}>
        <p>{message}</p>
      </div>
    );
  };

  useEffect(() => {
    requestService.getAll().then((people) => setPeople(people));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    if (people.findIndex((person) => person.name === newName) === -1) {
      const newPerson = { name: newName, number };
      requestService
        .addPerson(newPerson)
        .then((returnedPerson) => {
          setPeople(people.concat(returnedPerson));
          setNotify([`Added ${newName}`, "success"]);
          setTimeout(() => {
            setNotify([]);
          }, 5000);
        })
        .catch((error) => {
          //console.error(["FRONTEND", error.response, error.response.data]);
          setNotify([error.response.data.error, "failed"]);
          setTimeout(() => {
            setNotify([]);
          }, 5000);
        });
      setNewName("");
      setNumber("");
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        let save = people.find((person) => person.name === newName);
        save.number = number;
        requestService
          .updateNumber(save)
          .then((resp) => {
            people.map((person) => (person.name !== newName ? person : resp));
            setNotify([`Modified ${newName}`, "success"]);
            setTimeout(() => {
              setNotify([]);
            }, 5000);
          })
          .catch((error) => {
            console.error(error);
            setPeople(people.filter((person) => person.name !== newName));
            setNotify([
              `Information of ${newName} has already been removed from server`,
              "danger",
            ]);
            setTimeout(() => {
              setNotify([]);
            }, 5000);
          });
      }
      setNewName("");
      setNumber("");
    }
  };
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      requestService.deletePerson(id).then((response) => {
        if (response.status === 204) {
          setPeople(people.filter((person) => person.id !== id));
          setNotify([`Deleted ${name}`, "success"]);
          setTimeout(() => {
            setNotify([]);
          }, 5000);
          setFilter([]);
          document.getElementById("filter").value = "";
        }
      });
    }
  };

  const handleName = (e) => {
    setNewName(e.target.value);
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const filterName = (e) => {
    let inp = e.target.value;
    const res = people.filter((person) => {
      return person.name.toLowerCase().includes(inp.toLowerCase());
    });
    setFilter(res);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Search filterName={filterName} />
      {notify ? <Notification message={notify[0]} stat={notify[1]} /> : ""}
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleName={handleName}
        handleNumber={handleNumber}
        number={number}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons people={filter} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
