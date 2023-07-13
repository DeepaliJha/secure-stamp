export type User = {
  name: string;
  email: string;
  password: string;
  did: string;
};

export type CredentialSchema = {
  author: string;
  name: string;
  version: string;
  schema: CredentialSchemaObject;
  tags: string[];
  status: string;
};

export type CredentialSchemaObject = {
  description: string;
  properties: {
    [k: string]: {
      type: string;
      description?: string;
      format?: string;
    };
  };
  required: string[];
  additionalProperties: boolean;
}

export type Credential = {
  type: string[];
  id: string;
  issuer: string;
  issuanceDate?: string;
  expirationDate?: string;
  credentialSubject: {
    [k: string]: string;
  };
  credentialSchemaId: string;
  tags: string[];
  method: string;
}