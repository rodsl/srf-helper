// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { allowCors } from "services/apiAllowCors";

async function handler(req, res) {
  try {
    const body = { password: "oioioioi", username: "rlima" };
    return res.status(200).json(body);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}

export default allowCors(handler);
