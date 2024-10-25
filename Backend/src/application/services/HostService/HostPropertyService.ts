import { FetchProperty } from "../../../domain/usecase/Host/fetchPropertCase";
// import { HostRepositoryImpl } from "../../../infrastructure/repositories/HostRepo/HostRepositoryImpl";
import { HostRepository } from "../../interfaces/Host/HostRepository";

export class HostPropertyService implements FetchProperty {
    constructor(private hostrepository: HostRepository) {}

    async fetchamenities(): Promise<any | null> {
        try {
            const data = await this.hostrepository.fetchamenities();
            return data;
        } catch (error) {
            console.error("Error fetching amenities:", error);
            throw new Error("Failed to fetch amenities. Please try again later.");
        }
    }

    async fetchsafety(): Promise<any | null> {
        try {
            const data = await this.hostrepository.fetchsafety();
            return data;
        } catch (error) {
            console.error("Error fetching safety measures:", error);
            throw new Error("Failed to fetch safety measures. Please try again later.");
        }
    }

    async addproperty(data: any): Promise<any | null> {
        try {
            const res = await this.hostrepository.addProperty(data);
            return res;
        } catch (error) {
            console.error("Error adding property:", error);
            throw new Error("Failed to add property. Please try again later.");
        }
    }

    async fetchProperty(id: string): Promise<any | null> {
        try {
            const res = await this.hostrepository.fetchproperty(id);
            return res;
        } catch (error) {
            console.error("Error fetching property:", error);
            throw new Error("Failed to fetch property. Please try again later.");
        }
    }

    async updateproperty(data: any, id: string): Promise<any | null> {
        try {
            const res = await this.hostrepository.updateproperty(data, id);
            return res;
        } catch (error) {
            console.error("Error updating property:", error);
            throw new Error("Failed to update property. Please try again later.");
        }
    }

    async available(id: string): Promise<any | null> {
        try {
            const res = await this.hostrepository.available(id);
            return res;
        } catch (error) {
            console.error("Error checking property availability:", error);
            throw new Error("Failed to check property availability. Please try again later.");
        }
    }

    async fetchreservation(id: string): Promise<any | null> {
        try {
            const res = await this.hostrepository.fetchreservation(id);
            return res;
        } catch (error) {
            console.error("Error fetching reservation:", error);
            throw new Error("Failed to fetch reservation. Please try again later.");
        }
    }

    async fetchRating(proId: string): Promise<any | null> {
        try {
            const res = await this.hostrepository.fetchRating(proId);
            return res;
        } catch (error) {
            console.error("Error fetching property rating:", error);
            throw new Error("Failed to fetch property rating. Please try again later.");
        }
    }
}
