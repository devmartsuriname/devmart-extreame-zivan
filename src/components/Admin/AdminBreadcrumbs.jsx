import { Link } from 'react-router-dom';

export default function AdminBreadcrumbs({ breadcrumbs = [] }) {
  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        
        return (
          <span key={index}>
            {index > 0 && <span className="separator">/</span>}
            {crumb.path && !isLast ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span className="current">{crumb.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
