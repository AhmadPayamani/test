export let host = window.location.hostname;
export let port = window.location.port;
export let origin = window.location.origin;
export let frontUrl, backendUrl, socketUrl, socketHttpUrl, liveCameraUrl;
// console.log(window.location)
if (process.env.REACT_APP_MODE === "local") {
    backendUrl = `http://${host}/api`;
} else if (process.env.REACT_APP_MODE === "production") {
    backendUrl = origin + "/api";
} else if (process.env.REACT_APP_MODE === "remote") {

    host = process.env.REACT_APP_REMOTE_IP;
    origin = `http://${host}`;
    backendUrl = origin + "/api";

}
console.log([window.location,process.env.REACT_APP_MODE,host, origin, backendUrl])


export const HomeRoute = "/"
export const UserLoginRoute = "/login"
export const NetworkRoute = "/network-route"
export const UpdateUrlRoute = "/update-url"
export const QrReaderSettingRoute = "/qr-reader/setting"
export const ConsoleDriverConfigRoute = "/console-driver/config"
export const ConsoleDriverSmsFormRoute = "/console-driver/sms-form"
export const QrViewRoute = "/qr-view"
export const GateSettingRoute = "/gate/setting"
export const ConsoleDriverUrlRoute = "/console-driver/url"
export const LicenceGeneratorRoute = "/licence/generator"
export const ConsoleDriverLoginRoute = "/console-driver/login"


export const UserInfoRoute = "/users/info/"
