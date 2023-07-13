import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { User } from 'types';

@Injectable()
export class IdentityService {
  private logger: Logger;
  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger('IdentityService');
  }

  async createDID(user: User) {
    try {
      const didResp: AxiosResponse = await this.httpService.axiosRef.post(
        `${process.env.IDENTITY_SERVICE_URL}/did/generate`,
        {
          content: [
            {
              alsoKnownAs: [user.name, user.email],
              method: 'samagra',
              services: [
                {
                  id: 'samagra',
                },
              ],
            },
          ],
        },
      );

      return didResp.data;
    } catch (err) {
      this.logger.error('Error while getting DID', err);
      throw new InternalServerErrorException('Error while getting DID');
    }
  }
}
