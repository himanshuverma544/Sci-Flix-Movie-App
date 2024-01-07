import { NavLink } from "react-router-dom";


const SmartNavLink = ({ path, icon, title }) => {
  return (
    <li>
      <NavLink to={path}>
        <div className="nav-link-items-cont">
          {icon}
          <span>
            {title}
          </span>
        </div>
      </NavLink>
    </li>
  );
}

export default SmartNavLink;