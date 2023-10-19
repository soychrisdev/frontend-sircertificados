import { useAccessibilitySettings } from "../../hooks/useAccessibilitySettings";
import HeaderLogo from "./HeaderLogo";
import HeaderMenuMobile from "./HeaderMenuMobile";
import HeaderDesktopMenu from "./HeaderDesktopMenu";
import useFetchUserData from "../../hooks/useFetchUserData";

export default function Header() {
	const {
		toggleDarkMode,
		showDesktop,
		showMobile,
		toggleShowDesktop,
		toggleShowMobile,
		accessibilityClick,
	} = useAccessibilitySettings();

	const { data: userData, isLoading } = useFetchUserData();
	return (
		<header className="header">
			<div className="header-container">
				<HeaderLogo />

				<div className="header-title">
					<h1 id="title">Constancias Internas</h1>
				</div>

				<div className="user-info">
					<div className="user-name mr-4">
						<p>{isLoading ? "Cargando..." : userData?.name}</p>
					</div>
					<HeaderMenuMobile
						toggleDarkMode={toggleDarkMode}
						accessibilityClick={accessibilityClick}
						showMobile={showMobile}
						toggleShowMobile={toggleShowMobile}
						data={userData}
					/>
					<HeaderDesktopMenu
						toggleDarkMode={toggleDarkMode}
						accessibilityClick={accessibilityClick}
						showDesktop={showDesktop}
						toggleShowDesktop={toggleShowDesktop}
						data={userData}
					/>
				</div>
			</div>
		</header>
	);
}
