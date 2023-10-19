type CardProps = {
	children: React.ReactNode;
}

function Card({ children }: CardProps) {
	return (
		<div className="card mb-4" id="buscar">
			<div
				className="accordion md-accordion"
				id="accordionEst"
				role="tablist"
				aria-multiselectable="true"
			>
				<div className="accordion-item">{children}</div>
			</div>
		</div>
	);
}

function CardHeader() {
	return (
		<div
			className="accordion-header border-top-0 p-0"
			role="tab"
			id="headingEst0"
		>
			<a
				id="header-buscar"
				data-toggle="collapse"
				data-parent="#accordionEst"
				href="#collapseEst0"
				aria-expanded="false"
				aria-controls="collapseEst0"
			>
				<h4 className="heading h4-responsive mb-0">
					"TITULO"
					<span className="accordion-arrow">
						<i className="material-icons rotate-icon float-right">
							keyboard_arrow_down
						</i>
					</span>
				</h4>
			</a>
		</div>
	);
}

function CardBody() {
	return (
		<div
			id="collapseEst0"
			className="collapse show mt-2"
			role="tabpanel"
			aria-labelledby="headingEst0"
			data-parent="#accordionEst"
		>
			<div className="accordion-body pt-4 pb-2 ">
				<div className="row mb-2">BODY</div>
			</div>
		</div>
	);
}

function CardFooter() {
	return (
		<div className="accordion-footer">
			<div className="row">
				<div className="col-12 justify-content-end" style={{ display: "grid" }}>
					FOOTER
				</div>
			</div>
		</div>
	);
}

export default {
	Card,
	CardHeader,
	CardFooter,
	CardBody,
};
