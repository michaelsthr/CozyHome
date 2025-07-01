export interface EventWithId extends Event {
    id: string;
}

export interface Event {
    name: string;
    startDate: string;
    endDate: string;
    repeat: boolean;
    wholeday: boolean;
    creator: string;
    description: string;
    category: string; // id of category
}

export interface Category {
    name: string;
    color: string;
}
