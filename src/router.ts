// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/create`
  | `/create/double-check`
  | `/create/new-password`
  | `/import`
  | `/import/new-password`
  | `/market`
  | `/market/:contractAddress/:tokenId`
  | `/nfts`
  | `/nfts/:contractAddress/:tokenId`
  | `/portfolio`
  | `/send`
  | `/staking`

export type Params = {
  '/market/:contractAddress/:tokenId': { contractAddress: string; tokenId: string }
  '/nfts/:contractAddress/:tokenId': { contractAddress: string; tokenId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
