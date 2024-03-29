import moment from "moment";
import { LotteryRow } from "../database";
import { generateNumbers } from "../utils/generateNumbers";
import { NextApiResponse } from "next";

export async function commandGo(response: NextApiResponse, team: string) {
  let lotteryRow = await LotteryRow.findOne({
    team_id: team,
    week: moment().isoWeek(),
    year: moment().year(),
  });
  if (!lotteryRow) {
    lotteryRow = await LotteryRow.create({
      team_id: team,
      week: moment().isoWeek(),
      year: moment().year(),
      row: `Extremely likely winning row: ${generateNumbers(
        5,
        50
      )} with bonus digits ${generateNumbers(2, 12)}`,
    });
  }

  return response.status(200).send({
    response_type: "in_channel",
    text: lotteryRow.row,
  });
}
