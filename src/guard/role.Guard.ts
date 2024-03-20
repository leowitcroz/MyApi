import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { log } from "console";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRole) {
            return true
        }

        const {user} = context.switchToHttp().getRequest()

        const rolesFilted = requiredRole.filter(role => 
            role == user.role)

        
        if (rolesFilted.length > 0) {
            return true
        }
        else {
            return false
        }
    }

}