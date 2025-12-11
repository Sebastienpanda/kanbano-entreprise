import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
    constructor(
        @Inject('MAIL_TRANSPORT') private readonly transporter: Transporter,
        private readonly config: ConfigService
    ) {}

    async sendWelcomeEmail(to: string) {
        return this.transporter.sendMail({
            from: this.config.get('SMTP_FROM'),
            to,
            subject: 'Bienvenue sur la Waitlist Kanbano',
            html: `
        <h2>Bienvenue 👋</h2>
        <p>Merci de t'être inscrit sur la waitlist Kanbano !</p>
        <p>On revient très vite avec du nouveau.</p>
      `,
        });
    }
}
