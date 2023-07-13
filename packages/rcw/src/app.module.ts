import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityService } from './identity/identity.service';
import { CredSchemaService } from './cred-schema/cred-schema.service';
import { CredentialsService } from './credentials/credentials.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, IdentityService, CredSchemaService, CredentialsService],
})
export class AppModule {}
