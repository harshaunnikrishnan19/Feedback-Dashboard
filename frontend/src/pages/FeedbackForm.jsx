import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FeedbackForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: '',
    courseDuration: '4 Weeks',
    feedbackComments: '',
    feedbackRating: 5
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If in edit mode, fetch existing data to pre-fill inputs
  useEffect(() => {
    if (isEdit) {
      const fetchSingleFeedback = async () => {
        try {
          const res = await axios.get(`https://feedback-dashboard-ld8w.onrender.com/api/feedbacks/${id}`);
          setFormData({
            courseName: res.data.courseName || '',
            courseDuration: res.data.courseDuration || '4 Weeks',
            feedbackComments: res.data.feedbackComments || '',
            feedbackRating: res.data.feedbackRating || 5
          });
        } catch (err) {
          setError('Could not fetch existing feedback data');
        }
      };
      fetchSingleFeedback();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        await axios.put(`https://feedback-dashboard-ld8w.onrender.com/api/feedbacks/${id}`, formData);
      } else {
        await axios.post('https://feedback-dashboard-ld8w.onrender.com/api/feedbacks', formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2 className="page-title">{isEdit ? 'Update Feedback' : 'Add Course Feedback'}</h2>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="e.g. Full Stack Web Development"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="courseDuration">Course Duration</label>
            <input
              type="text"
              id="courseDuration"
              name="courseDuration"
              placeholder="e.g. 6 Weeks, 3 Months"
              value={formData.courseDuration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="feedbackRating">Feedback Rating (1 to 5)</label>
            <select
              id="feedbackRating"
              name="feedbackRating"
              value={formData.feedbackRating}
              onChange={handleChange}
              required
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="feedbackComments">Feedback Comments</label>
            <textarea
              id="feedbackComments"
              name="feedbackComments"
              rows="4"
              placeholder="Write your honest comments about the course..."
              value={formData.feedbackComments}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEdit ? 'Update Feedback' : 'Submit Feedback'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;