import React from "react";

const Form = ({ newName, number, handleName, handleNumber, addName }) => {
   return (
      <div>
         <form>
            <div className="formGroup">
               <label htmlFor="newName">Name: </label>
               <input id="newName" value={newName} onChange={handleName} />
            </div>
            <div className="formGroup">
               <label htmlFor="number">Number: </label>
               <input id="number" value={number} onChange={handleNumber} />
            </div>
            <div className="formGroup">
               <button className="primary" type="submit" onClick={addName}>
                  Add
               </button>
            </div>
         </form>
      </div>
   );
};

export default Form;
