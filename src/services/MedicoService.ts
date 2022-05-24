import MedicoDTO from "@/models/MedicoDTO";
import PessoaDTO from "@/models/PessoaDTO";
import { api } from ".";

export default class MedicoService {

    static async create(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.post(
            "api/doctors", pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async update(pessoa: PessoaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.put(
            "api/doctors/" + pessoa.id, pessoa, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async delete(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.delete(
            "api/doctors/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async find(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/doctors/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as MedicoDTO;
    }

    static async list() {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/doctors", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data.content as MedicoDTO[];
    }
}