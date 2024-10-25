import { RegisterUseCase } from "../../../domain/usecase/User/RegisterUseCase";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../interfaces/User/UserRepository";
import bcrypt from 'bcrypt';

export class RegisterService implements RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(user: User): Promise<any | null> {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            console.log(user);
            const newUser = await this.userRepository.createUser(user);
            return newUser;
        } catch (error) {
            console.error("Error during user registration:", error);
            throw new Error("Failed to register user. Please try again later.");
        }
    }

    async find(email: string): Promise<any | null> {
        try {
            const emailExist = await this.userRepository.findUser(email);
            return emailExist;
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error("Failed to find user by email. Please try again later.");
        }
    }

    async GoogleRegister(user: any): Promise<any | null> {
        try {
            const newUser = await this.userRepository.googleRegister(user);
            return newUser;
        } catch (error) {
            console.error("Error during Google registration:", error);
            throw new Error("Failed to register user with Google. Please try again later.");
        }
    }

    async forgotpass(email: string, password: string): Promise<any | null> {
        try {
            const byripassword = await bcrypt.hash(password, 10);
            const update = await this.userRepository.forgot(email, byripassword);
            return update;
        } catch (error) {
            console.error("Error during password reset:", error);
            throw new Error("Failed to reset password. Please try again later.");
        }
    }
}
