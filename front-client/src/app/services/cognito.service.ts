import { Injectable } from "@angular/core";
import {
    CognitoUser,
    CognitoUserPool,
    AuthenticationDetails,
    ISignUpResult,
    CognitoUserAttribute,
    CognitoUserSession,
  } from 'amazon-cognito-identity-js';

import { CognitoIdentityServiceProvider, config } from 'aws-sdk';

config.update({ 
    region: 'eu-central-1' 
});


@Injectable()
export class CognitoService {

    private userPool: CognitoUserPool;

    constructor() {
        const poolData = {
            UserPoolId: "eu-central-1_YDTlxl9AR",
            ClientId: "6sq8a1ud4o8i29caek0vika7bd",
          };
        this.userPool = new CognitoUserPool(poolData);
    }

    signUp = (email: string, password: string) => {
        return new Promise<ISignUpResult>((resolve, reject) => {
            this.userPool.signUp(email, password, [
                new CognitoUserAttribute({ Name: 'email', Value: email})
            ], [], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result)
                }
            });
        });
    };


    login = (email: string, password: string) => {
        const authenticationData = {
            Username: email,
            Password: password,
        };
        let authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: email,
            Pool: this.userPool
        };

        const cognitoUser = new CognitoUser(userData);

        return new Promise<CognitoUserSession>((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (session) => {
                    console.log(session);
                    resolve(session);
                },
                onFailure: err => reject(err),
            });
        });

    };
}