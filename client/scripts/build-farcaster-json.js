import fs from "fs";

const farcasterConfig = {
  timestamp: new Date().toISOString(),
  version: 1,
  farcaster: {
    client: {
      name: "Crypto Quest Study Buddy",
      description: "A crypto quiz application for Farcaster",
      icon: "https://crypto-quest-study-buddy.vercel.app/icon.png",
      url: "https://crypto-quest-study-buddy.vercel.app"
    },
    permissions: ["read", "write"],
    domains: ["crypto-quest-study-buddy.vercel.app"],
    accountAssociation: {
      header: "Farcaster-Account-Association",
      payload: JSON.stringify({
        address: process.env.WALLET_ADDRESS,
        signature: process.env.WALLET_SIGNATURE
      }),
      signature: process.env.WALLET_SIGNATURE
    }
  }
};

fs.writeFileSync(".well-known/farcaster.json", JSON.stringify(farcasterConfig, null, 2));