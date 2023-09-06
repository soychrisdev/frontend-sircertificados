import React, { useEffect } from 'react';
import { useAccessibilitySettings } from '../../hooks/useAccessibilitySettings';
import HeaderLogo from './HeaderLogo';
import HeaderMenuMobile from './HeaderMenuMobile';
import HeaderDesktopMenu from './HeaderDesktopMenu';
import { useState } from 'react';

export default function Header() {
    const {
        isDarkMode,
        toggleDarkMode,
        fontSize,
        setFontSize,
        accessibilityClick
    } = useAccessibilitySettings();

    const [show, setShow] = useState({
        showDesktop: false,
        showMobile: false
    })

    useEffect(() => {
        // Your existing useEffect code here
        // ...

        // Replace 'hasDark' with 'isDarkMode'
        const hasDark = isDarkMode;

        // Replace 'classList' with 'fontSize'
        const classList = fontSize;

        // ...
    }, [isDarkMode, fontSize]);

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
                    <HeaderMenuMobile toggleDarkMode={toggleDarkMode} accessibilityClick={accessibilityClick} show={show} setShow={setShow} />
                    <HeaderDesktopMenu toggleDarkMode={toggleDarkMode} accessibilityClick={accessibilityClick} show={show} setShow={setShow} />
                </div>
            </div>
        </header>
    );

}
