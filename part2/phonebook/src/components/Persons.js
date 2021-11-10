import React from "react";

const Persons = ({ people, deletePerson }) => {
   return (
      <div>
         {people.map((person) => (
            <p key={person.id}>
               {person.name}: <b>{person.number}</b>
               <button
                  className="danger"
                  type="button"
                  onClick={() => deletePerson(person.id, person.name)}
               >
                  Delete
               </button>
            </p>
         ))}
      </div>
   );
};

export default Persons;
