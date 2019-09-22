import { BrandModel } from './brand.model';

export class StockModel {
    constructor(
        public id: number,
        public stockCode: string,
        public quantity: number,
        public description: string,
        public brand: BrandModel,
        public purchasePrice: number,
        public salePrice: number,
        public shelfCode: string,
        public compatibleModels: string,
        public createdDate?: Date,
        public updatedDate?: Date,
    ) { }
}