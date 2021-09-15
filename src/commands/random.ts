import { Response } from 'express';
import { saveCustomNumber } from './saveCustomNumber';

export async function randomCommand(response: Response, responseUrl: string, team: string) {
    const highest = 50;
    const number: number = Math.floor(Math.random() * highest) + 1;
    // @ts-ignore
    return saveCustomNumber(response, { text: {text: number.toString() } }, responseUrl, team)
}
  