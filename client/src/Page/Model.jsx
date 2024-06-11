import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Model({
  show,
  updateData,
  name,
  position,
  department,
  salary,
  setName,
  setSalary,
  setDepartment,
  setPosition,
  handleClose,
  userId
}) {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Empolyee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Position
              </label>
              <input
                type="text"
                className="form-control"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Salary
              </label>
              <input
                type="number"
                className="form-control"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={() => updateData(userId)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
