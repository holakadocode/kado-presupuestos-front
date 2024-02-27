import { useLocation } from 'react-router-dom';

export default function ProjectDefaultRoute() {
  const location = useLocation();
  const currentURL =
    window.location.origin + location.pathname + location.search;
  const frontUrl = currentURL.replaceAll(
    location.pathname + location.search,
    ''
  );

  // api de docker: http://localhost:5173/
  // api de LAMP: http://localhost/public/index.php/

  return {
    frontUrl: frontUrl,
    apiUrl: 'http://localhost/public/index.php/',
  };
}
