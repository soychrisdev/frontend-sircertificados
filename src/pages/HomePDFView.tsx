import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button/Button";
import LoadingOverlayComponent from "../components/LoadingOverlay/LoadingOverlay";
import DynamicPDF from "../components/pdf/DynamicPDF";

import { PDFViewer } from "@react-pdf/renderer";
import useFetchPdfData from "../hooks/useFetchPdfData";

export default function HomePDFView() {
	const params = useParams();
	const { getPDF, data: datapdf, isLoading: isLoadingPdf } = useFetchPdfData();
	useEffect(() => {
		if (params) {
			getPDF(params);
		}
	}, [params]);
	return (
		<div>
			<div className="container">
				<section className="row pb-4">
					<div className="col-12 mb-4">
						<div className="card">
							<div className="card-header">
								<h3 className="h3-responsive">
									{" "}
									<Link to={"/"}>
										<i className="material-icons mr-2 icon-md">arrow_back</i>
									</Link>{" "}
									Gestion de constancia
								</h3>
							</div>

							<div className="card-body ">
								{isLoadingPdf ? (
									<h1>
										{" "}
										<LoadingOverlayComponent /> Buscando pdf...
									</h1>
								) : (
									<>
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
										</div>

										<br />
										<div className="d-flex justify-content-center">
											{
												// @ts-ignore
												datapdf?.length >= 1 ? (
													<PDFViewer width={800} height={500}>


														<DynamicPDF
															//@ts-ignore
															data={datapdf} />
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
