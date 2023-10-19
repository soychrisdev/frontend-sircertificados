import { useAppStore } from "../store/store";
import useFetchBuscaConstanciasInternas, {
	ConstanciasBuscarInterface,
} from "./useFetchBuscaConstanciasInternas";
import useFetchGestorVinculoInterna from "./useFetchGestorVinculoInterna";

export default function useSubmitForm() {
	const rut = useAppStore((state) => state.rut);
	const gestorValue = useAppStore((state) => state.gestor);
	const tipoParticipanteValue = useAppStore((state) => state.tipoParticipante);
	const anioValue = useAppStore((state) => state.anio);
	const { data: dataGestorVinculos } = useFetchGestorVinculoInterna();

	const { enviarForm, isLoading, data, isSuccess } =
		useFetchBuscaConstanciasInternas();

	const handleSubmitForm = (e: Event) => {
		e.preventDefault();
		if (!gestorValue || !tipoParticipanteValue || !anioValue) {
			//@ts-ignore
			return toastr.error("Valores invalidos");
		}

		//TODO: UNCOOMENT IT
		// if (!validateRut(rut || "")) {
		//   //@ts-ignore
		//   return toastr.error(
		//     "El rut no es valido.",
		//   );
		// }

		if (rut && gestorValue && tipoParticipanteValue && anioValue) {
			const sendValues: ConstanciasBuscarInterface = {
				//remove - from rut
				//remove - from rut and last digit and add it to the end

				i_rut: rut.replace("-", "").slice(0, -1),
				i_tpart: tipoParticipanteValue,
				i_seun_ccod: dataGestorVinculos
					?.find((item) => item.SEUN_TNOMBRE === gestorValue)
					?.SEUN_CCOD.toString(),
				i_anio: anioValue,
			};
			return enviarForm(sendValues);
		}
	};

	return {
		handleSubmitForm,
		isLoading,
		data,
		isSuccess,
	};
}
