import { useState, useEffect } from 'react';

export default function ServiceForm({ onSubmit, editingService, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('💼');

  useEffect(() => {
    if (editingService) {
      setTitle(editingService.title);
      setDescription(editingService.description);
      setIcon(editingService.icon);
    } else {
      setTitle('');
      setDescription('');
      setIcon('💼');
    }
  }, [editingService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, icon });
    if (!editingService) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="form-panel">
      <h2 className="section-title">
        <span className="section-title__icon">{editingService ? '✏️' : '💼'}</span>
        {editingService ? 'Update Service' : 'Add New Service'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Icon (Emoji)</label>
            <input className="form-input" value={icon} onChange={(e) => setIcon(e.target.value)} required />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Description</label>
            <input className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'end' }}>
            <button className="btn btn-primary" type="submit">{editingService ? 'Update' : 'Add'}</button>
            {editingService && <button className="btn btn-cancel" type="button" onClick={onCancelEdit}>Cancel</button>}
          </div>
        </div>
      </form>
    </div>
  );
}
