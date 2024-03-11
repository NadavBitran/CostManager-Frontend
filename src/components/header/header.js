import "./header.css";

function Header({title}) {
    return (
        <header className={"container"}>
            <h1 className={"appTitle"}>{title}</h1>
        </header>
    )
};

export default Header;