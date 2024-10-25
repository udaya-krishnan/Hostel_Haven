import { EditHost } from "../../../domain/entities/EditHost";
import { EditprofileUsecase } from "../../../domain/usecase/Host/EditProfileUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";
import bcrypt from 'bcrypt';

export class HostProfileService implements EditprofileUsecase {
    constructor(private hostRepository: HostRepository) {}

    async edit(values: EditHost): Promise<any | null> {
        try {
            const updateProfile = await this.hostRepository.edit(values);
            return updateProfile;
        } catch (error) {
            console.error("Error updating host profile:", error);
            throw new Error("Failed to update profile. Please try again later.");
        }
    }

    async image(name: string, email: string): Promise<any | null> {
        try {
            const updateImage = await this.hostRepository.image(name, email);
            return updateImage;
        } catch (error) {
            console.error("Error updating host image:", error);
            throw new Error("Failed to update image. Please try again later.");
        }
    }

    async changepassword(password: string, email: string): Promise<any | null> {
        try {
            password = await bcrypt.hash(password, 10);
            const changePassword = await this.hostRepository.changepassword(password, email);
            return changePassword;
        } catch (error) {
            console.error("Error changing password:", error);
            throw new Error("Failed to change password. Please try again later.");
        }
    }
}
