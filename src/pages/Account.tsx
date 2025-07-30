import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";
import "../css/pages/Account.css";

const Account = () => {
    return(
        <>
            <BurgerMenuContainer />
            <section className="account">
                <h1 hidden>Mon compte</h1>
                <div className="account-container">
                    <h2>{sessionStorage.getItem('username')}</h2>
                    <ul>
                        <a href="/create-map"><li><i className="fi fi-br-plus"></i>Créer une nouvelle map</li></a>
                        <li><i className="fi fi-br-map-point"></i>Consulter mes maps</li>
                        <li><i className="fi fi-br-bookmark"></i>Maps sauvegardées</li>
                        <li><i className="fi fi-br-gears"></i>Paramètres</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Account;