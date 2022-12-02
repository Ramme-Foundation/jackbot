import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../dbConnect";
import { SlackInteractive } from "../../slack";
import { saveCustomBonus } from "../../commands/saveCustomBonus";
import { saveCustomNumber } from "../../commands/saveCustomNumber";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const payload = JSON.parse(req.body.payload);
  const actions: SlackInteractive.Action[] = payload.actions;
  const response_url = payload.response_url;
  const team: SlackInteractive.Team = payload.team;
  if (actions.length === 0) {
    return res.send(400);
  }

  const action = actions[0];

  const values = action.value.split(":");
  switch (values[0]) {
    case "number":
      return saveCustomNumber(res, action, response_url, team.id);
    case "bonus":
      return saveCustomBonus(res, action, response_url, team.id);
    default:
      return res.send(400);
  }
}
