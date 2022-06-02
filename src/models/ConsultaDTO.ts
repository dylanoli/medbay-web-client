import MedicoDTO from "./MedicoDTO";
import PessoaDTO from "./PessoaDTO";

export default class ConsultaDTO {
    id = 0;
    doctorId = 0;
    patientId = 0;
    doctor = new MedicoDTO()
    patient = new PessoaDTO()
    observations: string[] = []
    consultationDate = ''
    scheduled = ''
    consultationReturnId = 0
    status: 'SCHEDULED' | 'DONE' = 'SCHEDULED'
}