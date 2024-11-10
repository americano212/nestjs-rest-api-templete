import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { JwtPayload } from 'src/auth';
import { NotUserId } from '../enums';

export const UserId = createParamDecorator((_data: unknown, context: ExecutionContext): number => {
  const jwtService = new JwtService();

  const { headers } = context.switchToHttp().getRequest<Request>();
  if (!headers.authorization) return NotUserId.ANONYMOUS;

  const jwtToken = headers.authorization.split('Bearer ')[1];

  const payload = <JwtPayload | null>jwtService.decode(jwtToken);
  if (!payload) return NotUserId.ANONYMOUS;

  return payload.sub;
});
