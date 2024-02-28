export default class AbstractTransferClass {

    public async scan(domain:string):Promise<Response> {

        return new Response();

    }

    public async match(req:Request, html:string):Promise<boolean> {

        return false;

    }

}