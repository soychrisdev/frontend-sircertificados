import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import HeaderLogo from './HeaderLogo';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderDesktopMenu from './HeaderDesktopMenu';


export default function Header() {
    const {
        toggleDarkMode,
        showDesktop,
        showMobile,
        toggleShowDesktop,
        toggleShowMobile,
        accessibilityClick
    } = useAccessibilitySettings();


    return (
        <header className="header">
            <div className="header-container">
                <HeaderLogo />

                <div className="header-title">
                    <h1 id="title">Titulo de la App</h1>
                </div>

                <div className="user-info">
                    <div className="user-name mr-4">
                        <p>
                            nombre
                        </p>
                    </div>
                    <HeaderMenuMobile toggleDarkMode={toggleDarkMode} accessibilityClick={accessibilityClick} showMobile={showMobile} toggleShowMobile={toggleShowMobile} />
                    <HeaderDesktopMenu toggleDarkMode={toggleDarkMode} accessibilityClick={accessibilityClick} showDesktop={showDesktop} toggleShowDesktop={toggleShowDesktop} />
                </div>
            </div>
        </header>
    );

}
