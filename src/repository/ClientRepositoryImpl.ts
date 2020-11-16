import { injectable } from "inversify";

@injectable()
export class ClientRepositoryImpl {
    getName(): string {
        return "André kitano dsa"
    }
}