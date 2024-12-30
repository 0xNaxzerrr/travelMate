import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  canActivate(context: ExecutionContext) {
    console.log("Guard LocalAuthGuard appelé"); // Log ajouté
    return super.canActivate(context);
  }
}
