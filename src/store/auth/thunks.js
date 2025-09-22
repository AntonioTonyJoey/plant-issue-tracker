import moment from "moment";
import { aunthApi, peticionAuth, peticionGetLogin, peticionSaveLogin, peticionSaveVisit, peticionUpdateLogin } from "../../api/authApi";
import { checkingCredentials, login, logout } from "./";

export const getAuth = ({user, pwd}) =>{
    const userLogin = {
        user: user.toUpperCase().trim(),
        pwd: pwd
    };
    peticionAuth.data = userLogin;
    return async(dispach, getState) => {
        dispach(checkingCredentials());
        //peticion para validar WIW y contraseña
        const {data} = await aunthApi(peticionAuth);
        const existeRol = data.roles.find(item => item.program.trim() === "VENDOR");
        const rolVendor = existeRol ? existeRol.roles[0] : "General";

        if(!data.active.isValid) return dispach(logout({errorMessage:"Wiw o Contraseña invalido"}));

        const item = {
            Wiw: data.active.wiw,
            Email: data.active.email,
            Phone: data.active.phone,
            Name: data.active.fullName,
            Rol: rolVendor,
            IsActive: true,
            Ts_Load: moment()
        };
        peticionSaveLogin.data = JSON.stringify(item);
        const dataLogin = await aunthApi(peticionSaveLogin);
        window.sessionStorage.setItem("wiw", data.active.wiw);

        dispach(login({
            wiw: data.active.wiw,
            email: data.active.email,
            phone:data.active.phone,
            displayName:data.active.fullName,
            rol: rolVendor
        }));

    }
};
export const validateTimeLogin = (Wiw) => {
    return async(dispach, getState) => {
        dispach(checkingCredentials());
        if(Wiw == null){
            dispach(logout({errorMessage:"No Session"}));
        }else{
            peticionGetLogin.data = Wiw;
            const {data} = await aunthApi(peticionGetLogin);
            (data.length > 0 ) 
                ? dispach(login({
                    wiw: data[0].wiw,
                    email: data[0].email,
                    phone: data[0].phone,
                    displayName: data[0].name,
                    rol: data[0].rol
                }))
                : dispach(logout({errorMessage:"Session Expired"}));
            }
    }
}
export const logOutDB = (Wiw) => {
    return async(dispach, getState) => {
        peticionGetLogin.data = Wiw;
        const {data} = await aunthApi(peticionGetLogin);
        const noItems = data.length;
        console.log(data)
        switch(noItems){
            case 0:
                dispach(logout({errorMessage:"Not Session"}));
                break;
            case 1:
                data[0].IsActive = 0;
                peticionUpdateLogin.data = JSON.stringify(data[0]);
                const {data:item} = await aunthApi(peticionUpdateLogin);
                dispach(logout({errorMessage:"Logout"}));
                break;
            default:
                data.forEach(async element => {
                    element.IsActive = 0;
                    peticionUpdateLogin.data = JSON.stringify(element);
                    const {data:item} = await aunthApi(peticionUpdateLogin);
                });
                dispach(logout({errorMessage:"Logout Multiple Sessions"}));
                break;
        }
    }
}
export const saveVisit = () => {
    return async(dispach, getState) => {
        const {data} = await aunthApi(peticionSaveVisit);
    }
}