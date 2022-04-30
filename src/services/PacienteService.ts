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

    static async update(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.put(
            "api/patients/" + pessoa.id, pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async delete(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.delete(
            "api/patients/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async find(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/patients/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async list() {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/patients", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }
}