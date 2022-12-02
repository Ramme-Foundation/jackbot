import { NextApiRequest, NextApiResponse } from "next";
import { commandChoose } from "../../commands/choose";
import { commandJackpot } from "../../commands/jackpot";
import { randomCommand } from "../../commands/random";
import { commandResult } from "../../commands/result";
import { commandGo } from "../../commands/go";
import { Commands } from "../../const";
import dbConnect from "../../dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const command: Commands = req.body.text ? req.body.text : "help";
  const team: string = req.body.team_id;
  const responseUrl: string = req.body.response_url;
  await dbConnect();
  // tslint:disable-next-line:no-console
  console.log(command);
  switch (command) {
    case Commands.GO:
      return commandGo(res, team);
    case Commands.RESULT:
      return commandResult(res);
    case Commands.JACKPOT:
      return commandJackpot(res);
    case Commands.CHOOSE:
      return commandChoose(res, team);
    case Commands.RANDOM:
      return randomCommand(res, responseUrl, team);
    case Commands.HELP:
    default:
      return res.status(200).send({
        response_type: "ephemeral",
        text: `Available commands are /jackbot ${Object.keys(Commands)
          // @ts-ignore
          .map((key) => Commands[key])
          .join(" | ")}`,
      });
  }
}
