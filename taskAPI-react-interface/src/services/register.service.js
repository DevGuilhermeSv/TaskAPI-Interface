import { http } from "../http-common";
class RegisterService{
    Register(body){
        return http.post('/users/register',body);
    }
}
export default new RegisterService();