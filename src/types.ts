interface IObserveChain {
  chain: string;
  height: number;
}

export interface IThorNode {
  node_address: string;
  status: string;
  pub_key_set: object;
  validator_cons_pub_key: string;
  bond: string;
  active_block_height: number;
  bond_address: string;
  status_since: number;
  signer_membership: null;
  requested_to_leave: boolean;
  forced_to_leave: boolean;
  leave_height: number;
  ip_address: string;
  version: string;
  slash_points: number;
  jail: object;
  current_award: string;
  observe_chains: IObserveChain[] | null;
  preflight_status: {
    status: string;
    reason: string;
    code: number;
  };
  bond_providers: {
    node_operator_fee: string;
    providers: null;
  };
}
