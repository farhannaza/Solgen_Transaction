import { Metadata } from "next";
import React from 'react';
import MarketGrid from "@/components/marketplace/marketGrid";

export const metadata: Metadata = {
    title: "Marketplace",
};


export default function Page() {
    return (
        <main>
            <MarketGrid />
        </main>
    );
}
