import "../css/pages/Register.css";
import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";
import Routes from "../api";
import { useState } from "react";
import { useNavigate } from "react-router";

const route = new Routes;

const Register = () => {

    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorPasswordNoSame, setErrorPasswordNoSame] = useState<boolean>(false);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
    const [usernameAlreadyExist, setUsernameAlreadyExist] = useState<boolean>(false);
    const [unknownError, setUnknownError] = useState<boolean>(false);

    const navigate = useNavigate();

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
                        navigate('/');
                        return
                    }
                    if(response.status === "error"){
                        if(response.apiResponse.message === "Email already registered"){
                            setEmailAlreadyExist(true);
                            return
                        }
                        if(response.apiResponse.message === "Username already used"){
                            setUsernameAlreadyExist(true);
                            return
                        }else{
                            setUnknownError(true);
                            return
                        }
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
                        <div className={`handle-error`}>
                            <p className={`error-password-${errorPassword} error-password-no-same-${errorPasswordNoSame} error-email-exist-${emailAlreadyExist} error-username-exist-${usernameAlreadyExist} unknown-error-${unknownError}`}></p>
                        </div>
                        <div>
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" className={`email-${emailAlreadyExist}`} required />
                        </div>
                        <div>
                            <label htmlFor="username">Nom d'utilisateur-ice</label>
                            <input type="text" name="username" id="username" className={`username-${usernameAlreadyExist}`} required />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe :</label>
                            <input type="password" name="password" id="password" className={`password-${errorPassword}`} required />
                        </div>
                        <div>
                            <label htmlFor="password-verify">Vérification du mot de passe :</label>
                            <input type="password" name="password-verify" id="password-verify" className={`password-verify-${errorPasswordNoSame}`} required />
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