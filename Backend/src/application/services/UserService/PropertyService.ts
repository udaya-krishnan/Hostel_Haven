import { UserRepository } from "../../interfaces/User/UserRepository";
import { PropertyUseCase } from "../../../domain/usecase/User/PropertyUsecase";

export class PropertyService implements PropertyUseCase {
    constructor(private userRepository: UserRepository) {}

    async fetchhostel(search: string): Promise<any | null> {
        try {
            const hostel = await this.userRepository.fetchhostel(search);
            return hostel;
        } catch (error) {
            console.error("Error fetching hostel:", error);
            throw new Error("Failed to fetch hostel. Please try again later.");
        }
    }

    async fetchroom(search: string): Promise<any | null> {
        try {
            const room = await this.userRepository.fetchroom(search);
            return room;
        } catch (error) {
            console.error("Error fetching room:", error);
            throw new Error("Failed to fetch room. Please try again later.");
        }
    }

    async propertydetails(id: string): Promise<any | null> {
        try {
            const data = await this.userRepository.properttdetails(id);
            return data;
        } catch (error) {
            console.error("Error fetching property details:", error);
            throw new Error("Failed to fetch property details. Please try again later.");
        }
    }

    async wishlist(userId: string, proId: string): Promise<any | null> {
        try {
            const data = await this.userRepository.wishlist(userId, proId);
            return data;
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            throw new Error("Failed to add to wishlist. Please try again later.");
        }
    }

    async findwish(userId: string): Promise<any | null> {
        try {
            const data = await this.userRepository.findWishlist(userId);
            return data;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            throw new Error("Failed to fetch wishlist. Please try again later.");
        }
    }

    async fetchwishlist(id: string): Promise<any | null> {
        try {
            const data = await this.userRepository.fetchwishlist(id);
            return data;
        } catch (error) {
            console.error("Error fetching wishlist by ID:", error);
            throw new Error("Failed to fetch wishlist by ID. Please try again later.");
        }
    }

    async removewish(id: string): Promise<any | null> {
        try {
            const data = await this.userRepository.removewish(id);
            return data;
        } catch (error) {
            console.error("Error removing wishlist item:", error);
            throw new Error("Failed to remove wishlist item. Please try again later.");
        }
    }

    async fetchwish(id: string, userId: string): Promise<any | null> {
        try {
            const data = await this.userRepository.fetchwish(id, userId);
            return data;
        } catch (error) {
            console.error("Error fetching wish:", error);
            throw new Error("Failed to fetch wish. Please try again later.");
        }
    }

    async fetchnearme(lat: number, lng: number): Promise<any | null> {
        try {
            const data = await this.userRepository.fetchnearme(lat, lng);
            return data;
        } catch (error) {
            console.error("Error fetching nearby properties:", error);
            throw new Error("Failed to fetch nearby properties. Please try again later.");
        }
    }

    async rateProperty(userId: string, proId: string, rate: number, review: string): Promise<any | null> {
        try {
            const data = await this.userRepository.rateProperty(userId, proId, rate, review);
            return data;
        } catch (error) {
            console.error("Error rating property:", error);
            throw new Error("Failed to rate property. Please try again later.");
        }
    }

    async fetchReview(proId: string): Promise<any | null> {
        try {
            const fetch = await this.userRepository.fetchReview(proId);
            return fetch;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw new Error("Failed to fetch reviews. Please try again later.");
        }
    }
}
