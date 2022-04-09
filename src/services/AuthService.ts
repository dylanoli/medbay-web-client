
import AuthDTO from "@/models/AuthDTO";
import { api } from ".";

export default class AuthService {

    static async login(auth: AuthDTO) {
        const { data } = await api.post(
            "api/authenticate", auth)
        return data as string;
    }
}