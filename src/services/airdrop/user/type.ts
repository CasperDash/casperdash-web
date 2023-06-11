export enum AirdropStatusEnum {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export type CheckAirdropCodeParams = {
  airdropCode: string;
};

export type CheckAirdropCodeResponse = {
  airdropStatus: AirdropStatusEnum;
};

export type SubmitAirdropParams = {
  airdropCode: string;
  walletAddress: string;
  feedback: string;
};
