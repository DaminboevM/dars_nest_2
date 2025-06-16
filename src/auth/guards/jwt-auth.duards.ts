import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.extractTokenHeadre(req)
        
        if(!token) throw new UnauthorizedException()
        
        try {
            const payload = await this.jwt.verifyAsync(token)
            console.log(payload)
            req['user' ] = payload
            return true
        } catch (error) {
            throw new UnauthorizedException()
        }

    }

    private extractTokenHeadre (req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') || []
        console.log(type, token)
        return type == 'Bearer' ? token : undefined
    }
}