import "../../css/components/BurgerMenu/BurgerButton.css";

const BurgerButton = ({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}) =>{

    const handleClick = () =>{
        setOpen(!open);
    }

    return(
        <button className={`burger-button burger-button-${open}`} onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default BurgerButton;