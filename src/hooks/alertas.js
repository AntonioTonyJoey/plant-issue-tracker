import Swal from "sweetalert2";
import toastr from "toastr"
import 'toastr/build/toastr.css';

export const mensajeDeError = (mensaje, titulo) => {
    Command: toastr["warning"](mensaje, titulo)
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }

  export const ventanaComentario = async () => {
    const { value: comentario } = await Swal.fire({
      title: "Introduce el Comentario",
      input: "text",
      showCancelButton: false,
      confirmButtonColor:"#262254",
      inputValidator: (value) => {
        if (!value) {
          return "Es necesario el comentario!";
        }
      },
    });
    if (comentario) {
      return comentario; 
    } else {
      return "";
    }
  };

  export const ventanaFormularioSisterPlant = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Formulario de información',
      html: `
        <input id="modulo" class="swal2-input" placeholder="Módulo">
        <input id="modelo" class="swal2-input" placeholder="Modelo">
        <input id="planta" class="swal2-input" placeholder="Planta hermana">
        <input id="correo1" class="swal2-input" placeholder="Correo 1 (obligatorio)">
        <input id="correo2" class="swal2-input" placeholder="Correo 2 (opcional)">
        <input id="correo3" class="swal2-input" placeholder="Correo 3 (opcional)">
      `,
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#262254',
      preConfirm: () => {
        const modulo = document.getElementById('modulo').value.trim();
        const modelo = document.getElementById('modelo').value.trim();
        const planta = document.getElementById('planta').value.trim();
        const correo1 = document.getElementById('correo1').value.trim();
        const correo2 = document.getElementById('correo2').value.trim();
        const correo3 = document.getElementById('correo3').value.trim();
  
        const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
  
        if (!modulo || !modelo || !planta || !correo1) {
          Swal.showValidationMessage('Todos los campos excepto correo 2 y 3 son obligatorios');
          return false;
        }
  
        if (!emailRegex.test(correo1)) {
          Swal.showValidationMessage('Correo 1 no es válido');
          return false;
        }
  
        if (correo2 && !emailRegex.test(correo2)) {
          Swal.showValidationMessage('Correo 2 no es válido');
          return false;
        }
  
        if (correo3 && !emailRegex.test(correo3)) {
          Swal.showValidationMessage('Correo 3 no es válido');
          return false;
        }
  
        return {
          modulo,
          modelo,
          planta,
          correos: [correo1, correo2, correo3].filter(c => c) // elimina vacíos
        };
      }
    });
  
    if (formValues) {
      return formValues;
    } else {
      return null;
    }
  };
  export const showTSODiscrepancyList = (dataArray) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Sin discrepancias',
            text: 'No se encontraron discrepancias para la serie solicitada.',
        });
        return;
    }

    const tableRows = dataArray.map((item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.veH_SER_NO}</td>
            <td>${item.founD_INSP_TEAM}</td>
            <td>${item.insP_ID.trim()}</td>
            <td>${item.insP_DSCREP_DESC.trim()}</td>
            <td>${item.rpaR_ID.trim()}</td>
            <td>${item.rpaR_TS}</td>
            <td>${item.appR_ID.trim()}</td>
            <td>${item.appR_TS}</td>
            <td>${item.tS_LOAD}</td>
            <td>${item.insP_COMT}</td>
        </tr>
    `).join('');

    Swal.fire({
        title: 'Discrepancias encontradas',
        width: '85%',
        html: `
            <div style="max-height: 400px; overflow-y: auto;">
                <table class="compact-table" border="1" cellpadding="5" cellspacing="0" style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Serie</th>
                            <th>Equipo Inspección</th>
                            <th>Inspector</th>
                            <th>Descripción</th>
                            <th>Responsable</th>
                            <th>Fecha Reparación</th>
                            <th>Aprobador</th>
                            <th>Fecha Aprobación</th>
                            <th>Fecha Carga</th>
                            <th>Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        `,
        customClass: {
          popup: 'swal-right'
        },
        showConfirmButton: true,
        confirmButtonText: 'Cerrar',
    });
};
export const ventanaMostrarSisterPlant = async (info) => {
  const { modulo, modelo, plantaHermana, correo, ts_Load, id_Rechazo } = info;

  await Swal.fire({
    title: 'Información del Rechazo',
    html: `
      <div style="text-align: left; font-size: 14px;">
        <p><strong>Módulo:</strong> ${modulo?.trim()}</p>
        <p><strong>Modelo:</strong> ${modelo?.trim()}</p>
        <p><strong>Planta hermana:</strong> ${plantaHermana}</p>
        <p><strong>Correos:</strong><br>${correo.split(',').map(c => `• ${c.trim()}`).join('<br>')}</p>
        <p><strong>Fecha de carga:</strong> ${new Date(ts_Load).toLocaleString()}</p>
        <p><strong>ID Rechazo:</strong> ${id_Rechazo}</p>
      </div>
    `,
    confirmButtonText: 'Cerrar',
    confirmButtonColor: '#262254'
  });
};
