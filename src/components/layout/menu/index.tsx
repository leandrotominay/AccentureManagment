import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">
        <img src="https://www.creativevirtual.com/wp-content/uploads/2021/03/accenture-logo.png" alt="Logo" />
      </p>
      <ul className="menu-list">
        <MenuItem href="/" aria-haspopup="true" aria-controls="dropdown-menu4" label="Home" />
        <MenuItem href="/consultas/empresas" label="Empresas" />
        <MenuItem href="/consultas/fornecedores" label="Fornecedores" />
        <MenuItem href="/" label="Sair" />
      </ul>
    </aside>
  );
};

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <li>
      <Link href={props.href}>
        <span className="icon"></span> {props.label}
      </Link>
    </li>
  );
};
