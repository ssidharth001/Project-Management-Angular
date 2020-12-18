export class ProjectData {
    public clientName: string;
    public description: string;
    public projectName: string;
    public startDate: string;
    public endDate: string;
    public progress: number;
    public projectId: number;
    public projectStatus: string;
    public technologies: string;

    constructor(clientName: string,
        description: string,
        projectName: string,
        startDate: string,
        endDate: string,
        progress: number,
        projectId: number,
        projectStatus: string,
        technologies: string) {

        this.clientName = clientName;
        this.description = description;
        this.projectName = projectName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.progress = progress;
        this.projectId = projectId;
        this.projectStatus = projectStatus;
        this.technologies = technologies;
    }
}