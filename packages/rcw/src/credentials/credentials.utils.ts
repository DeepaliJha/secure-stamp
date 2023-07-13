import { Credential } from 'types';

export const generateIssueCredentialPayload = (credential: Credential) => {
  return {
    credential: {
      type: credential.type,
      issuer: credential.issuer,
      issuanceDate: credential.issuanceDate,
      expirationDate: credential.expirationDate,
      credentialSubject: {
        ...credential.credentialSubject,
      },
    },
    credentialSchemaId: credential.credentialSchemaId,
    tags: credential.tags,
    method: credential.method,
  };
};
