import { Ticket } from "src/interface_properties";
import { tickets } from "../../data/data"

export const getAllItems = ():Ticket[] => {
    const items = tickets;
    return items;
}

export const getItem = (id : number):Ticket | undefined=> {
    for(let ticket of tickets){
        if(ticket.id === id)
            return ticket;
    }
    return undefined;
}
