import { EditUser } from "../../../domain/entities/EditUser";
import { EditprofileUsecase } from "../../../domain/usecase/User/EditprofileUsecase";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from 'bcrypt';

export class ProfileService implements EditprofileUsecase {
    constructor(private userRepository: UserRepository) {}

    async edit(values: EditUser): Promise<any | null> {
        try {
            const updateProfile = await this.userRepository.edit(values);
            return updateProfile;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Failed to update profile. Please try again later.");
        }
    }

    async image(name: string, email: string): Promise<any | null> {
        try {
            const updateImage = await this.userRepository.image(name, email);
            return updateImage;
        } catch (error) {
            console.error("Error updating image:", error);
            throw new Error("Failed to update image. Please try again.");
        }
    }

    async changepassword(password: string, email: string): Promise<any | null> {
        try {
            password = await bcrypt.hash(password, 10);
            const changePassword = await this.userRepository.changepassword(password, email);
            return changePassword;
        } catch (error) {
            console.error("Error changing password:", error);
            throw new Error("Failed to change password. Please try again.");
        }
    }
}
