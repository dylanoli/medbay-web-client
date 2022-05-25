import ConsultaDTO from "@/models/ConsultaDTO";
import MedicoDTO from "@/models/MedicoDTO";
import PessoaDTO from "@/models/PessoaDTO";
import { api } from ".";

export default class ConsultaService {

    static async create(Consulta: ConsultaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.post(
            "api/consultations", Consulta, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async update(Consulta: ConsultaDTO) {
        const token = localStorage.getItem('token')
        const { data } = await api.put(
            "api/consultations/" + Consulta.id, Consulta, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async delete(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.delete(
            "api/consultations/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as string;
    }

    static async find(id: number) {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/consultations/" + id, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data as ConsultaDTO;
    }

    static async list() {
        const token = localStorage.getItem('token')
        const { data } = await api.get(
            "api/consultations", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return data.content as ConsultaDTO[];
    }
}