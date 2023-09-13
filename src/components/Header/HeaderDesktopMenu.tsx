// add headerProps interface to the component below:

import { HeaderProps } from "./types"

export default function HeaderDesktopMenu({ toggleDarkMode, accessibilityClick, showDesktop, toggleShowDesktop }: HeaderProps) {
    return (
        <div className="user-desktop-icons">
            <div className="user-accesibility user-button dropdown dropdown-toggle">
                {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <i
                    className="material-icons"
                    onClick={
                        toggleShowDesktop
                    }
                >
                    accessibility
                </i>

                <div
                    className={`dropdown-menu dropdown-menu-right ${showDesktop ? "show" : ""
                        }`}
                    style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        willChange: "transform",
                        transform: "translate3d(-164px, 28px, 0px)",
                    }}
                >
                    <p className="dropdown-title">Accesibilidad</p>
                    <ul className="accesibility-menu">
                        <li className="accesibility-menu__item">
                            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                            <div
                                id="modo-oscuro"
                                className="d-flex align-items-center justify-content-between"
                                onClick={toggleDarkMode}
                            >
                                <span className="tipo-de-modo">Modo Oscuro</span>
                                <div className="d-flex justify-content-center">
                                    {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
                                    <a role="button">
                                        <i className="material-icons">brightness_medium</i>
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="accesibility-menu__item">
                            <div className="d-flex align-items-center justify-content-between">
                                <span>Tama&ntilde;o de letra</span>
                                <div className="d-flex justify-content-center">
                                    <button
                                        className="btnDecrease btn btn-round btn-fonts btn-secondary d-flex align-items-center justify-content-center waves-effect waves-light"
                                        onClick={(e) => accessibilityClick(false, e)}
                                    >
                                        <i className="material-icons">remove</i>
                                    </button>
                                    <button
                                        className="btnEnlarge btn btn-round btn-fonts btn-default d-flex align-items-center justify-content-center ml-2 mr-0 waves-effect waves-light"
                                        onClick={(e) => accessibilityClick(true, e)}
                                    >
                                        <i className="material-icons">add</i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="user-logout user-button">
                <a href="https://portales.inacap.cl/">
                    <i className="material-icons">exit_to_app</i>
                </a>
            </div>
        </div>
    )
}
