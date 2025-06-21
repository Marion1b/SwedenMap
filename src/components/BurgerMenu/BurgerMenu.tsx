import "../../css/components/BurgerMenu/BurgerMenu.css"
import { useState } from "react";

const BurgerMenu = ({isOpen}:{isOpen:boolean}) =>{
    const [affichageOpen, setAffichageOpen]=useState<boolean>(false);
    const[categoriesOpen, setCategoriesOpen]=useState<boolean>(false);
    const [affichageActive, setAffichageActive] = useState<boolean>(false);

    const handleClickAffichage = () =>{
        setAffichageOpen(!affichageOpen);
        if(categoriesOpen){
            setCategoriesOpen(false);
        }
    }

    const handleClickCategories=()=>{
        setCategoriesOpen(!categoriesOpen);
        if(affichageOpen){
            setAffichageOpen(false);
        }
    }

    const handleClickInputAffichage=()=>{
        setAffichageActive(!affichageActive);
    }

    return(
        <nav className={`burger-menu burger-menu-open-${isOpen}`}>
            <ul>
                <li><a href="/account"><span className="triangle"></span>Mon compte</a></li>
                <div>
                    <li onClick={handleClickAffichage}><span className={`triangle triangle-open-${affichageOpen}`}></span>Affichage</li>
                        <form action="" className={`affichage-open-${affichageOpen}`}>
                            <label htmlFor="informations-parameters">Afficher toutes les informations des lieux</label>
                            <input type="button" id="informations-parameters" name="informations-parameters" className={`affichage-active-${affichageActive}`} onClick={handleClickInputAffichage}/>
                        </form>
                </div>
                <div>
                    <li onClick={handleClickCategories}><span className={`triangle triangle-open-${categoriesOpen}`}></span>Catégories</li>
                        <form action="" className={`categories-open-${categoriesOpen}`}>
                            <fieldset>
                                <legend>Catégories affichées : </legend>
                                <div>
                                    <input type="checkbox" name="categories" id="museum" />
                                    <span className="checkmark"></span>
                                    <label htmlFor="museum">musée</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="categories" id="coffee" />
                                    <span className="checkmark"></span>
                                    <label htmlFor="coffee">café</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="categories" id="park" />
                                    <span className="checkmark"></span>
                                    <label htmlFor="park">parc</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="categories" id="restaurant" />
                                    <span className="checkmark"></span>
                                    <label htmlFor="restaurant">restaurant</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="categories" id="shop" />
                                    <span className="checkmark"></span>
                                    <label htmlFor="shop">magasin</label>
                                </div>
                            </fieldset>
                        </form>
                    </div>
            </ul>
            <p>Informations légales</p>
        </nav>
    )
}

export default BurgerMenu;