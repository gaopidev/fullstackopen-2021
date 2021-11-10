import axios from "axios";

const baseUrl = "http://localhost:3003/persons";

const getAll = () => {
   const request = axios.get(baseUrl);
   return request.then((resp) => resp.data);
};

const addPerson = (newPerson) => {
   const request = axios.post(baseUrl, newPerson);
   return request.then((resp) => resp.data);
};

const deletePerson = (id) => {
   const request = axios.delete(`${baseUrl}/${id}`);
   return request.then((resp) => resp);
};

const updateNumber = (person) => {
   const request = axios.put(`${baseUrl}/${person.id}`, person);
   return request.then((resp) => resp.data);
};

const exportObject = {
   getAll,
   addPerson,
   deletePerson,
   updateNumber,
};
export default exportObject;
