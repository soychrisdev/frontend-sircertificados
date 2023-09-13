export interface HeaderProps {
    toggleDarkMode: () => void;
    accessibilityClick: (increase: boolean, e: React.MouseEvent) => void;
    showDesktop?: boolean;
    showMobile?: boolean;
    toggleShowMobile?: () => void;
    toggleShowDesktop?: () => void;
}

