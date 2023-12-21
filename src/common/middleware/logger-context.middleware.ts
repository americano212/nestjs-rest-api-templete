import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from '../../../src/auth';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    private readonly jwt: JwtService, // TODO how to user AuthService
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, cookies } = req;
    const userAgent = req.get('user-agent');
    const payload = <JwtPayload>this.jwt.decode(cookies.access_token);
    const userId = payload ? payload.sub : 0;
    const datetime = new Date();
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${datetime} USER-${userId} ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
      );
    });

    next();
  }
}