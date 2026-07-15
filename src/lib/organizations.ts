import type { IUser } from "../types/type";

export function canAccessOrganization(
    user: IUser,
    organizationId: string
){

    if(
        user.role==="SUPER_ADMIN" ||
        user.role==="AUDITOR"
    ){
        return true;
    }

    return user.organizationId===organizationId;

}