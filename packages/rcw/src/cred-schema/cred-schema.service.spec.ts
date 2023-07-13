import { Test, TestingModule } from '@nestjs/testing';
import { CredSchemaService } from './cred-schema.service';

describe('CredSchemaService', () => {
  let service: CredSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredSchemaService],
    }).compile();

    service = module.get<CredSchemaService>(CredSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
