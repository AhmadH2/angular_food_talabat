export class RestaurantRating {
    constructor(public id:number, public rest_id, public customer_id:number,
         public rating:number, public date_rated:string){}
}
