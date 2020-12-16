export class RestaurantRating {
    constructor(public id:string, public rest_id:string, public customer_id:string,
         public rating:number, public date_rated:string){}
}
