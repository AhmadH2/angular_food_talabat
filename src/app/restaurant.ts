export class Restaurant {

    public street = 'Street';
    public phone = '';
    public rating = 0;

    constructor(public id:number, public name:string, public city:string, 
        public lat:number, public lng:number, public image:string){}

}
