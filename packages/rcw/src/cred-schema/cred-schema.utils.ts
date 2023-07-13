import { CredentialSchema } from 'types';

export const generateCreateCredSchemaPayload = (schema: CredentialSchema) => {
  return {
    schema: {
      type: 'https://w3c-ccg.github.io/vc-json-schemas/',
      version: schema.version,
      name: schema.name,
      author: schema.author,
      authored: new Date(Date.now()).toISOString(),
      schema: {
        ...schema.schema,
      },
    },
    tags: schema.tags,
    status: schema.version,
  };
};
