import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import AddConsultation from "./Addconsultation"
import EditConsultation from "./EditConsultation";
import DeleteConsultation from "./DeleteConsultation";
import "./Consultation.css";
import { UserContext } from "./UserContext";
 
const API_URL = "https://localhost:7272/api/Consultations";
 
const Consultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [editConsultationId, setEditConsultationId] = useState(null);
 
  const { user } = useContext(UserContext);
  
    useEffect(() => {
      if (user && user.userId) { // Ensure user and userId exist before fetching
        loadConsultations();
      }
    }, [user]); 
 
  const loadConsultations = async () => {
    try {
      const response = await axios.get(`https://localhost:7272/api/Consultations/doctor/${user.userId}`);
      setConsultations(response.data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };
 
  return (
    <div className="container">
      <AddConsultation loadConsultations={loadConsultations} />
      {editConsultationId && <EditConsultation consultationId={editConsultationId} loadConsultations={loadConsultations} />}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ConsultationId</th>
            <th>AppointmentId</th>
            {/* <th>DoctorId</th> */}
            <th>Notes</th>
            <th>Prescription</th>
            <th>ConsultationDate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((c) => (
            <tr key={c.consultationId}>
              <td>{c.consultationId}</td>
              <td>{c.appointmentId}</td>
              {/* <td>{c.doctorId}</td> */}
              <td>{c.notes}</td>
              <td>{c.prescription}</td>
              <td>{c.consultationDate}</td>
              <td>
                <button onClick={() => setEditConsultationId(c.consultationId)} className="btn btn-warning">Edit</button>
                <DeleteConsultation consultationId={c.consultationId} loadConsultations={loadConsultations} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Consultation;