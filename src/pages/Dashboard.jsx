import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, ProgressBar, Spinner, Form } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ["#198754", "#dc3545"];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/students");
        if (res.data && res.data.length > 0) {
          setStudents(res.data);
          setSelectedStudent(res.data[0]); // select first student by default
        } else {
          setStudents([]);
          setSelectedStudent(null);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!selectedStudent) {
    return <p className="text-center text-danger mt-4">No student data found!</p>;
  }

  // Safe dynamic data
  const marksData = selectedStudent?.marks
    ? Object.entries(selectedStudent.marks).map(([subject, marks]) => ({ subject, marks }))
    : [];

  const attendanceData = selectedStudent?.attendance
    ? [
        { name: "Present", value: selectedStudent.attendance.present },
        { name: "Absent", value: selectedStudent.attendance.absent },
      ]
    : [];

  const activitiesData = selectedStudent?.activities || [];
  const presentValue = attendanceData[0]?.value || 0;

  return (
    <div className="dashboard-container">
      <h2 className="fw-bold mb-4 text-center">
        📊 {selectedStudent.name}'s Performance Dashboard
      </h2>

      {/* Student Selector */}
      <Form.Group className="mb-4 w-25">
        <Form.Label>Select Student</Form.Label>
        <Form.Select
          value={selectedStudent?.id || ""}
          onChange={(e) => {
            const student = students.find(
              (s) => s.id === (typeof s.id === "number" ? parseInt(e.target.value) : e.target.value)
            );
            setSelectedStudent(student);
          }}
        >
          <option value="">-- Select a Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="row g-4">
        {/* Marks */}
        {marksData.length > 0 && (
          <div className="col-lg-6">
            <Card className="shadow border-0 rounded-4">
              <Card.Body>
                <Card.Title className="fw-bold text-primary">Marks Overview</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marks" fill="#0d6efd" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </div>
        )}

        {/* Attendance */}
        {attendanceData.length > 0 && (
          <div className="col-lg-6">
            <Card className="shadow border-0 rounded-4">
              <Card.Body>
                <Card.Title className="fw-bold text-success">Attendance</Card.Title>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="value"
                      label
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  <ProgressBar
                    now={presentValue}
                    label={`${presentValue}% Present`}
                    variant="success"
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>

      {/* Activities */}
      {activitiesData.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <Card className="shadow border-0 rounded-4">
              <Card.Body>
                <Card.Title className="fw-bold text-warning">Recent Activities</Card.Title>
                <Table hover responsive className="mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activitiesData.map((act, index) => (
                      <tr key={index}>
                        <td>{act.date}</td>
                        <td>{act.activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
