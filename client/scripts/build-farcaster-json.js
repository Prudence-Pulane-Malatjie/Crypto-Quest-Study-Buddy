import fs from "fs";

let template = fs.readFileSync(".well-known/farcaster.json.template", "utf8");

template = template
  .replace("$FARCASTER_HEADER", process.env.FARCASTER_HEADER)
  .replace("$FARCASTER_PAYLOAD", process.env.FARCASTER_PAYLOAD)
  .replace("$FARCASTER_SIGNATURE", process.env.FARCASTER_SIGNATURE);

fs.writeFileSync(".well-known/farcaster.json", template);
