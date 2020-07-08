import { Response } from 'express';
import axios from 'axios';
import { ResultInterface } from './result';
import { RESULT_API_URL } from '../const';
import { EURO_IN_SEK } from '../const';

export async function commandJackpot(response: Response) {
  const jackpot: number = await getJackpotEuro();
  return response.status(200).send({
    response_type: 'in_channel',
    text: `This weeks jackpot is €${jackpot}, which is ${(jackpot * EURO_IN_SEK)} SEK (using EUR/SEK exchange rate of ${EURO_IN_SEK})`,
  });
}

function getJackpotEuro(): Promise<number> {
  return axios.get(RESULT_API_URL).then((response: any) => {
    const result: ResultInterface = response.data;
    return parseInt(result.next.jackpot, 10);
  });
}
