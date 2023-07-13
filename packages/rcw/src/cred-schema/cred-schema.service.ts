import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { CredentialSchema, RCWSchema, RCWTemplate } from 'types';
import { generateCreateCredSchemaPayload } from './cred-schema.utils';

@Injectable()
export class CredSchemaService {
  private logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('CredSchemaService');
  }

  async createCredSchema(schema: CredentialSchema): Promise<RCWSchema> {
    const payload = generateCreateCredSchemaPayload(schema);

    try {
      const schemaResp: AxiosResponse = await this.httpService.axiosRef.post(
        `${process.env.CREDSCHEMA_BASE_URL}/credential-schema`,
        payload,
      );

      return schemaResp.data;
    } catch (err) {
      this.logger.error('Error while creating credential schema', err);
      throw new InternalServerErrorException(
        'Error while creating credential schema',
      );
    }
  }

  async createAddTemplateForASchema(
    schemaId: string,
    template: string,
    type: string,
  ): Promise<RCWTemplate> {
    try {
      const templateResp: AxiosResponse = await this.httpService.axiosRef.post(
        `${process.env.CREDSCHEMA_BASE_URL}/template`,
        {
          schemaId,
          template,
          type,
        },
      );

      return templateResp.data;
    } catch (err) {
      this.logger.error('Error while creating add template for a schema', err);
      throw new InternalServerErrorException(
        'Error while creating add template for a schema',
      );
    }
  }

  async getTemplate(templateId: string): Promise<RCWTemplate> {
    try {
      const tempRes: AxiosResponse = await this.httpService.axiosRef.get(
        `${process.env.CREDSCHEMA_BASE_URL}/template/${templateId}`,
      );

      return tempRes.data;
    } catch (err) {
      this.logger.error('Error while getting template', err);
      throw new InternalServerErrorException('Error while getting template');
    }
  }

  async getTemplatesForASchema(schemaId: string): Promise<RCWTemplate[]> {
    try {
      const tempRes: AxiosResponse = await this.httpService.axiosRef.get(
        `${process.env.CREDSCHEMA_BASE_URL}/template?schemaId=${schemaId}`,
      );

      return tempRes.data;
    } catch (err) {
      this.logger.error('Error while getting templates for a schema', err);
      throw new InternalServerErrorException(
        'Error while getting templates for a schema',
      );
    }
  }
}
