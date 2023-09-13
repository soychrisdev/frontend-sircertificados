// import $ from "jquery"; // Import jQuery if needed
import { useEffect, useRef } from "react";

import LoadingOverlayComponent from "../LoadingOverlay/LoadingOverlay";


const DataTableComponent = ({ data, isLoading, isSuccess }) => {


	//@ts-ignore	
	const tableRef = useRef();
	useEffect(() => {
		//@ts-ignore
		let dataTableInstanceRef: DataTables.Api | null = null;

		if (data) {
			const newDataWithObjectValues = data?.map((item) => Object.values(item));
			console.log("new: ", newDataWithObjectValues)

			const initializeDataTable = () => {
				if (tableRef.current) {
					// Initialize DataTable only once
					//@ts-ignore
					dataTableInstanceRef = $(tableRef.current).DataTable({
						dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
						data: newDataWithObjectValues,
						columns: [
							{ title: 'PLAN_NCORR' },
							{ title: 'PVCM_NRUT_PERSONA' },
							{ title: 'PVCM_TTIPO_BENEFICIARIO' },
							{ title: 'SEUN_TNOMBRE' },
							{ title: 'PLAN_NANO' },
							{ title: 'PROG_TNOMBRE' },
							{ title: 'INCIATIVAORFORMATO' },
							{ title: 'ACCIONORNOMBRE' },
							{ title: 'PROG_XEXTENSION' },
							{ title: 'SEUN_NCORR_GESTOR' },
							{ title: 'ACCI_BEMITE_CERT' }
						],
						scrollY: "60vh",
						scrollX: true,
						lengthMenu: [
							[20, 30, 40, -1],
							[20, 30, 40, "Todas"],
						],
						aaSorting: [],
						destroy: true,

						// Add more options here as needed
					});
				}

			};
			initializeDataTable();
		}

		return () => {
			// Clean up by destroying the DataTable instance
			if (dataTableInstanceRef) {
				dataTableInstanceRef.destroy();
			}
		};

	}, [data, isSuccess]);

	if (isLoading) return <LoadingOverlayComponent />;

	return (
		<div className="mt-4 expand_less" id="resultados">
			<div className="card-body">
				<div className="row mt-2">
					<div className="col-12">
						<table
							id="TablaResultados"
							className="datatables table table-hover table-striped table-bordered m-0"
							ref={tableRef}

						>	</table>


					</div>
				</div>
			</div>
		</div>
	);
};

export default DataTableComponent;
