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
    notes: string;
    photos: Photo[];
}

export interface Photo {
    id: number;
    tripId: number;
    url: string;
    publicId: string;
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

export const getDateString = (date: Date | null, year: number) => {
    if(date){
        var d = new Date(date); // TODO figure out what date doesn't work
        return `${(d.getMonth() + 1)}/${d.getDate()}/${d.getFullYear()}`
    }
    return year;
};