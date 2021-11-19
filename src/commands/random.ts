import { Response } from 'express';
import moment from 'moment';
import { CustomLotteryRow } from '../database';
import { saveCustomBonus } from './saveCustomBonus';
import { saveCustomNumber } from './saveCustomNumber';

export async function randomCommand(response: Response, responseUrl: string, team: string) {
    const highest = 50;
    const number: number = Math.floor(Math.random() * highest) + 1;

    let lotteryRow = await CustomLotteryRow.findOne({
        team_id: team,
        week: moment().isoWeek(),
        year: moment().year(),
    });
    if (lotteryRow && lotteryRow.numbers.length >= 5) {
        // @ts-ignore
        return saveCustomBonus(response, { text: { text: number.toString() } }, responseUrl, team)
    }
    // @ts-ignore
    return saveCustomNumber(response, { text: { text: number.toString() } }, responseUrl, team)
}
