import { FaHome, FaBuilding, FaUserFriends, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">
        <img src="https://www.creativevirtual.com/wp-content/uploads/2021/03/accenture-logo.png" alt="Logo" />
      </p>
      <ul className="menu-list">
        <MenuItem href="/" aria-haspopup="true" aria-controls="dropdown-menu4" label="Home" icon={<FaHome />} />
        <MenuItem href="/consultas/empresas" label="Empresas" icon={<FaBuilding />} />
        <MenuItem href="/consultas/fornecedores" label="Fornecedores" icon={<FaUserFriends />} />

      </ul>
    </aside>
  );
};



interface MenuItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <li className="menu-item">
      <Link href={props.href}>
        
          <span style={{ display: 'flex' }} className="menu-icon">{props.icon}</span>
          <span className="menu-label">{props.label}</span>
        
      </Link>
    </li>
  );
};
