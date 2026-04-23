export default function PropertyCard({ property, onDelete, onEdit }) {
  const formatPrice = (price) => {
    if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`;
    if (price >= 1_000) return `$${(price / 1_000).toFixed(0)}K`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="property-card">
      <div className="property-card__header">
        <h3 className="property-card__title">{property.title}</h3>
        <span className="property-card__price">{formatPrice(property.price)}</span>
      </div>
      <div className="property-card__location">
        <span className="property-card__location-icon">📍</span>
        {property.location}
      </div>
      
      {/* Only show actions if handlers are provided (Admin mode) */}
      {(onDelete || onEdit) && (
        <div className="property-card__actions">
          {onEdit && (
            <button className="btn btn-edit" onClick={() => onEdit(property)}>✏️ Edit</button>
          )}
          {onDelete && (
            <button className="btn btn-danger" onClick={() => onDelete(property._id)}>🗑️ Delete</button>
          )}
        </div>
      )}
    </div>
  );
}
