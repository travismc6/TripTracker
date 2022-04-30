export interface TripListItem {
    id: number;
    river: string;
    state: string;
    year: number;
    date: Date | null;
    stage: string;
    flow:string;
    startName: string;
    endName: string;
    endCoordinates:string;
    startCoordinates:string;
    distanceMiles:number;
    timeMinutes:number;
    notes:number;
}

export const getLatitude = (coordinates: string) => {
    return +coordinates.replace(/\s/g, "").split(',')[0];
};

export const getLongitude = (coordinates: string) => {
    return +coordinates.replace(/\s/g, "").split(',')[1];
};

export const getTimeString = (totalMinutes: number) => {
    let time = "";
    let minutes = totalMinutes;
    let hours = 0;

    while(minutes >= 60){
        hours++;
        minutes-=60;
    }

    if(hours > 0){
        time += hours + " hr ";
    }

    if(minutes && minutes > 0){
        time += minutes + " min";
    }

    return time;
};