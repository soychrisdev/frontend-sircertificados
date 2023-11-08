import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import LoadingOverlayComponent from "../components/LoadingOverlay/LoadingOverlay";
import DynamicPDF from "../components/pdf/DynamicPDF";

import { PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import useFetchPdfData from "../hooks/useFetchPdfData";
import useSendCorreo from "../hooks/useSendCorreo";



export default function HomePDFView() {
	const params = useParams();
	// read state passed from react router link
	const { getPDF, data: datapdf, isLoading: isLoadingPdf } = useFetchPdfData();
	//@ts-ignore
	const [instance, updateInstance] = usePDF({ document: <DynamicPDF data={datapdf} /> });
	const [base64Data, setBase64Data] = useState<string | null>(null);

	const { mutate: sendCorreo, isLoading: isLoadingCorreo } = useSendCorreo();

	useEffect(() => {
		if (params) {
			getPDF(params);
		}

	}, [params]);

	useEffect(() => {
		//@ts-ignore
		updateInstance(<DynamicPDF data={datapdf} />)
	}, [datapdf]);


	useEffect(() => {
		const convertBlobToBase64 = async (blobUrl: string | null) => {
			if (!blobUrl) {
				setBase64Data(null);
				return;
			}

			try {
				const response = await fetch(blobUrl);
				const blob = await response.blob();

				const reader = new FileReader();
				reader.onload = () => {
					const base64Result = reader.result as string;
					setBase64Data(base64Result);
				};

				reader.readAsDataURL(blob);
			} catch (error) {
				console.error('Error converting blob to base64:', error);
				setBase64Data(null);
			}
		};

		convertBlobToBase64(instance.url);

		return () => {
			setBase64Data(null);
		}
	}, [instance.url]);

	const handleEnviarCorreo = () => {


		const values = {
			p_rut: params.i_rut,
			p_from: "inacap@inacap.cl",
			p_subject: "Envio de constancia",
			p_text_msg: `
Estimado(a) ${datapdf?.map((value) => value.NOMBRE_COMPLETO).toString()}, 
			
Se adjunta Constancia de participación interna por su participación en la actividad ${datapdf?.map((value) => value.ACCION).toString()}. 
			
Saluda cordialmente, Equipo VcM`,
			p_attach_name: `Constancia Participacion Interna - ${params.i_rut}.pdf`,
			p_attach_mime: "application/pdf",
			p_attach_blob: base64Data,
			p_smtp_host: "smtp.inacap.cl",
			p_smtp_port: 25,
		}

		sendCorreo(values);

	}


	return (
		//code
		<div>
			{isLoadingCorreo && <LoadingOverlayComponent />}
			<div className="container">

				{/* {JSON.stringify(instance.blob)} */}
				<section className="row pb-4">
					<div className="col-12 mb-4">
						<div className="card">
							<div className="card-header">
								<h3 className="h3-responsive">
									{" "}
									<Link to={"/Inacap.SIRI.ConstanciasInternas"}>
										<i className="material-icons mr-2 icon-md">arrow_back</i>
									</Link>{" "}
									Gestion de constancia
								</h3>
							</div>

							<div className="card-body ">
								{isLoadingPdf ? (
									<h1>

										<LoadingOverlayComponent /> Buscando pdf...
									</h1>
								) : (
									<>
										{/* {
											base64Data
										} */}
										<div className="d-flex justify-content-center">
											{

												// @ts-ignore
												datapdf?.length >= 1 ? (
													<PDFDownloadLink
														//@ts-ignore
														document={<DynamicPDF data={datapdf} />}
														fileName={Date.now().toString()}
													>
														{({ loading, error }) => (
															<Button
																variante="default"
																text={
																	loading
																		? "loading..."
																		: "Descargar constancia"
																}
																disabled={!error}
															>
																<i className="material-icons mr-2 icon-md">
																	arrow_downward
																</i>
															</Button>
														)}
													</PDFDownloadLink>
												) : null
											}

											{
												// @ts-ignore
												datapdf?.length >= 1 ? (
													<button type="button" className="btn-default btn waves-effect waves-light" onClick={() => handleEnviarCorreo()}>
														<i className="material-icons mr-2 icon-md">
															mail
														</i> Enviar Correo
													</button>
												) : null
											}

										</div>

										<br />
										<div className="d-flex justify-content-center">
											{
												// @ts-ignore
												datapdf?.length >= 1 ? (
													<PDFViewer width={800} height={500} >

														<DynamicPDF
															//@ts-ignore
															data={datapdf}

														/>
													</PDFViewer>
												) : null
											}
										</div>

										<div className="d-flex justify-content-center">
											{
												// @ts-ignore
												datapdf?.length >= 1 || (
													<h3 className="h4-responsive">
														No existe constancia generada, favor genere una
														constancia primero o intente con otros valores.
													</h3>
												)
											}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
