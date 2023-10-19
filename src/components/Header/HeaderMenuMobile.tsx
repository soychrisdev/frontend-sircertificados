import { HeaderProps } from "./types";

export default function HeaderMenuMobile({
	toggleDarkMode,
	accessibilityClick,
	showMobile,
	toggleShowMobile,
	data,
}: HeaderProps) {
	return (
		<div className={"user-mobile-menu user-button dropdown dropdown-toggle"}>
			<i className="material-icons " onClick={toggleShowMobile}>
				more_vert
			</i>

			<div
				className={`dropdown-menu dropdown-menu-right ${
					showMobile ? "show" : ""
				}`}
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					willChange: "transform",
					transform: "translate3d(-164px, 28px, 0px)",
				}}
			>
				<p className="dropdown-user-name">
					<span>{data?.name}</span>
				</p>
				<p className="dropdown-title dropdown-title--border">Accesibilidad</p>

				<ul className="accesibility-menu">
					<li className="accesibility-menu__item">
						<div
							id="modo-oscuro"
							className="d-flex align-items-center justify-content-between"
							onClick={toggleDarkMode}
						>
							<span className="tipo-de-modo">Modo Oscuro</span>
							<div className="d-flex justify-content-center">
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

				<p className="dropdown-title dropdown-title--border">Cuenta</p>
				<ul className="accesibility-menu">
					<li className="accesibility-menu__item">
						<div className="d-flex align-items-center justify-content-between">
							<span id="tipo-de-modo">Cerrar Sesi&oacute;n</span>
							<div className="d-flex justify-content-center">
								<a role="button">
									<i className="material-icons">exit_to_app</i>
								</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
