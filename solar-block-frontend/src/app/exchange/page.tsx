import { Metadata } from "next";
import SwapSol from "@/components/exchange/swapSol";

export const metadata: Metadata = {
    title: "Exchange Currency",
  };

export default function ExchangeCurrency(){
    return (
        <main>
            <SwapSol />
        </main>
    )
}