import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  const API_URL = "http://localhost:3000/students"; // port 3000

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        // Update student
        await axios.put(`${API_URL}/${editingStudent.id}`, formData);
      } else {
        // Add new student
        await axios.post(API_URL, formData);
      }
      setFormData({ name: "", email: "" });
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ name: student.name, email: student.email });
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this student?")) return;
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Student Deleted:", id);
    fetchStudents(); // refresh table
  } catch (err) {
    console.error("Error deleting student:", err);
  }
};
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Students</h2>
      </div>

      {/* Students Table */}
      <div className="card shadow p-3 mb-4">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Form */}
      <div className="card shadow p-3">
        <h5 className="fw-bold">{editingStudent ? "Edit Student" : "Add Student"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter student name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter student email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success fw-bold">
            {editingStudent ? "Update" : "Save"}
          </button>
          {editingStudent && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingStudent(null);
                setFormData({ name: "", email: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Student;
