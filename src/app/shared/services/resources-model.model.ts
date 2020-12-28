export class ResourcesModel {
    constructor(
        public projectId: number,
        public resourceId: number,
        public resourceName: string,
        public email: string,
        public role: string,
        public billable: boolean,
        public billableAmount: number,
        public rateperhour: number) { }
}