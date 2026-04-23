export default function Navigation({ activeTab, setActiveTab, isLoggedIn, onLogout, onLoginClick }) {
  return (
    <nav className="nav-bar">
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          🏢 Properties
        </button>
        <button
          className={`nav-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          💼 Services
        </button>
        <button
          className={`nav-tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          📊 Insights
        </button>
      </div>
      <div className="nav-auth">
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        ) : (
          <button className="btn btn-edit" onClick={onLoginClick}>Admin Login</button>
        )}
      </div>
    </nav>
  );
}
