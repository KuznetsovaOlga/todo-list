import footerStyle from "./footer.module.css"
import {forwardRef} from "react";

const Footer = forwardRef((props, ref) => {
    return (
        <footer ref={ref} className={footerStyle.container}>
            <p>Подвал сайта</p>
        </footer>
    );
});

export default Footer;