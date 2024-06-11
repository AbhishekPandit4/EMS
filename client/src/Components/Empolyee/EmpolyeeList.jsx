// EmployeeCard.js
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Empolyee.css"; // Corrected spelling

import "bootstrap/dist/css/bootstrap.min.css";
import Model from "../../Page/Model";

const EmployeeList = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(null);

  const getData = async () => {
    let response = await fetch("http://localhost:8000");
    let result = await response.json();
    setData(result);
    console.log("result", result);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (id) => {
    fetch(`http://localhost:8000/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    }).then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        let deleteItem = data?.filter((item) => item._id !== id);
        setData(deleteItem);
      } else {
        console.log("Delete is failed");
      }
    });
  };

  const handleClose = () => setShow(false);

  const showData = (id) => {
    setShow(true);
    const emp = data?.find((item) => item?._id === id);
    setName(emp?.name);
    setDepartment(emp?.department);
    setPosition(emp?.position); // Corrected this line
    setSalary(emp?.salary);
    setUserId(id);
    setShow(true);
  };

  const updateData = (userId) => {
    console.log(userId);
    fetch(`http://localhost:8000/updateuser/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ salary, department, position, name }),
    }).then((res) => {
      if (res.status === 200) {
        getData();
        handleClose();
      }
    });
  };

  return (
    <div className="center-table">
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {" "}
                {/* Added key prop */}
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>{item.department}</td>
                <td>{item.salary}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => showData(item?._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteData(item?._id)} // Corrected the onClick
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Model
        show={show}
        handleClose={handleClose}
        name={name}
        position={position}
        department={department}
        salary={salary}
        setName={setName}
        setSalary={setSalary}
        setDepartment={setDepartment}
        setPosition={setPosition}
        updateData={updateData}
        userId={userId}
      />
    </div>
  );
};

export default EmployeeList; // Corrected the component name
