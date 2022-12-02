import moment from "moment";
import { Response } from "express";
import { CustomLotteryRow, ICustomLotteryRow } from "../database";
import axios from "axios";
import { SlackInteractive } from "../slack";
import { NextApiResponse } from "next";

export async function saveCustomNumber(
  response: NextApiResponse,
  action: SlackInteractive.Action,
  responseUrl: string,
  teamId: string
) {
  let lotteryRow = await CustomLotteryRow.findOne({
    team_id: teamId,
    week: moment().isoWeek(),
    year: moment().year(),
  });
  if (lotteryRow) {
    const number = Number(action.text.text);
    if (lotteryRow.numbers.includes(number)) {
      throw Error(`Number ${number} already exists`);
    }
    lotteryRow.numbers = [...lotteryRow.numbers, number];
    await lotteryRow.save();
  } else {
    lotteryRow = await CustomLotteryRow.create({
      team_id: teamId,
      week: moment().isoWeek(),
      year: moment().year(),
      numbers: [action.text.text],
      bonus_numbers: [],
    });
  }
  // Send repsonse async
  axios.post(responseUrl, formatCustomLotteryRow(lotteryRow), {
    headers: {
      "Content-type": "application/json",
    },
  });
  return response.send(200);
}

function formatCustomLotteryRow(lotteryRow: ICustomLotteryRow) {
  return {
    response_type: "in_channel",
    delete_original: true,
    // TODO Fix this
    text: `This week's jackbot row: \n${new Array(
      5 || lotteryRow.numbers.length
    )
      .fill(0)
      .map((i, index) => lotteryRow.numbers[index] || "__")
      .join(" - ")} : ${new Array(2 || lotteryRow.numbers.length)
      .fill(0)
      .map((i, index) => lotteryRow.bonus_numbers[index] || "_")
      .join(" - ")}`,
  };
}
