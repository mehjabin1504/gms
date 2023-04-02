export class DataTypeModel{
    uniqueId : any;
    dataType : any;
    minLength : any;
    maxLength : any;
    createdBy : string;
    updatedBy : string;
    activeFlag : string;
    approvalAuthorities : any;
    updatedApprovalAuthorities : any;

    constructor(dataTypeModel){
        this.uniqueId = dataTypeModel.uniqueId;
        this.dataType = dataTypeModel.dataType;
        this.minLength = dataTypeModel.minLength;
        this.maxLength = dataTypeModel.maxLength;
        this.createdBy = dataTypeModel.createdBy;
        this.updatedBy = dataTypeModel.updatedBy;
        this.activeFlag = dataTypeModel.activeFlag;
        this.approvalAuthorities = dataTypeModel.approvalAuthorities;
        this.updatedApprovalAuthorities = dataTypeModel.updatedApprovalAuthorities;
    }
}