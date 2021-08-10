import Logo from '../Images/LogoITS2.JPG';
import "../Styles/Consultas.css";
const cabecera = () => {
    return (
        <header id="main-header">
            <div class="cabeceraMenu">
                <div class="sub1Menu">
                    <div>
                        <img src={Logo} height="85" width="240" alt="Logo ITS"/>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default cabecera;