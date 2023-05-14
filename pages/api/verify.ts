import db from "../../utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiUrl =
    "https://developer.worldcoin.org/api/v1/verify/app_292d8587b41c6d6e97edb33aca080e3e";
  const {
    nullifier_hash,
    merkle_root,
    proof,
    credential_type,
    action,
    signal,
    address,
  } = req.body;
  try {
    const fetchRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nullifier_hash,
        merkle_root,
        proof,
        credential_type,
        action,
        signal,
      }),
    });
    if (fetchRes.status === 200) {
      await db.doc(`user/${address}`).set(
        {
          address,
          isVerified: true,
        },
        { merge: true }
      );
      return res.status(200).send("Logged in");
    }
    res.status(400).send("Bad request");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}