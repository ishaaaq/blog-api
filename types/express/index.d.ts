import { user } from "../../src/types";

declare global {
    namespace Express {
        interface Request {
            user?: user
        }
    }
}