import React, { MouseEventHandler, useState } from "react";
import "./App.css";
import data from "./data.json";

export interface User {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  department: string;
}
let openedO: boolean[] = [];
let users: User[] = data.data.map((d, id) => {
  openedO.push(false);
  return { ...d, id };
});

function SearchBox() {
  const [search_query, setQuery] = useState("");
  const [userList, setList] = useState(users);
  const [openedList, setOpenedList] = useState(openedO);

  function handleSubmit(e) {
    e.preventDefault()
    let opened: boolean[] = [];
    if (search_query.length) {
      users = data.data.filter((f) => {
        const pattern = new RegExp(`${search_query}`, "gmi");
        return pattern.test(f.name) || pattern.test(f.email);
      });
    } else users = data.data;
    users = users.map((d, id) => {
      opened.push(false);
      return {
        ...d,
        id,
      };
    });
    setList([...users]);
    setOpenedList([...opened]);
  }
  return (
    <>
      <div className="center" style={{ width: "20%" }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={search_query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Name..."
          />
          <button className="btn-class" type="submit">
            Search
          </button>
        </form>
      </div>
      <table className="table-class center table-main">
        <thead>
          <th className="table-class table-head">ID</th>
          <th className="table-class table-head">Name</th>
          <th className="table-class table-head">Email</th>
        </thead>
        <TBody
          userList={userList}
          openedList={openedList}
          setOpenedList={setOpenedList}
        ></TBody>
      </table>
    </>
  );
}


function TBody({ userList, openedList, setOpenedList }) {
  function handleExpand(event) {
    openedList[Number(event.target.parentNode.dataset.key)] =
      !openedList[Number(event.target.parentNode.dataset.key)];
    setOpenedList([...openedList]);
  }

  return (
    <>
      {(userList as User[]).map((user: User) => {
        return (
          <>
            <tr onClick={handleExpand} key={user.id} data-key={user.id} className="hover-row">
              <td className="table-class">{user.id}</td>
              <td className="table-class">{user.name}</td>
              <td className="table-class">{user.email}</td>
            </tr>
            {openedList[user.id!] && (
              <tr key={user.id}>
                <td colSpan={3}>
                  <div className="card">
                    <div className="container">
                      <h4>
                        <b>{user.name}</b>
                      </h4>
                      <p>
                        <u>Address</u>: {user.address}
                      </p>
                      <p>
                        <u>Department</u>: {user.department}
                      </p>
                      <p>
                        <u>Phone</u>: {user.phone}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) }
          </>
        );
      })}
    </>
  );
}
function App() {
  return <SearchBox></SearchBox>;
}

export default App;
