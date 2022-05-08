export interface TripListItem {
    id: number;
    river: string;
    state: string;
    date: Date;
    stage: string;
    flow?:number;
    startName: string;
    endName: string;
    endCoordinates:string;
    startCoordinates:string;
    distanceMiles:number;
    timeMinutes:number;
    measuredAt:string;
    notes: string;
    photos: Photo[];
    days?: number;
}

export interface UploadTrip {
    river: string;
    state: string;
    date: Date | undefined;
    stage: string;
    flow:number | undefined;
    startName: string;
    endName: string;
    endCoordinates:string;
    startCoordinates:string;
    distanceMiles: number;
    timeHours:number;
    timeMinutes:number;
    measuredAt: string;
    notes: string;
    days: number;
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

export const getDateString = (date: Date) => {
        var d = new Date(date); // TODO figure out what date doesn't work
        return `${(d.getMonth() + 1)}/${d.getDate()}/${d.getFullYear()}`
};


export const getFullDateString = (date: Date, days: number | undefined) => {
    var startDate = new Date(date); // TODO figure out what date doesn't work
    if (days && days > 1) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (days - 1));
      return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
    } else {
      return `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
    }
  };