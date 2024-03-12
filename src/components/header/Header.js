/* Authors:
* Eyal Chachmishvily 209786094
* Idan Eliyahu 204174155
* Nadav Bitran Numa 325122075
*/

import './Header.css';

//header that adds a title to the project
const Header = ({title}) => {
    return (
        <header className={'container'}>
            <h1 className={'appTitle'}>{title}</h1>
        </header>
    )
};

export default Header;
