// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'


const { API_KEY, TO_EMAIL, FROM_EMAIL } = process.env;

sgMail.setApiKey(API_KEY as string)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {

        let { name, email, subject, message } = JSON.parse(req.body);
        console.log(TO_EMAIL, FROM_EMAIL, name, email, subject, message)

        if (TO_EMAIL && FROM_EMAIL && name && email && subject && message) {
            console.log('Sending email...')
            const msg = {
                to: TO_EMAIL,
                from: FROM_EMAIL,
                subject: `${subject}`,
                text: `Name: ${name} \nEmail: ${email} \nMessage: \n${message}`,
            }

            await sgMail.send(msg);
            console.log('Sent!')
            res.status(200).end();
            return;
        } else {
            res.status(400).end();
            return;
        }
    } catch (error) {
        console.error(error)
        res.status(500).end();
        return;
    }
}
