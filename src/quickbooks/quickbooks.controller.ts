import { Controller, Get, Query } from '@nestjs/common';
import { QuickbooksService } from './quickbooks.service';

@Controller('quickbooks')
export class QuickbooksController {
    constructor(private readonly quickbooksService: QuickbooksService) { }

    @Get('auth/callback')
    async handleOAuthCallback(@Query('code') code: string, @Query('realmId') realmId: string, @Query('companyId') companyId: string) {
        try {
            const tokenData = await this.quickbooksService.getOAuthToken(code, realmId, companyId);
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
    async getCompanyInfo(@Query('accessToken') accessToken: string, @Query('realmId') realmId: string) {
        try {
            const companyInfo = await this.quickbooksService.getCompanyInfo(accessToken, realmId);
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


    // Step 3: Get OAuth URL for QuickBooks
    @Get('auth/url')
    async getOAuthUrl() {
        try {
            const url = this.quickbooksService.getOAuthUrl();
            return {
                message: 'OAuth URL generated successfully',
                url,
            };
        } catch (error) {
            return {
                message: 'Error generating OAuth URL',
                error: error.message,
            };
        }
    }

    @Get('invoices')
    async getInvoices(@Query('accessToken') accessToken: string, @Query('realmId') realmId: string) {
        try {
            const invoices = await this.quickbooksService.getInvoices(accessToken, realmId);
            return {
                message: 'Invoices retrieved successfully',
                invoices,
            };
        } catch (error) {
            return {
                message: 'Error retrieving invoices',
                error: error.message,
            };
        }
    }

}
