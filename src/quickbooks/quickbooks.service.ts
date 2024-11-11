import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';  // Import ConfigService
import * as qs from 'qs';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuickbooksService {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly redirectUri: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService, // Inject Prisma service
    ) {
        this.clientId = this.configService.get<string>('CLIENT_ID');
        this.clientSecret = this.configService.get<string>('CLIENT_SECRET');
        this.redirectUri = this.configService.get<string>('REDIRECT_URI');
    }


    async getOAuthToken(code: string, realmId: string, companyId: string): Promise<any> {
        console.log('------------------------------------------------------------------1--');

        console.log('Authorization Code:', code);
        console.log('Redirect URI:', this.redirectUri);
        console.log('Realm ID:', realmId);
        console.log('Company ID:', companyId); const url = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
        console.log('------------------------------------------------------------------2--');

        const data = qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri,
        });
        console.log('------------------------------------------------------------------3--');

        const headers = {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        console.log('------------------------------------------------------------------4--');
        console.log('Authorization Code:', code);
        console.log('Redirect URI:', this.redirectUri);
        console.log('Realm ID:', realmId);
        console.log('Company ID:', companyId);
        console.log('------------------------------------------------------------------5--');

        try {
            const response = await firstValueFrom(this.httpService.post(url, data, { headers }));
            const quickbooksToken = response.data;

            // Log the received token for confirmation
            console.log('QuickBooks Token:', quickbooksToken);

            // Save the token to the company in the database
            const updatedCompany = await this.prisma.company.update({
                where: { id: companyId },
                data: {
                    quickbooksToken: quickbooksToken.access_token,
                    quickbooksRefreshToken: quickbooksToken.refresh_token,
                    quickbooksTokenExpiry: new Date(Date.now() + quickbooksToken.expires_in * 1000),
                },
            });
            console.log('Updated Company:', updatedCompany);
            console.log('------------------------------------------------------------------6--');

            return quickbooksToken;
        } catch (error) {
            console.log('------------------------------------------------------------------ops--');

            console.error('Error during OAuth token exchange:', error.response?.data || error.message);
            console.log('------------------------------------------------------------------ops2--');

            throw new Error(`Error getting OAuth token: ${error.message}`);

        }
    }




    // Get the OAuth URL to redirect users to QuickBooks for authentication
    getOAuthUrl(): string {
        const scope = 'com.intuit.quickbooks.accounting';
        const state = this.generateState(); // Optional state parameter for CSRF protection
        return `https://appcenter.intuit.com/connect/oauth2?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}&response_type=code&state=${state}`;
    }


    // Redirect to QuickBooks OAuth page
    redirectToQuickBooks(): void {
        window.location.href = this.getOAuthUrl();
    }

    // Generate a random state for security
    private generateState(): string {
        return Math.random().toString(36).substring(7);
    }

    async getCompanyInfo(accessToken: string, realmId: string): Promise<any> {
        console.log("Realm ID:", realmId, "Access Token:", accessToken);

        // Use the sandbox endpoint for sandbox companies
        const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/companyinfo/${realmId}`;
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        };

        try {
            const response = await firstValueFrom(this.httpService.get(url, { headers }));
            console.log('Company Info Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error retrieving company info:', error.response?.data || error.message);
            if (error.response?.status === 403) {
                console.error("Access Forbidden: Check token validity, scopes, and sandbox restrictions.");
            }
            throw new Error(`Error retrieving company info: ${error.message}`);
        }
    }

    async getInvoices(accessToken: string, realmId: string): Promise<any> {
        const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/invoice`;

        const headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        };

        try {
            const response = await firstValueFrom(this.httpService.get(url, { headers }));
            console.log('invoice Info Response:', response.data);

            return response.data;
        } catch (error) {
            console.error('Error retrieving invoice info:', error.response?.data || error.message);

            throw new Error(`Error retrieving invoices: ${error.message}`);
        }
    }



    // Refresh the OAuth token using the refresh token
    async refreshToken(refreshToken: string): Promise<any> {
        const url = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
        const data = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });

        const headers = {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            const response = await firstValueFrom(this.httpService.post(url, data, { headers }));
            return response.data;
        } catch (error) {
            throw new Error(`Error refreshing OAuth token: ${error.message}`);
        }
    }
}
