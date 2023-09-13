import useFetchParticipantes from "../hooks/useFetchParticipantes"
import useFetchAniosConstancias from "../hooks/useFetchAniosConstancias";
import useFetchGestorVinculoInterna from "../hooks/useFetchGestorVinculoInterna";
import InputRutValidator from "../components/Input/InputRutValidator";
import useFetchBuscaConstanciasInternas from "../hooks/useFetchBuscaConstanciasInternas";
import DataTableComponent from "../components/Table/TablaResultados";
import { ExportToExcel } from "../utils/ExportToExcel";
import SelectTipoParticipante from "../components/Select/SelectTipoParticipante";
import useSubmitForm from "../hooks/useSubmitForm";
import SelectGestor from "../components/Select/SelectGestor";
import SelectAnio from "../components/Select/SelectAnio";
function Home() {

  const { data: dataParticipantes, isLoading: isLoadingParticipante } = useFetchParticipantes();
  const { data: dataAniosConstancias, isLoading: isLoadingConstancias } = useFetchAniosConstancias();
  const { data: dataGestorVinculos, isLoading: isLoadingVinculos } = useFetchGestorVinculoInterna();

  const { handleSubmitForm, isLoading, data, isSuccess } = useSubmitForm()
  console.log('render home')

  return (
    <>
      <div className="card mb-4" id="buscar">
        <div className="accordion md-accordion" id="accordionEst" role="tablist" aria-multiselectable="true">
          <div className="accordion-item">

            <div className="accordion-header border-top-0 p-0" role="tab" id="headingEst0">
              <a id="header-buscar" data-toggle="collapse" data-parent="#accordionEst" href="#collapseEst0" aria-expanded="false" aria-controls="collapseEst0">
                <h4 className="heading h4-responsive mb-0">
                  Consulta de constancias internas
                  <span className="accordion-arrow"><i className="material-icons rotate-icon float-right">keyboard_arrow_down</i></span>
                </h4>
              </a>
            </div>

            <div id="collapseEst0" className="collapse show mt-2" role="tabpanel" aria-labelledby="headingEst0" data-parent="#accordionEst">
              <div className="accordion-body pt-4 pb-2 ">

                <div className="row mb-2">

                  <div className="col-12 col-md-4">
                    <div className="md-form mb-3">
                      <InputRutValidator />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="md-form">

                      <SelectTipoParticipante
                        id="select-tipo-usuario"
                        label="Docente/ Estudiante/ Administrativo (*)"
                        data={dataParticipantes?.map((item) => item.TIPO_PARTICIPANTE)}
                        isLoading={isLoadingParticipante}
                        required={true}
                        disabled={false}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="md-form">
                      <SelectGestor
                        id="select-tipo-gestor"
                        label="Seleccione gestor (*)"
                        data={dataGestorVinculos?.map((item) => item.SEUN_TNOMBRE)}
                        isLoading={isLoadingVinculos}
                        required={true}
                        disabled={false}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="md-form">
                      <SelectAnio
                        id="select-tipo-anio"
                        label="Seleccione a&ntilde;o (*)"
                        data={dataAniosConstancias?.map((item) => item.ANIO)}
                        isLoading={isLoadingConstancias}
                        required={true}
                        disabled={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-footer">
                <div className="row">
                  <div className="col-12 justify-content-end" style={{ display: "grid" }}>
                    <button id="btnBuscar" className="btn btn-default waves-effect waves-light" onClick={(e: any) => handleSubmitForm(e)}>
                      <span>Buscar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="card mb-4" id="resultados" >

        <div className="card-header">

          <div className="row">

            <div className="col-12 d-flex align-items-end justify-content-between">
              <h4 className="float-left heading h4-responsive mb-0">Resultado Constancias Internas</h4>
              {data?.length > 0 && <ExportToExcel apiData={data} fileName={Date.now()} />}


            </div>

          </div>

        </div>

        <div className="card-body">


          <div className="row">
            <div className="col-12">

              <DataTableComponent data={data} isLoading={isLoading} isSuccess={isSuccess} />



            </div>
          </div>
        </div>

        <div className="card-footer">

          <div className="row mt-4">

            <div className="col d-flex justify-content-end">
              <button type="button" className="btn btn-secondary waves-effect waves-light">
                <span>Emitir Constancias</span>
              </button>
              <button type="button" className="btn btn-default waves-effect waves-light">
                <span>Enviar por Correo</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default Home
