class Equipment {
    equipmentId: string;
    type: string;
    name: string;
    status: string;
    fieldId: string;
    staffId: string;
    remarks: string;

    constructor(
        equipmentId: string,
        type: string,
        name: string,
        status: string,
        fieldId: string,
        staffId: string,
        remarks: string
    ) {
        this.equipmentId = equipmentId;
        this.type = type;
        this.name = name;
        this.status = status;
        this.fieldId = fieldId;
        this.staffId = staffId;
        this.remarks = remarks;
    }
}

export default Equipment;
