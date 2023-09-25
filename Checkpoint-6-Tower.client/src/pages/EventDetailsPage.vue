<template>
    <div v-if="event" class="container">
        <!-- <div class="text-light">
            <h1 class="m-0">
                Here are some details on {{ event.name }}
            </h1>
        </div> -->
        <!-- event card (w/ attend confirm) -->

        <!-- TODO make sure to put the cancel and attend buttons somehwere on the details! Make sure to hook up those functions down below -->
        <!-- TODO make sure we conditionally render if the event is canceled .... v-if="event.isCanceled"..... show some other text here that says "Hey this is canceled" -->
        <section class="row">
            <div class="col-12 frosted-card px-0">
<div class="row">


                <!-- event photo -->
                <div class="col-5">
                    <img class="cover-img" :src="event.coverImg" :alt="event.name + 'cover image'">
                </div>
                <!-- event details, 3 rows: title, time / description/ spots left & attend button -->
                <div class="col-7">
                    
                    <!-- 2 div: name, p: place/ date/time -->
                    <div class="row justify-content-between">
                        <div>
                            <!-- h3? title -->
                            <h3>
                                {{ event.name }}
                            </h3>
                            <!-- location -->
                            <p>
                                {{event.location }}
                            </p>
                        </div>
                        <div>
                            {{ new Date( event.startDate).toLocaleDateString() }}
                        </div>
                        <div v-if="event.capacity - tickets.length > 0" class="row justify-content-center">
                           <!-- <button class="btn btn-outline-light col-6" @click="purchaseTicket">GET TICKETS</button> -->
                           <button v-if="!ticketholder && user.isAuthenticated" :disabled="ticketholderToggle" class="btn btn-outline-light col-6" @click="purchaseTicket">GET TICKETS</button>
                           <button v-else-if="user.isAuthenticated" class="btn btn-outline-light col-6" @click="returnTicket">RETURN TICKETS</button>
                           <!-- <button v-else-if="event.capacity - tickets.length === 0" class="btn btn-outline-danger col-6">FULL</button> -->
                           <button v-else disabled class="btn btn-outline-light col-6">Log in to buy or return tickets</button>
                        </div>
                        <div v-if="event.capacity - tickets.length == 0" class="row justify-content-center">
                           <!-- <button class="btn btn-outline-light col-6" @click="purchaseTicket">GET TICKETS</button> -->
                           <button v-if="ticketholder && user.isAuthenticated" class="btn btn-outline-light col-6" @click="returnTicket">RETURN TICKETS</button>
                           <button v-else-if="!ticketholder" disabled class="btn btn-danger col-6">FULL</button>
                           <button v-else disabled class="btn btn-danger col-6">Full event</button>
                        </div>
                    </div>
</div>                    
                </div>
            </div>
            <div class="row justify-content-end">
                <button @click="cancelEvent" class="cancel-card btn text-light d-flex my-2 col-2">
                    Cancel Event
                </button>
            </div>
            </section>
            

        <!-- attendees section NO row -->
        <section class=" text-light">
            <!-- this is the "collab" section -->
            Total Attendees: {{ event.ticketCount }}
            <!-- TODO bring in ticket holder images and :alt ticket holder name -->
        

                <img v-for="ticket in tickets" :key="ticket.id" :src="ticket.profile.picture" :alt="ticket.profile.name" class="attend-img">
          
        </section>

        <!-- comments section -->
        <div class="text-light">Leave a word:</div>
            <!-- look at hackathons -->
            <section class="row justify-content-center">
            <section class="col-10">

           
                <!-- TODO comments form - single input, submmit button -->
                <form @submit.prevent="createComment" action="">
                <div>
                    <label class=text-light for="">Post Comment!</label>
                </div>
                <textarea v-model="eventComment.body" class="col-12" cols="30" rows="3" maxlength="250">

                </textarea>
                <button class="btn btn-outline-light text-light">SUBMIT</button>
                </form>
            <!-- TODO bring in a comments component OR just put them here in a card - make sure the user image and name is present on the card a long with the commment body-->
            </section>
        </section>
        <section class="row text-light justify-content-around glass-card my-1" v-for="tComm in towerComments" :key="tComm.id">
            <!-- this  ⬇️ rendered after moving backend Comments service code into Event service -->
<div class="col-1">
    <img :src="tComm.creator.picture" class="icon-img" :alt="tComm.creator.name">
    <div>{{ tComm.creator.name }}</div>
</div>
<div class="col-8">
    {{ tComm.body }}
    <p class="row justify-content-end">
        <button v-if="tComm.creator.id == account.id" @click="deleteComment" class="cancel-card btn col-4 text-light">DELETE</button>
    </p>
</div>
        </section>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { api } from '../services/AxiosService.js';
import { Comment } from '../models/Comment.js';
export default {
// PAGES DON'T TAKE IN PROPS

    setup(){
        // don't forget ()
        const route = useRoute()
const eventComment = ref({})
const ticketholderToggle = ref(false)

        watchEffect(()=> {
            getEventById()
            getCommentsInEvent()
            getTicketsByEventId()
            // TODO call our getTicketsByEventId function ✅
        })
        async function getEventById(){
            try {
                // const eventId = route.params.eventId
                await eventsService.getEventById(route.params.eventId)
                
            } catch (error) {
                logger.log(error)
                Pop.error(error)
                
            }
        }
      
        async function getCommentsInEvent(){
            try {
                const eventId = route.params.eventId
                logger.log(route.params.eventId)
                await eventsService.getCommentsInEvent(eventId)
                
            } catch (error) {
                // Pop.error("Wherefore dost thou err, o wordless quip?",error)
                Pop.error(error)
                
            }
        }


        // TODO finish this function yay!
        async function getTicketsByEventId(){
            try {
                await eventsService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        

        
        return { 
            ticketholderToggle,
            eventComment, 
            // TODO finish this function yay! .... maybe this exists on the form instead...
        async createComment(){
            try {
                logger.log(eventComment.value, AppState.activeEvent.id, route.params.eventId)
                eventComment.value.eventId = route.params.eventId
                // const newComment = eventComment.body
                // const eventId = route.params.eventId

                 await eventsService.createComment(eventComment.value)
                 eventComment.value = {}
                Pop.success('success')
            } catch (error) {
                Pop.error(error)
            }
        },
        // TODO finish this function yay! <--not currently working yet
        async cancelEvent(){
          try {
             const cancellation = await Pop.confirm()
             if(!cancellation){
                return
             }
             const eventId = route.params.eventId

             await eventsService.cancelEvent(eventId)
          } catch (error) {
            Pop.error(error)
          }
        },

           // TODO finish this function yay!
           async deleteComment(){
            try {
                const deleteComment = AppState.activeEventComments.find(comment => comment.creatorId == AppState.account.id)
                const deletedCommentId = deleteComment.id
        
                await eventsService.deleteComment(deletedCommentId)
            
            } catch (error) {
                Pop.error(error)
            }
            
        },

        

        // compute in our comments from the appState
        // compute in our tickets from the appState
        account: computed(()=> AppState.account),
        user: computed(()=> AppState.user),
        event : computed(()=> AppState.activeEvent),
        towerComments: computed(()=> AppState.activeEventComments),
        tickets: computed(()=> AppState.activeEventTickets),
        ticketholder: computed(()=> AppState.activeEventTickets.find(holder => holder.accountId == AppState.account.id)),
                // TODO finish this function yay!
                async purchaseTicket(){
            try {
                ticketholderToggle.value = true
                let ticketData = {eventId: route.params.eventId}
                await ticketsService.purchaseTicket(ticketData)
                ticketholderToggle.value = false
            } catch (error) {
                Pop.error(error)
            }
        },

        async returnTicket(){
           try {
             let ticket = AppState.activeEventTickets.find(ticket =>ticket.accountId ==AppState.account.id)
             await ticketsService.returnTicket(ticket.id)
           } catch (error) {
            Pop.error(error)
           }
        }

     }
    }
};
</script>


<style lang="scss" scoped>

.cover-img{
   border-top-left-radius: 15px;
   border-bottom-right-radius: 15px;
  
  width: 100%;
  object-fit: cover;
  object-position: center;
// elevation-2 settings
  box-shadow: 0 3px 3px -1px rgba(205, 205, 205, 0.2), 
  0 5px 6px 0 rgba(205, 205, 205, 0.14), 
  0 1px 8px 0 rgba(205, 205, 205, 0.12);
}

.cancel-card{
  backdrop-filter: blur(10px);
    background-color: rgba(255, 21, 21, 0.808);
}
.cancel-card:hover{
  backdrop-filter: blur(15px);
  box-shadow: 0 0 10px 2px rgb(248, 0, 0);
    transform: scale(1.01);
    transition: 0.35s ease;
}

.icon-img{
    max-height: 50px;
    border-radius: 50%;
}
.attend-img{
    max-height: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
}
.frosted-card{
  backdrop-filter: blur(7px);
    background-color: rgba(218, 218, 218, 0.455);
border-radius: 15px;
}
.glass-card{
  backdrop-filter: blur(7px);
    background-color: rgba(218, 218, 218, 0.255);
border-radius: 15px;
}
</style>