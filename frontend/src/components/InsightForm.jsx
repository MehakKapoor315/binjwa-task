import { useState, useEffect } from 'react';

export default function InsightForm({ onSubmit, editingInsight, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingInsight) {
      setTitle(editingInsight.title);
      setCategory(editingInsight.category);
      setContent(editingInsight.content);
    } else {
      setTitle('');
      setCategory('');
      setContent('');
    }
  }, [editingInsight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, category, content });
    if (!editingInsight) {
      setTitle('');
      setCategory('');
      setContent('');
    }
  };

  return (
    <div className="form-panel">
      <h2 className="section-title">
        <span className="section-title__icon">{editingInsight ? '✏️' : '📊'}</span>
        {editingInsight ? 'Update Insight' : 'Add New Insight'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr auto' }}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input className="form-input" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Content</label>
            <input className="form-input" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'end' }}>
            <button className="btn btn-primary" type="submit">{editingInsight ? 'Update' : 'Add'}</button>
            {editingInsight && <button className="btn btn-cancel" type="button" onClick={onCancelEdit}>Cancel</button>}
          </div>
        </div>
      </form>
    </div>
  );
}
