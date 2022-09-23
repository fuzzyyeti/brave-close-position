import {useAnchorWallet, useConnection, useWallet} from "@solana/wallet-adapter-react";
import {ChangeEventHandler, MouseEventHandler, useState} from "react";
import {Provider} from "@project-serum/anchor";

import {PublicKey} from "@solana/web3.js";
import {getWhirlpoolProgramId, getWhirlpoolsConfig} from "@orca-so/whirlpool-sdk/dist/constants/programs";
import {OrcaNetwork, OrcaWhirlpoolClient} from "@orca-so/whirlpool-sdk";
import {Percentage} from "@orca-so/common-sdk";



export const ClosePosition = () => {
    const wallet = useWallet()
    const anchorWallet = useAnchorWallet();
    const connection = useConnection();
    const [positionAddress, setPositionAddress] = useState('')


    const onClose = async () => {
        const provider = new Provider(connection.connection, anchorWallet!, Provider.defaultOptions())

        // to get positions, use 06a_list_whirlpool_positions.ts
        const MY_POSITION = new PublicKey(positionAddress);
        console.log(MY_POSITION.toBase58())
        const client = new OrcaWhirlpoolClient({ network: OrcaNetwork.MAINNET });
        const quote = await client.pool.getClosePositionQuote({
            positionAddress: MY_POSITION,
            refresh: true,
            slippageTolerance: Percentage.fromFraction(1,10)
        });
        const tx = await client.pool.getClosePositionTx({ provider, quote });
        const txId = await tx.buildAndExecute();
        console.log(txId);


    }

    const positionChange : ChangeEventHandler<HTMLInputElement> = (e ) => {
        setPositionAddress(e.target.value)
    }

    return (
        <>
        <h1>Enter the position address to close</h1>
            <input type={"text"} onChange={positionChange}/>
            <button onClick={onClose}>Close Position</button>
        </>)
}