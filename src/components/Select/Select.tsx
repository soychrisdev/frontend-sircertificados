import { useEffect, useCallback } from "react";
import { useAppStore } from "../../store/store";


type SelectProps = {
    id: string;
    required: boolean;
    label: string;
    data: string[] | undefined | null;
    isLoading: boolean;
    disabled: boolean;
};

export default function Select({
    id,
    label,
    required,
    data,
    disabled,
    isLoading
}: SelectProps) {
    const setTipoParticipante = useAppStore(state => state.setTipoParticipante);
    const setGestor = useAppStore(state => state.setGestor);
    const setAnio = useAppStore(state => state.setAnio);
    const startSelects = $(".chosen-select") as any;


    useEffect(() => {
        if (data) {
            const chosenSelect = $(`#${id}`) as any;;

            const selectTipoUsuario = document.getElementById(
                "select-tipo-usuario",
            ) as HTMLSelectElement;
            const selectGestor = document.getElementById(
                "select-tipo-gestor",
            ) as HTMLSelectElement;
            const selectAnio = document.getElementById(
                "select-tipo-anio",
            ) as HTMLSelectElement;

            setTipoParticipante(selectTipoUsuario?.value);

            setGestor(selectGestor?.value);

            setAnio(selectAnio?.value);

            chosenSelect.trigger("chosen:updated");

            chosenSelect.chosen().change((e: any) => {
                if (id === "select-tipo-usuario") {
                    setTipoParticipante(e.target?.value);
                }
                if (id === "select-tipo-gestor") {
                    setGestor(e.target?.value);
                }
                if (id === "select-tipo-anio") {
                    setAnio(e.target?.value);
                }

            });
            if (chosenSelect.length) {
                startSelects.chosen({
                    disable_search_threshold: 10,
                    no_results_text: "Sin Resultados para: ",
                    width: "100%",
                    placeholder_text_single: "Seleccione...",
                });
            }
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
                {
                    data?.map((value, i) => (
                        <option key={i} value={value}
                        >
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
