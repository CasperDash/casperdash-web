export interface ISpeculativedDeployResult {
  api_version: string;
  block_hash: string;
  execution_result?: IExecutionResult;
}

export interface IExecutionResult {
  Success?: ISuccess;
  Failure?: IFailure;
}

export interface IFailure {
  effect: Effect;
  transfers: any[];
  cost: string;
  error_message: string;
}

export interface ISuccess {
  effect: Effect;
  transfers: any[];
  cost: string;
}

interface Effect {
  operations: any[];
  transforms: TransformElement[];
}

interface TransformElement {
  key: string;
  transform: TransformTransformClass | TransformEnum;
}

interface TransformTransformClass {
  WriteCLValue?: WriteCLValue;
  AddUInt512?: string;
  WriteDeployInfo?: WriteDeployInfo;
}

interface WriteCLValue {
  cl_type: ClTypeClass | string;
  bytes: string;
  parsed: Map[] | null | string;
}

interface ClTypeClass {
  Map: Map;
}

interface Map {
  key: string;
  value: string;
}

interface WriteDeployInfo {
  deploy_hash: string;
  transfers: any[];
  from: string;
  source: string;
  gas: string;
}

enum TransformEnum {
  Identity = 'Identity',
}
