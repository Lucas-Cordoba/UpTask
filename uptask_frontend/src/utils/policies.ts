import { Project, TeamMember } from "@/types";

export const isManager = (managerId: Project['manager'], userId: TeamMember['_id']) => {
    return managerId === userId
}

//VERIFICA QUE EL MANAGER SEA IGUAL AL USUARIO LOGUEADO EN ESE MOMENTO