export default class Field{
    fieldId: string;
    name: string;
    location: string;
    size: number;
    image1: string;
    image2: string;

    constructor(
        fieldId: string,
        name: string,
        location: string,
        size: number,
        image1: string,
        image2: string
    ) {
        this.fieldId = fieldId;
        this.name = name;
        this.location = location;
        this.size = size;
        this.image1 = image1;
        this.image2 = image2;
    }
}