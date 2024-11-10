import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';

export class AxiosException extends BadRequestException {
  constructor(
    public error: AxiosError,
    response: object = {
      method: error.config?.method,
      params: error.config?.params,
      url: error.config?.url,
      data: error.config?.data,
    },
  ) {
    super(response);
  }
  override message: string = `[Axios Exception] ${this.error.message}`;
}
