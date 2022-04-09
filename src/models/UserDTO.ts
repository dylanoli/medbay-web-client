export default class UserDTO {
    username = ''
    roles: Role[] = []
}

interface Role {
    authority: RoleEnum
}

type RoleEnum = 'ROLE_MEDICO' | 'ROLE_ATENDENTE' | 'ROLE_ADMIN' | 'ROLE_PACIENTE'