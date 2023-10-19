import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variante: "primary" | "secondary" | "default";
	text?: string;
	children?: React.ReactNode;
}

export default function Button({
	variante,
	text,
	onClick,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type="button"
			className={`${variante === "primary"
					? "btn-primary"
					: variante === "secondary"
						? "btn-secondary"
						: "btn-default"
				} btn waves-effect waves-light`}
			{...props}
		>
			{children || children}
			<span>{text}</span>
		</button>
	);
}
