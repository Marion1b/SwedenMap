import "../css/pages/Register.css";
import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";
import Routes from "../api";
import { useState } from "react";

const route = new Routes;

const Register = () => {

    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorPasswordNoSame, setErrorPasswordNoSame] = useState<boolean>(false);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
    const [usernameAlreadyExist, setUsernameAlreadyExist] = useState<boolean>(false);
    const [unknownError, setUnknownError] = useState<boolean>(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        setErrorPassword(false);
        setErrorPasswordNoSame(false);
        setEmailAlreadyExist(false);
        setUsernameAlreadyExist(false);
        setUnknownError(false);

        const email:string|undefined = formData.get('email')?.toString();
        const username:string|undefined = formData.get('username')?.toString();
        const password:string|undefined = formData.get('password')?.toString();
        const verifyPassword:string|undefined = formData.get("password-verify")?.toString();
        
        //verify password security
        if(password && verifyPassword){
            if(!validatePassword(password)){
                setErrorPassword(true);
                return `password error`;
            }else if(!checkPasswords(password, verifyPassword)){
                setErrorPasswordNoSame(true);
                return `passwords no same`;
            }
        }

        //check all fields
        if(email && username && password){
            try{
                const response = await route.register({email,username,password});
                if (response && typeof response === 'object' && 'status' in response){
                    if(response.status === "success" && response.apiResponse.message === "user created"){
                        sessionStorage.setItem("userId", response.apiResponse.user.userId);
                        sessionStorage.setItem("email",response.apiResponse.user.email);
                        sessionStorage.setItem("username", response.apiResponse.user.username);
                        sessionStorage.setItem('accessToken', response.apiResponse.accessToken);
                        return
                    }
                    if(response.status === "success" && response.apiResponse.message === "Email already registered"){
                        setEmailAlreadyExist(true);
                        return
                    }
                    if(response.status === "success" && response.apiResponse.message === "Username already used"){
                        setUsernameAlreadyExist(true);
                        return
                    }else{
                        setUnknownError(true);
                        return
                    }
                }
            }catch(error){
                console.error(error);
            }
        }else{
            return `missing field`;
        }

    }

    const validatePassword = (password:string) =>{
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
        return regex.test(password);
    }

    const checkPasswords = (password:string, secondPassword:string) => {
        if(password === secondPassword){
            return true;
        }
        return false;
    }

    return(
        <>
            <BurgerMenuContainer />
            <section className="register">
                <div className="register-container">
                    <h1>Inscription</h1>
                    <form onSubmit={handleSubmit} method="post">
                        <div>
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" required />
                        </div>
                        <div>
                            <label htmlFor="username">Nom d'utilisateur-ice</label>
                            <input type="text" name="username" id="username" required />
                        </div>
                        <div>
                            <p className={`password-error-${errorPassword}`}>Le mot de passe doit contenir au moins 12 caractères, une majuscule, un caractère spécial et un chiffre.</p>
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" required />
                        </div>
                        <div>
                            <p className={`password-no-same-${errorPasswordNoSame}`}>Les mots de passe ne correspondent pas.</p>
                            <label htmlFor="password-verify">Vérification du mot de passe :</label>
                            <input type="password" name="password-verify" id="password-verify" required />
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