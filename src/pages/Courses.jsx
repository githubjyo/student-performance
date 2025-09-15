import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [formData, setFormData] = useState({ courseName: "", instructorName: "" });

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  // ✅ Open Modal (Add/Edit)
  const handleShow = (course = null) => {
    setEditCourse(course);
    setFormData(course || { courseName: "", instructorName: "" });
    setShow(true);
  };

  // ✅ Close Modal
  const handleClose = () => {
    setShow(false);
    setEditCourse(null);
  };

  // ✅ Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save or Update Course
  const handleSave = async () => {
    try {
      if (editCourse) {
        await axios.put(`http://localhost:3000/courses/${editCourse.id}`, formData);
      } else {
        await axios.post("http://localhost:3000/courses", formData);
      }
      fetchCourses();
      handleClose();
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  // ✅ Delete Course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Courses</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          + Add Course
        </Button>
      </div>

      {/* Table */}
      <div className="card shadow p-3">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>{course.courseName}</td>
                  <td>{course.instructorName}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShow(course)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No Courses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editCourse ? "Edit Course" : "Add Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                placeholder="Enter course name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                placeholder="Enter instructor name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            {editCourse ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Courses;
