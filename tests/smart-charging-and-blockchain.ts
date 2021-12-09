import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SmartChargingAndBlockchain } from '../target/types/smart_charging_and_blockchain';

describe('smart-charging-and-blockchain', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SmartChargingAndBlockchain as Program<SmartChargingAndBlockchain>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
