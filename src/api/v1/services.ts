import { Status, TicketOmit, Tickets } from "src/interface_properties";
import { tickets } from "../../data/data"
import { Priority } from "src/interface_properties";

/**
 * Get all tickets without the `currentTime` field.
 *
 * @returns TicketOmit[] - Array of tickets excluding currentTime
 */
export const getAllItems = ():TicketOmit[] => {
    // Use map to remove the currentTime property from each ticket
    const result = tickets.map(({ currentTime, ...rest }) => rest);
    return result;
}

/**
 * Show a single ticket by ID and calculate its urgency.
 *
 * @param id - Ticket ID to retrieve
 * @returns TicketOmit | undefined - Returns ticket without currentTime, or undefined if not found
 */
export const getItem = (id : number):TicketOmit | undefined=> {
    const ticketsData = tickets;
    for(let ticket of ticketsData){
        if(ticket.id === id){ 
            // Calculate ticket age in days
            const created = new Date(ticket.createdAt);
            const current = new Date(ticket.currentTime ?? new Date());

            const timeInterval = current.getTime() - created.getTime();
            ticket.ticketAge = Math.floor(timeInterval / (1000 * 60 * 60 * 24));

            // Calculate urgency based on status and priority
            if(ticket.status === "resolved"){
                ticket.urgencyScore = 0;
                ticket.urgencyLevel = "Minimal. Ticket resolved.";
            }
            else if(ticket.status === "open"){
                if(ticket.priority === "critical"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 50;
                }
                else if(ticket.priority === "high"){
                    ticket.urgencyScore = ticket.ticketAge * 5 +30;
                }
                else if(ticket.priority === "medium"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 20;
                }
                else{
                    ticket.urgencyScore = ticket.ticketAge * 5 + 10;
                }

                if(ticket.urgencyScore >= 80) {
                    ticket.urgencyLevel = "Critical. Immediate attention required.";
                } 
                else if(ticket.urgencyScore >= 55) { 
                    ticket.urgencyLevel = "High urgency. Prioritize resolution.";
                } 
                else if(ticket.urgencyScore >= 30) {
                    ticket.urgencyLevel = "Moderate. Schedule for attention.";
                } 
                else {
                    ticket.urgencyLevel = "Low urgency. Address when capacity allows.";
                }       
            }

            // Remove currentTime before returning
            const { currentTime, ...rest} = ticket;
            return rest;
        }
    } 

    // Return undefined if ticket not found       
    return undefined;
}

/**
 * Create a new ticket and add it to the ticket array.
 *
 * @param title - Ticket title
 * @param description - Ticket description
 * @param priority - Ticket priority (critical, high, medium, low)
 * @returns Tickets - The newly created ticket
 */
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

/**
 * Generate a new ticket ID based on current tickets length.
 *
 * @returns number - New ticket ID
 */
function generateId(){
    const count = tickets.length;
    return count +1;
}

/**
 * Update an existing ticket's priority and status.
 *
 * @param id - Ticket ID to update
 * @param priority - New priority
 * @param status - New status
 * @returns TicketOmit | undefined - Updated ticket without currentTime, or undefined if not found
 */
export const updateItem = (id : number, priority:Priority, status:Status):TicketOmit | undefined => {
    const ticketsData = tickets;
    for (let ticket of ticketsData){
        if (ticket.id === id){
            ticket.priority = priority;
            ticket.status = status;

            // Calculate ticketAge
            const created = new Date(ticket.createdAt);
            const current = new Date();
            ticket.ticketAge = Math.floor((current.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

            // Calculate score and level
            if(ticket.status === "resolved"){
                ticket.urgencyScore = 0;
                ticket.urgencyLevel = "Minimal. Ticket resolved.";
            }
            else if(ticket.status === "open"){
                if(ticket.priority === "critical"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 50;
                }
                else if(ticket.priority === "high"){
                    ticket.urgencyScore = ticket.ticketAge * 5 +30;
                }
                else if(ticket.priority === "medium"){
                    ticket.urgencyScore = ticket.ticketAge * 5 + 20;
                }
                else{
                    ticket.urgencyScore = ticket.ticketAge * 5 + 10;
                }

                if(ticket.urgencyScore >= 80) {
                    ticket.urgencyLevel = "Critical. Immediate attention required.";
                } 
                else if(ticket.urgencyScore >= 55) { 
                    ticket.urgencyLevel = "High urgency. Prioritize resolution.";
                } 
                else if(ticket.urgencyScore >= 30) {
                    ticket.urgencyLevel = "Moderate. Schedule for attention.";
                } 
                else {
                    ticket.urgencyLevel = "Low urgency. Address when capacity allows.";
                }       
            }

            const { currentTime, ...rest} = ticket;
            return rest;
        }
    }
}

/**
 * Delete a ticket by ID.
 *
 * @param id - Ticket ID to delete
 */
export const deleteItem = (id:number) => {
    const index = tickets.findIndex(ticket => ticket.id === id);

    if (index !== -1){
        tickets.splice(index, 1);
    }
}