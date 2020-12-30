import { GET, Path } from "typescript-rest";

@Path("/health")
export class Health {
    @Path("/")
    @GET
    public async getHealth(): Promise<any> {
        try {
            return {
                data: {},
                status: 'ok'
            };
        } catch (e) {
            return {
                data: e,
                status: 'error'
            };
        }
    }
}