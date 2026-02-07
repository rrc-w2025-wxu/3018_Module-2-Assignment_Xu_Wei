import { Ticket } from "src/interface_properties";
import { TicketPick } from "src/interface_properties";
import { tickets } from "../../data/data"
import { Priority } from "src/interface_properties";
import { generateKey } from "node:crypto";

export const getAllItems = ():TicketPick[] => {
    const items = tickets;
    return items;
}

export const getItem = (id : number):Ticket | undefined=> {
    const ticketsData = tickets;
    for(let ticket of ticketsData){
        if(ticket.id === id){ 
            const timeInterval = new Date().getTime() - ticket.createdAt.getTime();
            ticket.ticketAge = Math.floor(timeInterval / (1000 * 60 * 60 * 24));

            if(ticket.status === "open"){
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
            else{
                ticket.urgencyScore = 0;
                ticket.urgencyLevel = "Minimal. Ticket resolved.";
            }
            return ticket;
        }
    }        
    return undefined;
}

export const createItem = (title:string, description:string, priority:Priority) => {
    
    const newTicket:Ticket = {
        id : generateId(),
        title,
        description,
        priority,
        status : "open",
        createdAt : new Date(),
        currentTime: new Date()
    };
    tickets.push(newTicket);
    return newTicket;
}

function generateId(){
    const count = tickets.length;
    return count +1;
}