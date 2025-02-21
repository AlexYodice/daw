import { dialog } from 'electron'
import fs from 'fs/promises'

export class FileManager {
    constructor() {
        this.currentProject = null;
        this.defaultProjectSettings = {
            version: "1.0",
            name: "Untitled Project",
            tempo: 120,
            timeSignature: { numerator: 4, denominator: 4 },
            tracks: []
        };
    }

    async saveProject(tracks, filePath = null) {
        try {
            const projectData = {
                ...this.defaultProjectSettings,
                name: this.currentProject?.name || "Untitled Project",
                tracks: tracks,
                lastModified: new Date().toISOString()
            };

            // If no path, open save dialog
            if (!filePath) {
                const { filePath: savedPath } = await dialog.showSaveDialog({
                    title: 'Save Project',
                    defaultPath: `${projectData.name}.al`,
                    filters: [
                        { name: 'AL Studios Project', extensions: ['al'] }
                    ]
                });
                filePath = savedPath;
            }

            if (filePath) {
                await fs.writeFile(filePath, JSON.stringify(projectData, null, 2));
                this.currentProject = { path: filePath, ...projectData };
                return true;
            }
        } catch (error) {
            console.error('Error saving project:', error);
            return false;
        }
    }

    async loadProject() {
        try {
            const { filePaths } = await dialog.showOpenDialog({
                title: 'Open Project',
                filters: [
                    { name: 'AL Studios Project', extensions: ['al'] }
                ],
                properties: ['openFile']
            });

            if (filePaths.length > 0) {
                const fileContent = await fs.readFile(filePaths[0], 'utf-8');
                const projectData = JSON.parse(fileContent);
                this.currentProject = { path: filePaths[0], ...projectData };
                return projectData;
            }
        } catch (error) {
            console.error('Error loading project:', error);
            return null;
        }
    }
} 