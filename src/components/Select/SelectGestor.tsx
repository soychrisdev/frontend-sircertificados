import { useEffect } from "react";
import { useAppStore } from "../../store/store";

type SelectProps = {
	id: string;
	required: boolean;
	label: string;
	data: string[] | undefined | null;
	isLoading: boolean;
	disabled: boolean;
};

export default function SelectGestor({
	id,
	label,
	required,
	data,
	disabled,
	isLoading,
}: SelectProps) {
	const setGestor = useAppStore((state) => state.setGestor);

	useEffect(() => {
		if (data) {
			const chosenSelect = $(`#${// rome-ignore lint/suspicious/noExplicitAny: <explanation>
				id}`) as any;

			const selectGestor = document.getElementById(
				"select-tipo-gestor",
			) as HTMLSelectElement;

			setGestor(selectGestor?.value);

			chosenSelect.trigger("chosen:updated");

			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			chosenSelect.chosen().change((e: any) => {
				if (id === "select-tipo-gestor") {
					setGestor(e.target?.value);
				}
			});
		}
	}, [data]);

	if (isLoading) return <div>Cargando...</div>;
	return (
		<>
			<select
				id={id}
				className="chosen-select"
				required={required}
				disabled={disabled}
			>
				{data?.map((value, i) => (
					// rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<option key={i} value={value}>
						{value}
					</option>
				))}
			</select>

			<label htmlFor={id} className="active">
				{label}
			</label>
			{required && (
				<div className="invalid-feedback">*Este campo es requerido</div>
			)}
		</>
	);
}
