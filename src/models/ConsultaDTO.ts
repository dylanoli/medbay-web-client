import MedicoDTO from "./MedicoDTO";
import PessoaDTO from "./PessoaDTO";

export default class ConsultaDTO {
    id = 0;
    medico = new MedicoDTO();
    paciente = new PessoaDTO();
    data = ''
    observacoes: string[] = []
}