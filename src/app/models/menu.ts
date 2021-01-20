export class Menu {
    public quantity: number = 0;
    public rating = 0;

    constructor(public id: string, public rest_id: string, public name: string,
        public descr: string, public price: number, public image: string) { }
}
