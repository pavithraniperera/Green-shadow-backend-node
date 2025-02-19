export default class Crop{
    cropId: string;
    commonName: string;
    specificName: string;
    category: string;
    season: string;
    image1: string;
    fieldId: string;


    constructor(
        cropId: string,
        commonName: string,
        specificName: string,
        category: string,
        season: string,
        image1: string,
        fieldId: string
    ) {
        this.cropId = cropId;
        this.commonName = commonName;
        this.specificName = specificName;
        this.category = category;
        this.season = season;
        this.image1 = image1;
        this.fieldId = fieldId;
    }
}