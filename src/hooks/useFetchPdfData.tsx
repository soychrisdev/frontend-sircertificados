import { useMutation } from "react-query";
import { MESSAGES } from "../utils/types";

export interface Props {
	PVCM_TTIPO_BENEFICIARIO: any;
	PERS_NRUT: number;
	NOMBRE_COMPLETO: string;
	PROGRAMA_ESTUDIO: string;
	AREA_ACADEMICA: string;
	ID_PLANIFICACION: number;
	PROGRAMA: string;
	INICIATIVA: string;
	ACCION: string;
	FECHA_INICIO: string;
	FECHA_TERMINO: string;
	DIRECTOR_VCM: any;
	FECHA_EMISION: string;
	SEDE_ACCION: string;
	ANOS_CCOD: number;
}

const fetchPdfData = async (value: any) => {
	console.log(value);
	const searchParams = new URLSearchParams({
		i_rut: value.i_rut,
		i_tpart: value.i_tpart,
		i_seun_ccod: value.i_seun_ccod,
	});

	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}/api/GetAccionesRutPDF`,
		{
			method: "POST",
			body: searchParams,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
		},
	);
	const data: Props[] & { Message: string } = await response.json();

	if (!response.ok) {
		throw new Error(
			MESSAGES.CONSTANCIA_NO_ENVIADA + JSON.stringify(data?.Message),
		);
	}
	return data;
};
export default function useFetchPdfData() {
	const {
		mutate: getPDF,
		error,
		data,
		isLoading,
		isSuccess,
		isIdle,
	} = useMutation(fetchPdfData, {
		onSuccess: async () => {
			//@ts-ignore
			// toastr.success(MESSAGES.CONSTANCIA_ENVIADA);
		},
		onError: (error) => {
			// If there was an error, revert the optimistic update
			//@ts-ignore
			toastr.error(error);
		},
		onSettled: () => {},
	});

	return {
		getPDF,
		isLoading,
		data,
		error,
		isSuccess,
		isIdle,
	};
}
