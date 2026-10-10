import {updateTime} from "./Generate_dateTime.js"
const teamData = JSON.parse(sessionStorage.getItem("teamData"));


  // Import the functions you need from the SDKs you need
  import { initializeApp } from  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import {   getFirestore,  collection,  doc,  setDoc } from  "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


//Your web app's Supabase configuration
const NEXT_PUBLIC_SUPABASE_URL="https://kaxbetwrxbhyilgvidkf.supabase.co";
// const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_D_s7iJL2R6q7S1KeL0Vrkw_UiFRh856";
const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtheGJldHdyeGJoeWlsZ3ZpZGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NzQ1NjgsImV4cCI6MjEwNjQ1MDU2OH0.EWOq2Tz1jqwvdnpdoMAk4FbX5yhPt7-_sXmQyySQ-RY";

// Initialize Supabase
const supabaseClient  = supabase.createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
// console.log(supabaseClient );


// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCrtDQabgt75AYNWpois2tWxcCV7D7_udI",
    authDomain: "e-ticket-collect.firebaseapp.com",
    projectId: "e-ticket-collect",
    storageBucket: "e-ticket-collect.firebasestorage.app",
    messagingSenderId: "201690788459",
    appId: "1:201690788459:web:eb8ed6947f21b89b97772e"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);



async function addTicket(utrNo) {
  teamData.utr = utrNo;
  teamData.timeUtr = updateTime();



  //Firebase:

  // Firebase generates a unique ID automatically
  const docInfo = doc(
    collection(firestore, "E-Ticket-buy")
  );
    teamData.receiptID=docInfo.id
  sessionStorage.setItem("teamData", JSON.stringify(teamData));
  await setDoc(docInfo, teamData);

  //Supabase:

const { data, error } = await supabaseClient
    .from("ETicket2")
    .insert({
      uuid: teamData.uuid,
      team_name: teamData.teamName,
      leader_name: teamData.leaderName,
      mobile: teamData.mobile,
      whatsapp: teamData.whatsapp,
      members: teamData.members,
      date: teamData.date,
      payment_status: teamData.paymentStatus,
      receipt_id: teamData.receiptID,
      ticket: teamData.ticket,
      ticket_id: teamData.ticketId,
      ticket_price: teamData.ticketPrice,
      time_application: teamData.timeApplication,
      email_id: teamData.emailId,
      time_utr: teamData.timeUtr,
      utr: teamData.utr
    });
    // if (error) {
    //     console.error("Failed to save:", error);
    //     return;
    // }
    // console.log("Successfully saved:", data);




  // console.log(teamData)
}

export {addTicket}
