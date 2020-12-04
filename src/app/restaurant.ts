export class Restaurant {

    //a.restaurant: (id, name, city, lat, lng, phone, image)

    public street = 'Street';
    public phone = '';
    public rating = 0;

    constructor(public id:number, public name:string, public city:string, 
        public lat:number, public lng:number, public image:string){}

    // constructor(public id: number, public name: string, public city: string,
    //     public street: string, public lat: number,
    //     public lng: number, public phone: string, public image: string, public rating: number) { }
}
