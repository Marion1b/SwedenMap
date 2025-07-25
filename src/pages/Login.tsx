import "../css/pages/Login.css";
import BurgerMenuContainer from "../components/BurgerMenu/BurgerMenuContainer";
import Routes from "../api";
import { useState } from "react";
import { useNavigate } from "react-router";

const route= new Routes;

const Login = () =>{

    const[errorEmail, setErrorEmail] = useState<boolean>(false);
    const[errorPassword, setErrorPassword] = useState<boolean>(false);
    const[unknownError, setUnknownError]=useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const form=e.target;
        const formData = new FormData(form);

        setErrorEmail(false);
        setErrorPassword(false);
        setUnknownError(false);

        const email:string|undefined = formData.get('email')?.toString();
        const password:string|undefined = formData.get('password')?.toString();

        //check all fields
        if(email && password){
            try{
                const response = await route.login({email, password});
                if(response && typeof response === 'object' && 'status' in response){
                    if(response.status === "success" && response.apiResponse.message === "User loged in"){
                        sessionStorage.setItem("userId", response.apiResponse.user.userId);
                        sessionStorage.setItem("email", response.apiResponse.user.email);
                        sessionStorage.setItem("username", response.apiResponse.user.username);
                        sessionStorage.setItem("accessToken", response.apiResponse.accessToken);
                        navigate('/');
                        return;
                    }if(response.status === "error"){
                        if(response.apiResponse.message === 'Email does not exist in db'){
                            setErrorEmail(true);
                            return;
                        }
                        if(response.apiResponse.message === 'Password incorrect'){
                            setErrorPassword(true);
                            return;
                        }else{
                            setUnknownError(true);
                            return;
                        }
                    }
                }
            }catch(error){
                console.error(error);
            }
        }else{
            return 'missing field';
        }
    }

    return(
        <>
        <BurgerMenuContainer />
        <section className="login">
            <div className="login-container">
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="handle-error">
                        <p className={`error-email-${errorEmail} error-password-${errorPassword} unknown-error-${unknownError}`}></p>
                    </div>
                    <div>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name="email" id="email" className={`email-${errorEmail}`} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" className={`password-${errorPassword}`} required/>
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