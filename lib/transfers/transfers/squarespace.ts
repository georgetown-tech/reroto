import AbstractTransferClass from '../base'

class SquarespaceTransfer extends AbstractTransferClass {

    public override async scan(domain:string):Promise<Response> {

        return new Response();

    }

    public override async match(req:Request, html:string):Promise<boolean> {

        return false;

    }

}