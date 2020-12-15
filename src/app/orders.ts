export class Orders {

    constructor(public id: string, public rest_id: string, public menu_id: string, public customer_id: string,
        public quantity:number, public date_created:string){}
}
