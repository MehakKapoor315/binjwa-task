import { useState, useEffect } from 'react';

export default function PropertyForm({ onSubmit, editingProperty, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (editingProperty) {
      setTitle(editingProperty.title);
      setPrice(editingProperty.price.toString());
      setLocation(editingProperty.location);
    } else {
      setTitle('');
      setPrice('');
      setLocation('');
    }
  }, [editingProperty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !price || !location.trim()) return;

    onSubmit({
      title: title.trim(),
      price: parseFloat(price),
      location: location.trim(),
    });

    if (!editingProperty) {
      setTitle('');
      setPrice('');
      setLocation('');
    }
  };

  return (
    <div className="form-panel">
      <h2 className="section-title">
        <span className="section-title__icon">{editingProperty ? '✏️' : '➕'}</span>
        {editingProperty ? 'Update Property' : 'Add New Property'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="title">Title</label>
            <input
              id="title"
              className="form-input"
              type="text"
              placeholder="e.g. Downtown Office Tower"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="price">Price ($)</label>
            <input
              id="price"
              className="form-input"
              type="number"
              placeholder="e.g. 2500000"
              min="0"
              step="any"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="location">Location</label>
            <input
              id="location"
              className="form-input"
              type="text"
              placeholder="e.g. Manhattan, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'end' }}>
            <button className="btn btn-primary" type="submit">
              {editingProperty ? 'Update' : 'Add Property'}
            </button>
            {editingProperty && (
              <button
                className="btn btn-cancel"
                type="button"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
