import { useState, useEffect } from "react";

export function useAccessibilitySettings() {
	const getThemeFromLocalStorage = () => {
		const storedSettings = localStorage.getItem("theme");
		if (storedSettings) {
			const {
				oscuro,
				fontSize: storedFontSize,
			}: { oscuro: boolean; fontSize: string } = JSON.parse(storedSettings);
			return { oscuro, storedFontSize };
		}
	};

	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const theme = getThemeFromLocalStorage();
		return theme?.oscuro || false;
	});

	const [fontSize, setFontSize] = useState("16px");

	const [show, setShow] = useState({
		showDesktop: false,
		showMobile: false,
	});

	useEffect(() => {
		//TODO: Get the settings from local storage
		const storedSettings = localStorage.getItem("theme");
		if (storedSettings) {
			const { oscuro, fontSize: storedFontSize } = JSON.parse(storedSettings);
			setIsDarkMode(oscuro);
			setFontSize(storedFontSize);
		}
	}, []);

	useEffect(() => {
		// Update the DOM and local storage when settings change
		document.body.classList.toggle("dark", isDarkMode);
		const themePreferences = { oscuro: isDarkMode, fontSize };
		localStorage.setItem("theme", JSON.stringify(themePreferences));
		toggleThemeIcon(isDarkMode);
	}, [isDarkMode, fontSize]);

	const toggleThemeIcon = (isDarkMode: boolean) => {
		if (typeof isDarkMode === "boolean") {
			if (isDarkMode) {
				$(".tipo-de-modo").text("Modo Claro");
				$(".logo-mobile").attr(
					"src",
					"https://www.inacap.cl/web/template-aplicaciones/img/isotipo-blanco.png",
				);
				$(".logo").attr(
					"src",
					"https://www.inacap.cl/web/template-aplicaciones/img/logo-inacap-blanco.png",
				);
			} else {
				$(".tipo-de-modo").text("Modo Oscuro");
				$(".logo-mobile").attr(
					"src",
					"https://www.inacap.cl/web/template-aplicaciones/img/isotipo.png",
				);
				$(".logo").attr(
					"src",
					"https://www.inacap.cl/web/template-aplicaciones/img/logo-inacap.png",
				);
			}
		}
	};

	const accessibilityClick = (increase: boolean, e: React.MouseEvent) => {
		e?.stopPropagation();

		const body = document.body;
		const classList = body.className ? body.className.split(/\s+/) : [];
		const filtered = classList.filter(function (str: string) {
			return str.includes("body-large");
		});

		if (increase) {
			switch (filtered.length) {
				case 0:
					body.classList.add("body-large");
					filtered.push("body-large");
					break;
				case 1:
					body.classList.add("body-large-1");
					filtered.push("body-large-1");
					break;
				case 2:
					body.classList.add("body-large-2");
					filtered.push("body-large-2");
					break;
			}
		} else {
			let index = -1;

			switch (filtered.length) {
				case 1:
					body.classList.remove("body-large");
					index = filtered.indexOf("body-large");
					break;
				case 2:
					body.classList.remove("body-large-1");
					index = filtered.indexOf("body-large-1");
					break;
				case 3:
					body.classList.remove("body-large-2");
					index = filtered.indexOf("body-large-2");
					break;
			}

			if (index > -1) {
				filtered.splice(index, 1);
			}
		}

		window.dispatchEvent(new Event("resize"));
	};
	return {
		isDarkMode,
		toggleDarkMode: () => setIsDarkMode((prev) => !prev),
		toggleShowMobile: () =>
			setShow((prev) => ({ ...prev, showMobile: !prev.showMobile })),
		toggleShowDesktop: () =>
			setShow((prev) => ({ ...prev, showDesktop: !prev.showDesktop })),
		fontSize,
		setFontSize,
		showDesktop: show.showDesktop,
		showMobile: show.showMobile,
		accessibilityClick,
	};
}
