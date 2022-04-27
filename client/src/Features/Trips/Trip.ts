import { integerPropType } from "@mui/utils";

export interface TripListItem {
    id: number;
    river: string;
    state: string;
    year: number;
    stage: string;
    flow:string;
    startName: string;
    endName: string;
    endCoordinates:string;
    startCoordinates:string;
    distanceMiles:number;
    timeMinutes:number;
}