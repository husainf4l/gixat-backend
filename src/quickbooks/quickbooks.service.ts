import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as qs from 'qs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class QuickbooksService {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly redirectUri: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.clientId = this.configService.get<string>('CLIENT_ID');
        this.clientSecret = this.configService.get<string>('CLIENT_SECRET');
        this.redirectUri = this.configService.get<string>('REDIRECT_URI');
    }

    // Method to get OAuth token from QuickBooks using the code
    async getOAuthToken(code: string): Promise<any> {
        const url = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
        const data = qs.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri,
        });

        const headers = {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
            const response = await firstValueFrom(this.httpService.post(url, data, { headers }));
            return response.data;
        } catch (error) {
            console.error('OAuth token exchange failed:', error.response?.data);
            throw new Error(`Error getting OAuth token: ${error.message}`);
        }
    }

    // Method to get company information from QuickBooks using access token
    async getCompanyInfo(accessToken: string): Promise<any> {
        const url = 'https://quickbooks.api.intuit.com/v3/company/9341453443035550/query';  // Replace with actual company ID
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        };

        try {
            const response = await firstValueFrom(this.httpService.get(url, { headers }));
            return response.data;
        } catch (error) {
            throw new Error(`Error getting company info: ${error.message}`);
        }
    }
}
