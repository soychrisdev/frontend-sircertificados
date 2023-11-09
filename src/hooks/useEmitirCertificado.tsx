import { useMutation } from "react-query";
import { MESSAGES } from "../utils/types";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const fetchEmitirCertificado = async (valuesArray: any) => {
	console.log("valuesArray: ", valuesArray);

	const results = await Promise.all(valuesArray.map(async (value: any) => {
		const params = new URLSearchParams({
			i_plan_ncorr: value.i_plan_ncorr,
			i_tipo_cert: value.i_tipo_cert,
			i_pvcm_ncorr: value.i_pvcm_ncorr,
			i_audi_tusuario: value.i_audi_tusuario,
			i_cod_firmante: value.i_cod_firmante, //usuario authenticado en la app, en mi caso yo pero devuelve el codigo desde userdata.codigo //90010220
		});

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
	}));

	return results;
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
