import { useState, useEffect, useCallback } from 'react';
import './App.css';
import PropertyForm from './components/PropertyForm';
import ServiceForm from './components/ServiceForm';
import InsightForm from './components/InsightForm';
import PropertyCard from './components/PropertyCard';
import Toast from './components/Toast';
import Navigation from './components/Navigation';
import LoginModal from './components/LoginModal';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState([]);
  const [services, setServices] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingProperty, setEditingProperty] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingInsight, setEditingInsight] = useState(null);
  
  const [toasts, setToasts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(false);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [propRes, servRes, insRes] = await Promise.all([
        fetch(`${API_BASE}/investor/property`),
        fetch(`${API_BASE}/investor/service`),
        fetch(`${API_BASE}/investor/insight`)
      ]);

      const [propData, servData, insData] = await Promise.all([
        propRes.json(),
        servRes.json(),
        insRes.json()
      ]);

      if (propData.success) setProperties(propData.data);
      if (servData.success) setServices(servData.data);
      if (insData.success) setInsights(insData.data);
    } catch (err) {
      addToast('Failed to fetch data', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setShowLogin(false);
    addToast('Logged in as Admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    addToast('Logged out');
  };

  // --- Authenticated Helper ---
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      handleLogout();
      throw new Error('Session expired');
    }
    return res.json();
  };

  // --- Property CRUD ---
  const handlePropertySubmit = async (data) => {
    try {
      const isEdit = !!editingProperty;
      const url = isEdit ? `${API_BASE}/admin/property/${editingProperty._id}` : `${API_BASE}/admin/property`;
      const result = await authenticatedFetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      });
      if (result.success) {
        setProperties(prev => isEdit ? prev.map(p => p._id === editingProperty._id ? result.data : p) : [result.data, ...prev]);
        setEditingProperty(null);
        addToast(`Property ${isEdit ? 'updated' : 'added'}`);
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  const deleteProperty = async (id) => {
    try {
      const data = await authenticatedFetch(`${API_BASE}/admin/property/${id}`, { method: 'DELETE' });
      if (data.success) {
        setProperties(prev => prev.filter(p => p._id !== id));
        addToast('Property deleted');
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  // --- Service CRUD ---
  const handleServiceSubmit = async (data) => {
    try {
      const isEdit = !!editingService;
      const url = isEdit ? `${API_BASE}/admin/service/${editingService._id}` : `${API_BASE}/admin/service`;
      const result = await authenticatedFetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      });
      if (result.success) {
        setServices(prev => isEdit ? prev.map(s => s._id === editingService._id ? result.data : s) : [...prev, result.data]);
        setEditingService(null);
        addToast(`Service ${isEdit ? 'updated' : 'added'}`);
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  const deleteService = async (id) => {
    try {
      const data = await authenticatedFetch(`${API_BASE}/admin/service/${id}`, { method: 'DELETE' });
      if (data.success) {
        setServices(prev => prev.filter(s => s._id !== id));
        addToast('Service deleted');
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  // --- Insight CRUD ---
  const handleInsightSubmit = async (data) => {
    try {
      const isEdit = !!editingInsight;
      const url = isEdit ? `${API_BASE}/admin/insight/${editingInsight._id}` : `${API_BASE}/admin/insight`;
      const result = await authenticatedFetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        body: JSON.stringify(data),
      });
      if (result.success) {
        setInsights(prev => isEdit ? prev.map(i => i._id === editingInsight._id ? result.data : i) : [result.data, ...prev]);
        setEditingInsight(null);
        addToast(`Insight ${isEdit ? 'updated' : 'added'}`);
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  const deleteInsight = async (id) => {
    try {
      const data = await authenticatedFetch(`${API_BASE}/admin/insight/${id}`, { method: 'DELETE' });
      if (data.success) {
        setInsights(prev => prev.filter(i => i._id !== id));
        addToast('Insight deleted');
      }
    } catch (err) { addToast(err.message, 'error'); }
  };

  return (
    <div className="app">
      <Toast toasts={toasts} removeToast={removeToast} />
      {showLogin && <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}

      <Navigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setEditingProperty(null);
          setEditingService(null);
          setEditingInsight(null);
        }}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
      />

      <header className="header">
        <h1 className="header__title">Commercial Real Estate Platform</h1>
        <p className="header__subtitle">Premium Commercial Services & Market Research</p>
      </header>

      {/* Admin Forms (Tab Dependent) */}
      {isLoggedIn && (
        <div className="admin-zone">
          {activeTab === 'properties' && (
            <PropertyForm
              onSubmit={handlePropertySubmit}
              editingProperty={editingProperty}
              onCancelEdit={() => setEditingProperty(null)}
            />
          )}
          {activeTab === 'services' && (
            <ServiceForm
              onSubmit={handleServiceSubmit}
              editingService={editingService}
              onCancelEdit={() => setEditingService(null)}
            />
          )}
          {activeTab === 'insights' && (
            <InsightForm
              onSubmit={handleInsightSubmit}
              editingInsight={editingInsight}
              onCancelEdit={() => setEditingInsight(null)}
            />
          )}
        </div>
      )}

      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : (
        <main className="main-content">
          {activeTab === 'properties' && (
            <div className="properties-grid">
              {properties.map(p => (
                <PropertyCard
                  key={p._id}
                  property={p}
                  onDelete={isLoggedIn ? deleteProperty : null}
                  onEdit={isLoggedIn ? setEditingProperty : null}
                />
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-grid">
              {services.map(s => (
                <div key={s._id} className="property-card">
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
                  <h3 className="property-card__title">{s.title}</h3>
                  <p className="property-card__location">{s.description}</p>
                  {isLoggedIn && (
                    <div className="property-card__actions">
                      <button className="btn btn-edit" onClick={() => setEditingService(s)}>✏️ Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteService(s._id)}>🗑️ Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="insights-grid">
              {insights.map(i => (
                <div key={i._id} className="property-card insight-card">
                  <img src={i.image} alt={i.title} className="insight-card__image" />
                  <span className="insight-card__category">{i.category}</span>
                  <h3 className="property-card__title">{i.title}</h3>
                  <p className="property-card__location">{i.content}</p>
                  {isLoggedIn && (
                    <div className="property-card__actions">
                      <button className="btn btn-edit" onClick={() => setEditingInsight(i)}>✏️ Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteInsight(i._id)}>🗑️ Delete</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
