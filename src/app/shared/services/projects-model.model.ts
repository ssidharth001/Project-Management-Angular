export class ProjectsModel {
    constructor(
        public projectName: string,
        public clientName: string,
        public startDate: string,
        public endDate: string,
        public progress: number,
        public description: string,
        public technologies?: [],
        public projectId?: string) { }
}
