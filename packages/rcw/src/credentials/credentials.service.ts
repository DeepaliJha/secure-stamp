import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { generateIssueCredentialPayload } from './credentials.utils';
import { Credential, RCWCredential } from 'types';

@Injectable()
export class CredentialsService {
  private logger: Logger;

  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('CredentialsService');
  }

  async generateCredential(credential: Credential): Promise<RCWCredential> {
    try {
      const credentialResp = await this.httpService.axiosRef.post(
        `${process.env.CREDENTIALS_SERVICE_URL}/issue`,
        generateIssueCredentialPayload(credential),
      );

      return credentialResp.data;
    } catch (err) {
      this.logger.error('Error while generating credential', err);
      throw err;
    }
  }

  async getCredentialsGeneratedByIssuer(
    issuer: string,
  ): Promise<RCWCredential[]> {
    try {
      const credentialResp = await this.httpService.axiosRef.post(
        `${process.env.CREDENTIALS_SERVICE_URL}/credentials/search`,
        {
          issuer: {
            id: issuer,
          },
        },
      );

      return credentialResp.data;
    } catch (err) {
      this.logger.error(
        'Error while getting credentials generated by issuer',
        err,
      );
      throw new InternalServerErrorException(
        'Error while getting credentials generated by issuer',
      );
    }
  }

  async getCredentialsGeneratedToASubject(
    subject: string,
  ): Promise<RCWCredential[]> {
    try {
      const credentialResp = await this.httpService.axiosRef.post(
        `${process.env.CREDENTIALS_SERVICE_URL}/credentials/search`,
        {
          subject: {
            id: subject,
          },
        },
      );

      return credentialResp.data;
    } catch (err) {
      this.logger.error(
        'Error while getting credentials generated by issuer',
        err,
      );
      throw new InternalServerErrorException(
        'Error while getting credentials generated by issuer',
      );
    }
  }
}