import { CycladesData } from "./cyclades-data";

/**
 * @interface Profile information of the "play time" of the user in the app
 */

export interface Profile {
    name: string
    cycladesData: CycladesData
}