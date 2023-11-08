import { useMutation } from "react-query";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const fetchSendCorreo = async (values: any) => {
	console.log("values: ", values);
	// string p_to, string p_from, string p_subject, string p_text_msg, string p_attach_name, string p_attach_mime, string p_attach_blob, string p_smtp_host, int p_smtp_port
	const params = new URLSearchParams({
		p_rut: values.p_rut,
		p_from: values.p_from,
		p_subject: values.p_subject,
		p_text_msg: values.p_text_msg,
		p_attach_name: values.p_attach_name,
		p_attach_mime: values.p_attach_mime,
		p_attach_blob: values.p_attach_blob,
		p_smtp_host: values.p_smtp_host,
		p_smtp_port: values.p_smtp_port,
	});

	console.log("params: ", params);

	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}/api/enviarCorreo`,
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
		throw new Error(`Se ha producido un errror${JSON.stringify(data)}`);
	}

	return data;
};

export default function useSendCorreo() {
	const { isLoading, isSuccess, mutate } = useMutation(fetchSendCorreo, {
		onSuccess: async () => {
			//@ts-ignore
			toastr.success("Correo enviado correctamente.");
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
