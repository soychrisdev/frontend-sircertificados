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

export default function SelectTipoParticipante({
	id,
	label,
	required,
	data,
	disabled,
	isLoading,
}: SelectProps) {
	const setTipoParticipante = useAppStore((state) => state.setTipoParticipante);

	useEffect(() => {
		if (data) {
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			const chosenSelect = $(`#${id}`) as any;

			const selectTipoUsuario = document.getElementById(
				"select-tipo-usuario",
			) as HTMLSelectElement;

			setTipoParticipante(selectTipoUsuario?.value);

			chosenSelect.trigger("chosen:updated");
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			chosenSelect.chosen().change((e: any) => {
				if (id === "select-tipo-usuario") {
					setTipoParticipante(e.target?.value);
				}
			});

			// if (chosenSelect.length) {
			//     startSelects.chosen({
			//         disable_search_threshold: 10,
			//         no_results_text: "Sin Resultados para: ",
			//         width: "100%",
			//         placeholder_text_single: "Seleccione...",
			//     });
			// }
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
