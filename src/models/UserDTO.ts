export default class UserDTO {
    username = ''
    roles: Role[] = []
}

interface Role {
    authority: string
}