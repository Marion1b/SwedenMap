//react
import { useState } from "react";

//components
import BurgerMenu from "./BurgerMenu";
import BurgerButton from "./BurgerButton";

const BurgerMenuContainer = () =>{
    const [open, setOpen] = useState<boolean>(false);

    return(
        <>
            <BurgerButton open={open} setOpen={setOpen}/>
            <BurgerMenu isOpen={open} />
        </>
    )
}

export default BurgerMenuContainer;