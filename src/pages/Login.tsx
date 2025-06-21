const Login = () =>{
    return(
        <section className="login">
            <h1>Connexion</h1>
            <form action="/account" method="POST">
                <div>
                    <label htmlFor="username">Nom d'utilisateur-ice :</label>
                    <input type="text" name="username" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button type="submit">connexion</button>
            </form>
        </section>
    )
}

export default Login;