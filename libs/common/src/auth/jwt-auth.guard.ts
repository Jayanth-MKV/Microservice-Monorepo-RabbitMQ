import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth = this.getAuth(context);
    return this.authClient
      .send('validate_user', {
        Authentication: auth,
      })
      .pipe(
        tap((res) => this.addUser(res, context)),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
  }

  private getAuth(ctx: ExecutionContext) {
    let auth: string;
    if (ctx.getType() === 'rpc') {
      auth = ctx.switchToRpc().getData().Authentication;
    }
    if (ctx.getType() === 'http') {
      auth = ctx.switchToHttp().getRequest().cookies?.Authentication;
    }
    if (!auth) {
      throw new UnauthorizedException('No auth value provided');
    }
    return auth;
  }

  private addUser(user: any, ctx: ExecutionContext) {
    if (ctx.getType() === 'rpc') {
      ctx.switchToRpc().getData().user = user;
    }
    if (ctx.getType() === 'http') {
      ctx.switchToHttp().getRequest().user = user;
    }
  }
}
