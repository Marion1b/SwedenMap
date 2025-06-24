import "../css/pages/Register.css";
import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";

const Register = () => {
    return(
        <>
            <BurgerMenuContainer />
            <section className="register">
                <div className="register-container">
                    <h1>Inscription</h1>
                    <form action="/account" method="post">
                        <div>
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" required />
                        </div>
                        <div>
                            <label htmlFor="username">Nom d'utilisateur-ice</label>
                            <input type="text" name="username" id="username" required />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" required />
                        </div>
                        <div>
                            <label htmlFor="password-verify">Vérification du mot de passe :</label>
                            <input type="password" name="password-verify" id="password-veriry" required />
                        </div>
                        <button type="submit">S'inscrire</button>
                    </form>
                    <p>Déjà un compte ? <a href="/login">Connexion</a></p>
                </div>
            </section>
        </>
    )
}

export default Register;