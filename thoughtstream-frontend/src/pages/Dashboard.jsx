/*
• Dashboard is only accessible to the logged-in user
• You have creative freedom to design the layout of this page — a few suggestions for the page:
   A customized welcome message with user’s name
   A weather widget to show the current weather
New entry form and perhaps a truncated list of entries with the most recent entry rst
*/
import Header from "../components/Header";
import WeatherWidget from "../components/WeatherWidget";
import DiaryList from "../components/DiaryList";
import NewEntryForm from "../components/NewEntryForm";
import DiaryEntryCard from "../components/DiaryEntryCard";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Dashboard(){
   const {user} = useContext(AuthContext);
   if(!user){
      return(<p>Please Log In</p>)
   }
   return(
      <div>
         <Header />
         {/* <WeatherWidget /> */}
         <NewEntryForm />
         <DiaryList />
         <DiaryEntryCard />
      </div>
   );
}

export default Dashboard;