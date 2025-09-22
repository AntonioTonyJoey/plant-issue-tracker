
export const validacionesLogin = {
    user: [(value) => (value.length >= 1), "Colocar WIW"],
    pwd: [(value) => value.length >= 1, "Colocar contraseña"],
  }

export const validacionesChecklist = {
    folio: [(value) => (value.length >= 5), "Colocar Folio"],
    numeroP: [(value) => (value.length >= 4), "Colocar Numero de Parte"],
    desc: [(value) => (value.length >= 1), "Colocar Descripcion"],
    Pieza: [(value) => (value != ''), "Cargar Imagen de la Pieza Completa"],
    Defecto: [(value) => (value != ''), "Cargar Imagen del Defecto"],
    Etiqueta: [(value) => (value != ''), "Cargar Imagen de la Etiqueta de Identificacion Individual"],
    Tarjeta: [(value) => (value != ''), "Cargar Imagen Tarjeta Roja de Rechazo"]
  }

export const validacionesFolio ={
  folio: [(value) => (value.length >= 6), "Colocar Folio"]
}

export const objetoFormularioChecklist = {
    folio: '',
    numeroP: '',
    desc: '',
    Pieza: '',
    Defecto: '',
    Etiqueta: '',
    QR: '',
    DOT: '',
    Pantalla: '',
    Modo: '',
    Label: '',
    Tarjeta: ''
  }

  export const objetoRechazo = {
    Id: 0,
    Folio: '',
    NoParte: '',
    Descripcion: '',
    Ts_Load: '',
    Wiw: '',
    NoRechazo: '',
    Aceptado: false,
    Ts_Status: '',
    Archivos : [],
  }

  export const objetoArchivo = {
    Id: 0,
    Nombre: '',
    Ext: '',
    Id_Rechazo: 0,
    Id_Evidencia: 0,
    Aprobado: true,
    Comentario: '',
    Wiw: '',
    Ts_Load: '',
  }

  export const arrayNavegacion = [
    {
      Nombre: 'CheckList',
      Descripcion: 'Toma de evidencias',
      StatusNav: 'checklist',
      Privilegios: ['General', 'Almacen']
    },
    {
      Nombre: 'BlockStore',
      Descripcion: 'Verificacion de evidencias',
      StatusNav: 'blockstore',
      Privilegios: ['Almacen']
    },
    {
      Nombre: 'FeedBack',
      Descripcion: 'Revision de evidencias retornadas',
      StatusNav: 'feedback',
      Privilegios: ['General', 'Almacen']
    },
    {
      Nombre: 'Sister Plants',
      Descripcion: 'Revision de rechazos virtuales',
      StatusNav: 'sisterPlant',
      Privilegios: ['General', 'Almacen']
    },
    {
      Nombre: 'Mail',
      Descripcion: 'Listado de rechazos sin QRN',
      StatusNav: 'pruebas',
      Privilegios: ['General', 'Almacen']
    }
  ]

  export const emailsBlockStore = [
    "miguel.esteves@daimlertruck.com",
    "karla_patricia.hernandez@daimlertruck.com",
    "brandon.martinez@daimlertruck.com",
    "adan.rosas@daimlertruck.com"
  ]