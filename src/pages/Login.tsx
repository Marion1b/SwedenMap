import "../css/pages/Login.css";
import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";

const Login = () =>{
    return(
        <>
        <BurgerMenuContainer />
        <section className="login">
            <div className="login-container">
                <h1>Connexion</h1>
                <form action="/account" method="POST">
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button type="submit">Connexion</button>
                </form>
                <p>Pas de compte ? <a href="/register">Créer un compte</a></p>
            </div>
        </section>
        </>
    )
}

export default Login;