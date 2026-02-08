import { Status, TicketOmit, Tickets } from "src/interface_properties";
import { tickets } from "../../data/data"
import { Priority } from "src/interface_properties";

export const getAllItems = ():TicketOmit[] => {
    const result = tickets.map(({ currentTime, ...rest }) => rest);
    return result;
}

export const getItem = (id : number):TicketOmit | undefined=> {
    const ticketsData = tickets;
    for(let ticket of ticketsData){
        if(ticket.id === id){ 
            const created = new Date(ticket.createdAt);
            const current = new Date(ticket.currentTime ?? new Date());

            const timeInterval = current.getTime() - created.getTime();
            ticket.ticketAge = Math.floor(timeInterval / (1000 * 60 * 60 * 24));

            if(ticket.status === "resolved"){
                ticket.urgencyScore = 0;
                ticket.urgencyLevel = "Minimal. Ticket resolved.";
            }
            else if(ticket.status === "open"){
                if(ticket.priority === "critical"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 50;
                    ticket.urgencyLevel = "Critical. Immediate attention required.";
                }
                else if(ticket.priority === "high"){
                    ticket.urgencyScore = ticket.ticketAge * 5 +30;
                    ticket.urgencyLevel = "High urgency. Prioritize resolution.";
                }
                else if(ticket.priority === "medium"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 20;
                    ticket.urgencyLevel = "Moderate. Schedule for attention.";
                }
                else{
                    ticket.urgencyScore = ticket.ticketAge * 5 + 10;
                    ticket.urgencyLevel = "Low urgency. Address when capacity allows.";
                }
            }
            const { currentTime, ...rest} = ticket;
            return rest;
        }
    }        
    return undefined;
}

export const createItem = (title:string, description:string, priority:Priority) => {
    
    const newTicket:Tickets = {
        id : generateId(),
        title,
        description,
        priority,
        status : "open",
        createdAt : new Date(),
    };
    tickets.push(newTicket);
    return newTicket;
}

function generateId(){
    const count = tickets.length;
    return count +1;
}

export const updateItem = (id : number, priority:Priority, status:Status):TicketOmit | undefined => {
    const ticketsData = tickets;
    for (let ticket of ticketsData){
        if (ticket.id === id){
            ticket.priority = priority;
            ticket.status = status;

            const { currentTime, ...rest} = ticket;
            return rest;
        }
    }
}

export const deleteItem = (id:number) => {
    const index = tickets.findIndex(ticket => ticket.id === id);

    if (index !== -1){
        tickets.splice(index, 1);
    }
}