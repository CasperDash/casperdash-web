import { JsonTypes } from 'typedjson';

export type DeployParams = JsonTypes;

export type DeployResponse = {
  deployHash: string;
};
