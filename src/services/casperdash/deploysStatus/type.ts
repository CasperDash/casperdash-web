export type DeploysStatusParams = {
  deployHash: string[];
};

export type DeployStatus = {
  hash: string;
  status: string;
};

export type DeploysStatusResponse = DeployStatus[];
