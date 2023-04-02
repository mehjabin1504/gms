export class EventWiseDynamicItemModel {
    uniqueId: any;
    applicationUniqueId: any;
    componentUniqueId: any;
    eventUniqueId: any;
    itemId: any;
    itemUniqueDataType: string;
    itemName: string;
    itemLevel: string;
    minNumber: any;
    maxNumber: any;
    required: string;
    minLength: number;
    maxLength: any;
    pattern: any;
    createdBy: any;
    approvalAuthorities: any;
    updatedBy: any;
    activeFlag: any;
    additionalInformation: any;
    email : any;
    patternType : any;
    patternExpresion : any;
    rightOfPrevious: any;
    xposition: any;
    yposition: any;


    constructor(eventWiseDynamicItemModel) {
        this.uniqueId = eventWiseDynamicItemModel.uniqueId;
        this.applicationUniqueId = eventWiseDynamicItemModel.applicationUniqueId;
        this.componentUniqueId = eventWiseDynamicItemModel.componentUniqueId;
        this.eventUniqueId = eventWiseDynamicItemModel.eventUniqueId;
        this.itemId = eventWiseDynamicItemModel.itemId;
        this.itemUniqueDataType = eventWiseDynamicItemModel.itemUniqueDataType;
        this.itemName = eventWiseDynamicItemModel.itemName;
        this.itemLevel = eventWiseDynamicItemModel.itemLevel;
        this.minNumber = eventWiseDynamicItemModel.minNumber;
        this.maxNumber = eventWiseDynamicItemModel.maxNumber;
        this.required = eventWiseDynamicItemModel.required;
        this.minLength = eventWiseDynamicItemModel.minLength;
        this.maxLength = eventWiseDynamicItemModel.maxLength;
        this.pattern = eventWiseDynamicItemModel.pattern;
        this.createdBy = eventWiseDynamicItemModel.createdBy;
        this.approvalAuthorities = eventWiseDynamicItemModel.approvalAuthorities;
        this.updatedBy = eventWiseDynamicItemModel.updatedBy;
        this.activeFlag = eventWiseDynamicItemModel.activeFlag;
        this.additionalInformation = eventWiseDynamicItemModel.additionalInformation;
        this.email = eventWiseDynamicItemModel.email;
        this.patternType = eventWiseDynamicItemModel.patternType;
        this.patternExpresion = eventWiseDynamicItemModel.patternExpresion;

        this.rightOfPrevious = eventWiseDynamicItemModel.rightOfPrevious;
        this.xposition = eventWiseDynamicItemModel.xposition;
        this.yposition = eventWiseDynamicItemModel.yposition;
      }
}