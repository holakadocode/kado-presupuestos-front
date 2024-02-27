import { useLocation } from 'react-router-dom';

export default function ProjectDefaultRoute(){
const location = useLocation();
const currentURL = window.location.origin + location.pathname + location.search;
  return currentURL.replaceAll(
    location.pathname + location.search,
    ''
  );}