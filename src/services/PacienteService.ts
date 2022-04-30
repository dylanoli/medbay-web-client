import PessoaDTO from "@/models/PessoaDTO";
import { api } from ".";

export default class PacienteService {

    static async create(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.post(
            "api/patients", pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }
}