export type RCWSchema = {
  schema: object;
  tags: string[];
  status: string;
}

export type RCWTemplate = {
  schemaId: string;
  template: string;
  type: string;
}

// TODO: Fix this
export type RCWCredential = {
  credential: any;
}