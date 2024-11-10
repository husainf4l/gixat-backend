import { Controller, Get, Query } from '@nestjs/common';
import { QuickbooksService } from './quickbooks.service';

@Controller('quickbooks')
export class QuickbooksController {
    constructor(private readonly quickbooksService: QuickbooksService) { }

    // Step 1: Handle OAuth callback and exchange code for token
    @Get('auth/callback')
    async handleOAuthCallback(@Query('code') code: string) {
        try {
            const tokenData = await this.quickbooksService.getOAuthToken(code);
            return {
                message: 'OAuth token received successfully',
                tokenData,
            };
        } catch (error) {
            return {
                message: 'Error during OAuth token exchange',
                error: error.message,
            };
        }
    }

    // Step 2: Get company info using access token
    @Get('company-info')
    async getCompanyInfo(@Query('accessToken') accessToken: string) {
        try {
            const companyInfo = await this.quickbooksService.getCompanyInfo(accessToken);
            return {
                message: 'Company information retrieved successfully',
                companyInfo,
            };
        } catch (error) {
            return {
                message: 'Error retrieving company info',
                error: error.message,
            };
        }
    }
}
