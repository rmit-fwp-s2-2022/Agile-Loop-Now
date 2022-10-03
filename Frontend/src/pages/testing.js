import { getUsers } from "../data/User";
import { useEffect, useState } from "react";

function Testing() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      console.log(response);
      setUsers(response);
    });
  }, []);
  return (
    <div>
      {users.map((users, index) => {
        return (
          <div key={index}>
            <h2>name: {users.name}</h2>

            <hr />
          </div>
        );
      })}
    </div>
  );
}
export default Testing;
