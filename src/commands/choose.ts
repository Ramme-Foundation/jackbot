import { Response } from "express";
import { NextApiResponse } from "next";
import { formatCustomInput } from "../formatCustomInput";

export async function commandChoose(response: NextApiResponse, team: string) {
  return response.status(200).send({
    response_type: "ephemeral",
    ...formatCustomInput(),
  });
}
