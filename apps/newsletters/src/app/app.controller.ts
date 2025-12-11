import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller('newsletters')
export class AppController {
    constructor(private readonly mailService: MailService) {}

    @Post('welcome')
    async sendWelcome(@Body('email') email: string) {
        await this.mailService.sendWelcomeEmail(email);
        return { success: true };
    }

    @Get('hello')
    async sendHello() {
        return {
            hello: 'world',
        };
    }
}
