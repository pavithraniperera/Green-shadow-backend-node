class Vehicle {
    vehicleId: string;
    plateNumber: string;
    category: string;
    fuelType: string;
    status: string;
    remarks: string;
    staffId: string;

    constructor(
        vehicleId: string,
        plateNumber: string,
        category: string,
        fuelType: string,
        status: string,
        remarks: string,
        staffId: string
    ) {
        this.vehicleId = vehicleId;
        this.plateNumber = plateNumber;
        this.category = category;
        this.fuelType = fuelType;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;
    }
}

export default Vehicle;
