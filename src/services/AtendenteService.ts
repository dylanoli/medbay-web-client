import PessoaDTO from "@/models/PessoaDTO";
import { api } from ".";

export default class AtendenteService {

    static async create(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.post(
            "api/attendants", pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async update(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.put(
            "api/attendants/" + pessoa.id, pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async delete(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.delete(
            "api/attendants/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async find(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/attendants/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async list() {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/attendants", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data.content as PessoaDTO[];
    }
}