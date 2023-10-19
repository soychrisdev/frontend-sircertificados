import { useMutation } from "react-query";
import { MESSAGES } from "../utils/types";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const fetchEmitirCertificado = async (values: any) => {
	console.log("values: ", values);

	const params = new URLSearchParams({
		i_plan_ncorr: values[0].i_plan_ncorr, //27741
		i_tipo_cert: "2", // 2
		i_pvcm_ncorr: values[0].i_pvcm_ncorr, /// PVCM_NCORR 27741
		i_audi_tusuario: values[0].i_audi_tusuario, //rut del usuario en cuestion PVCM_NRUT_PERSONA 21585143
		i_cod_firmante: values[0].i_cod_firmante, //usuario authenticado en la app, en mi caso yo pero devuelve el codigo desde userdata.codigo //90010220
	});

	console.log("params: ", params);
	console.log(JSON.stringify(params));

	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}/api/emitirConstancia`,
		{
			method: "POST",
			body: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(MESSAGES.CONSTANCIA_NO_ENVIADA + JSON.stringify(data));
	}

	return data;
};

export default function useEmitirCertificado() {
	const { isLoading, isSuccess, mutate } = useMutation(fetchEmitirCertificado, {
		onSuccess: async () => {
			//@ts-ignore
			toastr.success(MESSAGES.CONSTANCIA_EMITIDA);
		},
		onError: (error) => {
			//@ts-ignore
			toastr.error(error);
		},
		onSettled: () => { },
	});

	return {
		isLoading,
		isSuccess,
		mutate,
	};
}
