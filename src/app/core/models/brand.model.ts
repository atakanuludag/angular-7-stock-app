export class BrandModel {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public createdDate?: Date,
        public updatedDate?: Date,
    ) { }
}