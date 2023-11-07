import {http} from "../http-common";

class LoginService {

    login(data) {
        return http.post("/auth/login", data);
    }
    logout(){
        localStorage.removeItem("user");
    }


}


export default new LoginService();