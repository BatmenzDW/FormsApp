export interface Task {
    id?: string;
    invoiceID: number;
    jobName: string;
    phone: string;
    takenBy: string;
    orderNum: string;
    dayWorkBol: boolean;
    contractBol: boolean;
    extraBol: boolean;
    jobLocation: string;
    jobPhone: string;
    startingDate: string;
    jobTo: string;
    jobDescription: string;
    dateCompleted: string;
    totalMaterials: number;
    totalOther: number;
    totalLabor: number;
    tax: number;
    total: number;
    materialIDs: number[];
    materialQuantities: number[];
    materialDescriptions: string[];
    materialPrices: number[];
    materialAmounts: number[];
    otherIDs: number[];
    otherDescriptions: string[];
    otherPrices: number[];
    laborIDs: number[];
    laborDescriptions: string[];
    laborHrs: number[];
    laborRates: number[];
    laborAmounts: number[];
  }