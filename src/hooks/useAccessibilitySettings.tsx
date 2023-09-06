import { useState, useEffect } from 'react';

export function useAccessibilitySettings() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState('16px');
    const [showDesktop, setShowDesktop] = useState(false);

    useEffect(() => {
        // Load settings from local storage or use default values
        const storedSettings = localStorage.getItem('theme');
        if (storedSettings) {
            const { oscuro, fontSize: storedFontSize } = JSON.parse(storedSettings);
            setIsDarkMode(oscuro);
            setFontSize(storedFontSize);
        }
    }, []);

    useEffect(() => {
        // Update the DOM and local storage when settings change
        document.body.classList.toggle('dark', isDarkMode);
        const themePreferences = { oscuro: isDarkMode, fontSize };
        localStorage.setItem('theme', JSON.stringify(themePreferences));
    }, [isDarkMode, fontSize]);

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
        fontSize,
        setFontSize,
        showDesktop,
        setShowDesktop,
        accessibilityClick
    };
}
