import { HostLoginUseCase } from "../../../domain/usecase/Host/HostLoginUseCase";
import { HostRepository } from "../../interfaces/Host/HostRepository";
import bcrypt from "bcrypt";

export class HostLoginService implements HostLoginUseCase {
    constructor(private hostRepository: HostRepository) {}

    async find(email: string, password: string): Promise<any | null> {
        try {
            const data = await this.hostRepository.findHost(email);
            if (data) {
                if (await bcrypt.compare(password, data.password)) {
                    if (data.is_blocked === true) {
                        console.log('Account blocked');
                        return "Account blocked";
                    } else {
                        return data; // Successful login
                    }
                } else {
                    return "Password is incorrect"; // Corrected message
                }
            } else {
                return "Email not found"; // Corrected message
            }
        } catch (error) {
            console.error("Error during host login:", error);
            throw new Error("Failed to log in. Please try again later.");
        }
    }

    async rolechange(email: string): Promise<any | null> {
        try {
            const data = await this.hostRepository.ruleChange(email);
            return data;
        } catch (error) {
            console.error("Error changing host role:", error);
            throw new Error("Failed to change host role. Please try again later.");
        }
    }
}
