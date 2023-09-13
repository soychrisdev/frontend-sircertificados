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

export default function SelectAnio({
    id,
    label,
    required,
    data,
    disabled,
    isLoading
}: SelectProps) {

    const setAnio = useAppStore(state => state.setAnio);


    useEffect(() => {
        if (data) {
            const chosenSelect = $(`#${id}`) as any;;

            const selectAnio = document.getElementById(
                "select-tipo-anio",
            ) as HTMLSelectElement;


            setAnio(selectAnio?.value);

            chosenSelect.trigger("chosen:updated");

            chosenSelect.chosen().change((e: any) => {

                if (id === "select-tipo-anio") {
                    setAnio(e.target?.value);
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
