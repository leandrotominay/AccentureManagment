import Link from 'next/link';

export const Menu: React.FC = () => {
    return (
        <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">
                Gerenciamento de Empresas e Funcionarios
            </p>
            <ul className="menu-list">
                <MenuItem href="/" aria-haspopup="true" aria-controls="dropdown-menu4" label="Home" />
                <MenuItem href="/cadastros/empresas" label="Cadastros Empresas" />
                <MenuItem href="/cadastros/fornecedores" label="Cadastros Fornecedores" />
                <MenuItem href="/" label="Sair" />
            </ul>
        </aside>
    )
}

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
    )
}