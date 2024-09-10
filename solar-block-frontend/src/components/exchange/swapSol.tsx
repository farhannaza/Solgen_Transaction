'use client';
import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';
import Select from 'react-select';

const SWAP_API_URL = 'https://api.jup.ag/v1/swap';
const CONVERSION_RATES = {
    USDC: 0.000025, // Example conversion rate: 1 USDC = 0.000025 SOL
    ETH: 0.000015,  // Example conversion rate: 1 ETH = 0.000015 SOL
    BTC: 0.000005   // Example conversion rate: 1 BTC = 0.000005 SOL
};
const MINT_ADDRESSES = {
    USDC: 'EPjFWdd5AufqSSqeM2qKkXQFeWvTXh8u5spx6X3d7ZBe',
    ETH: '2ndMintAddressForETH',
    BTC: '3rdMintAddressForBTC'
};
type CoinType = keyof typeof CONVERSION_RATES;

const coinOptions = [
    { value: 'USDC', label: <div className='flex items-center gap-2'><p className='font-black text-lg'>RM</p><img src="usdclogo.svg" alt="USDC Logo" className="w-1/6" /></div> },
    { value: 'ETH', label: <div className='flex items-center gap-2'><p className='font-black text-lg'>ETH</p><img src="ethereumlogo.svg" alt="Ethereum Logo" className="w-1/12" /></div> },
    { value: 'BTC', label: <div className='flex items-center gap-2'><p className='font-black text-lg'>BTC</p><img src="bitcoinlogo.svg" alt="BTC Logo" className="w-1/5" /></div> }
];

const SwapSol: React.FC = () => {
    const { publicKey, sendTransaction } = useWallet();
    const [usdcAmount, setUsdcAmount] = useState<number>(0);
    const [solAmount, setSolAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPayingCoin, setSelectedPayingCoin] = useState<CoinType>('USDC');

    useEffect(() => {
        setSolAmount(usdcAmount * CONVERSION_RATES[selectedPayingCoin]);
    }, [usdcAmount, selectedPayingCoin]);

    useEffect(() => {
        setUsdcAmount(solAmount / CONVERSION_RATES[selectedPayingCoin]);
    }, [solAmount, selectedPayingCoin]);

    const handleUsdcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseFloat(e.target.value));
        setUsdcAmount(value);
    };

    const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(0, parseFloat(e.target.value));
        setSolAmount(value);
    };

    const handlePayingCoinChange = (selectedOption: any) => {
        const newCoinType = selectedOption.value as CoinType;
        const newSolAmount = usdcAmount * CONVERSION_RATES[newCoinType];
        setSelectedPayingCoin(newCoinType);
        setSolAmount(newSolAmount);
    };

    const handleSwap = async () => {
        if (!publicKey) {
            alert('Please connect your wallet!');
            return;
        }
        setLoading(true);
        try {
            // Fetch swap route
            const response = await axios.post(SWAP_API_URL, {
                inputMint: MINT_ADDRESSES[selectedPayingCoin],
                outputMint: 'So11111111111111111111111111111111111111112', // SOL mint address
                amount: usdcAmount * 10 ** 6, // Convert to smallest unit (assuming USDC has 6 decimals)
                slippage: 1, // 1% slippage
                userPublicKey: publicKey.toString(),
            });
            const { swapTransaction } = response.data;
            // Create transaction
            const transaction = Transaction.from(Buffer.from(swapTransaction, 'base64'));
            // Send transaction
            const signature = await sendTransaction(transaction, new Connection('https://api.mainnet-beta.solana.com'));
            // Confirm transaction
            await new Connection('https://api.mainnet-beta.solana.com').confirmTransaction(signature, 'confirmed');
            alert('Swap successful!');
        } catch (error) {
            console.error('Swap failed', error);
            alert('Swap failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className='flex gap-2 p-2 justify-center items-center'>
                    <h1 className="text-2xl font-bold mb-4 text-center">Solana Exchange</h1>
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Paying</label>
                <div className="flex justify-between mb-4 border border-gray-300 rounded p-2">
                    <Select
                        value={coinOptions.find(option => option.value === selectedPayingCoin)}
                        onChange={handlePayingCoinChange}
                        options={coinOptions}
                        className="w-1/2 p-2 bg-transparent"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                            }),
                        }}
                    />
                    <input
                        type="number"
                        step="0.01"
                        value={usdcAmount}
                        onChange={handleUsdcChange}
                        placeholder="Enter amount"
                        className="w-2/3 p-2 font-black text-right text-lg bg-transparent no-arrows"
                    />
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Receiving</label>
                <div className="flex justify-between mb-4 border border-gray-300 rounded p-2">
                    <div className='flex items-center gap-2 ml-4'>
                        <p className='font-black text-lg'>SOL</p>
                        <img src="solanalogo.svg" alt="Solana Logo" className="w-1/12" />
                    </div>
                    <input
                        type="number"
                        step="0.01"
                        value={solAmount}
                        onChange={handleSolChange}
                        placeholder="Enter amount"
                        className="w-2/3 p-2 font-black text-lg text-right bg-transparent no-arrows"
                    />
                </div>
                <button
                    onClick={handleSwap}
                    disabled={loading}
                    className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {loading ? 'Swapping...' : 'Swap'}
                </button>
            </div>
        </div>
    );
};

export default SwapSol;
