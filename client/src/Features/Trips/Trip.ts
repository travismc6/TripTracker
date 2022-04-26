import { integerPropType } from "@mui/utils";

export interface TripListItem {
    id: number;
    river: string;
    state: string;
    year: number;
    stage: string;
    startName: string;
    endName: string;
}