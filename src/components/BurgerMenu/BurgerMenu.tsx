import "../../css/components/BurgerMenu/BurgerMenu.css"
import { useState } from "react";

const BurgerMenu = ({isOpen}:{isOpen:boolean}) =>{
    const [affichageOpen, setAffichageOpen]=useState<boolean>(false);
    const[categoriesOpen, setCategoriesOpen]=useState<boolean>(false);

    const handleClickAffichage = () =>{
        setAffichageOpen(!affichageOpen);
    }

    const handleClickCategories=()=>{
        setCategoriesOpen(!categoriesOpen);
    }

    return(
        <nav className={`burger-menu burger-menu-${isOpen}`}>
            <ul>
                <li><span className="triangle"></span>Mon compte</li>
                <li onClick={handleClickAffichage}><span className="triangle"></span>Affichage</li>
                    <form action="" className={`affichage-open-${affichageOpen}`}>
                        <input type="radio" id="informations-parameters" name="informations-parameters"/>
                        <label htmlFor="informations-parameters">Afficher toutes les informations des lieux</label>
                    </form>
                <li onClick={handleClickCategories}><span className="triangle"></span>Catégories</li>
                    <form action="" className={`categories-open-${categoriesOpen}`}>
                        <fieldset>
                            <legend>Catégories affichées : </legend>
                            <div>
                                <input type="checkbox" name="categories" id="museum" />
                                <label htmlFor="museum">musée</label>
                                <input type="checkbox" name="categories" id="coffee" />
                                <label htmlFor="coffee">café</label>
                                <input type="checkbox" name="categories" id="park" />
                                <label htmlFor="park">parc</label>
                                <input type="checkbox" name="categories" id="restaurant" />
                                <label htmlFor="restaurant">restaurant</label>
                                <input type="checkbox" name="categories" id="shop" />
                                <label htmlFor="shop">magasin</label>
                            </div>
                        </fieldset>
                    </form>
            </ul>
            <p>Informations légales</p>
        </nav>
    )
}

export default BurgerMenu;