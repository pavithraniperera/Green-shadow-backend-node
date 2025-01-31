class Logs {
    logId: string;
    logDetails: string;
    date: Date;
    image2: string;
    status: string;
    staffId: string;
    fieldId: string;
    cropId: string;

    constructor(
        logId: string,
        logDetails: string,
        date: Date,
        image2: string,
        status: string,
        staffId: string,
        fieldId: string,
        cropId: string
    ) {
        this.logId = logId;
        this.logDetails = logDetails;
        this.date = date;
        this.image2 = image2;
        this.status = status;
        this.staffId = staffId;
        this.fieldId = fieldId;
        this.cropId = cropId;
    }
}

export default Logs;
