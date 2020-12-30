'use strict';

import * as chai from 'chai';
import { after, before, describe, it } from 'mocha';
import * as request from 'request';
import { Server } from 'typescript-rest';
import { ApiServer } from '../src/api-server';

const expect = chai.expect;

const apiServer: ApiServer = new ApiServer();
const helloRequest: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>
                 = request.defaults({baseUrl: `http://localhost:${apiServer.PORT}`});

describe('Healthcheck endpoint tests', () => {

    before(() => {
        return apiServer.start();
    });

    after(() => {
        return apiServer.stop();
    });

    describe('The Rest Server', () => {
        it('should provide a catalog containing the exposed paths', () => {
            expect(Server.getPaths()).to.include.members([
                '/health/',
            ]);
        });
    });

    describe('/health', () => {
        it('should return status for health check', (done) => {
            helloRequest('/health', (error: any, response, body) => {
                expect(response.statusCode).to.eq(200);
                done();
            });
        });

    });

});
