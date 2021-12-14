use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount, MintTo};


declare_id!("BNZkLCaLHpA8M3kuGWk1saNYdAbrE8TKfZdCkBJbC2QR");

#[program]
pub mod smart_charging_and_blockchain {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        msg!("initialize");
        let charge_session_account = &mut ctx.accounts.charge_session_account;
        charge_session_account.authority = *ctx.accounts.authority.key;
        charge_session_account.to_account_info().key.log();
        Ok(())
    }

    // would be triggered by the EVSE
    pub fn stop_charge(ctx: Context<StopCharge>, nonce: u8) -> ProgramResult {
        msg!("stop charge");
        let mint_to_instruction = MintTo {
            mint: ctx.accounts.igneous_mint.to_account_info(),
            to: ctx.accounts.driver_igneous.to_account_info(),
            authority: ctx.accounts.program_signer.to_account_info()
        };
        let seeds = &[ctx.accounts.charge_session_account.to_account_info().key.as_ref(), &[nonce], ];
        let signer = &[&seeds[..]];
        let token_program = ctx.accounts.token_program.clone();
        let mint_to_context = CpiContext::new_with_signer(token_program, mint_to_instruction, signer);
        token::mint_to(mint_to_context, 1000)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 256)]
    pub charge_session_account: Account<'info, ChargeSessionAccount>,
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>
}

#[derive(Accounts)]
pub struct StopCharge<'info> {
    pub program_signer: AccountInfo<'info>,
    #[account(mut)]
    pub driver_igneous: Account<'info, TokenAccount>,
    pub charge_session_account: Account<'info, ChargeSessionAccount>,
    pub authority: Signer<'info>,
    #[account(mut)]
    pub igneous_mint: Account<'info, Mint>, // account that mints ingeous tokens
    #[account(executable, "token_program.key == &token::ID")]
    pub token_program: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
pub struct ChargeSessionAccount {
    pub authority: Pubkey,
}

