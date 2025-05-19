import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ValuesGrid() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/values')
      .then(res => {
        setValues(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load values');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading values...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="values-grid">
      {values.map((value, idx) => (
        <div className="value-card" key={idx}>
          <div className="card-image"></div>
          <div className="card-content">
            <h3>{value.Name || value.Value || 'Value'}</h3>
            <p>{value.Description || ''}</p>
            <a href={`#value-details-${idx}`} className="btn">Explore</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ValuesGrid; 