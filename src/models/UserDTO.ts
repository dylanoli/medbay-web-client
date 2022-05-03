export default class UserDTO {
    username = ''
    roles: Role[] = []
    name = ''
}

interface Role {
    authority: RoleEnum
}

export type RoleEnum = 'ROLE_MEDICO' | 'ROLE_ATENDENTE' | 'ROLE_ADMIN' | 'ROLE_PACIENTE'