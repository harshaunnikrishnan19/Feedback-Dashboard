import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all feedback from backend
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://feedback-dashboard-ld8w.onrender.com/api/feedbacks');
      setFeedbacks(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch feedbacks. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Delete feedback handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://feedback-dashboard-ld8w.onrender.com/api/feedbacks/${id}`);
      // Filter out deleted feedback from current state
      setFeedbacks(feedbacks.filter((item) => item._id !== id));
    } catch (err) {
      alert('Error deleting feedback. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Course Feedback Dashboard</h2>

      {loading && <p>Loading feedback records...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && feedbacks.length === 0 && !error && (
        <div className="empty-state">
          <h3>No feedback records found.</h3>
          <p>Click "Add Feedback" in the navigation bar to create the first record.</p>
        </div>
      )}

      <div className="card-grid">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="feedback-card">
            <div>
              <div className="card-header">
                <span className="course-id">{fb.courseId}</span>
                <span className="rating-badge">★ {fb.feedbackRating} / 5</span>
              </div>
              <h3 className="course-name">{fb.courseName}</h3>
              <p className="course-duration">Duration: {fb.courseDuration || 'N/A'}</p>
              <p className="feedback-comments">"{fb.feedbackComments}"</p>
            </div>

            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/edit-feedback/${fb._id}`)}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(fb._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;