import React from 'react';
import {useState} from 'react';
// @ts-ignore
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function TextBox(props : {label : string, change : any}) {
    return (

        <div>
            <label htmlFor="box">{props.label}</label>

            <input id="box" type={"text"} onChange={event => props.change(event.target.value)}/>


        </div>
    );
}


function Horoscope() {

    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");



    //TODO: Fill in the ? with appropriate names/values for a horoscope.
    //HINT: Look at the HoroscopeHandler's response in Main.java to choose a default useState value.
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const toSend = {
            sun : sun,
            moon : moon,
            rising: rising
    };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        //Install and import axios!
        //TODO: Fill in 1) location for request 2) your data 3) configuration
        axios.post("http://localhost:4567/horoscope", toSend, config)
            .then(response => {
                console.log(response.data);
                //TODO: Go to the Main.java in the server from the stencil, and find what field name you should put here.
                //Note: It is very important that you understand how this is set up and why it works!
                setHoroscope(response.data["horoscope"]);
            })
            .catch(error => {
                console.log(error);
            });
    }






    return (
        <div className="Horoscope">
            <header className="Horoscope-header">
                <p>
                    Horoscope
                </p>
            </header>
            <p>   <TextBox label={"Sun Sign"} change = {setSun}/>  </p>
            <p><TextBox label={"Moon Sign"} change = {setMoon}/></p>
            <p><TextBox label={"Rising Sign"} change = {setRising}/></p>

            <p><AwesomeButton type = "primary" onPress={requestHoroscope}>Submit!</AwesomeButton></p>
            {horoscope.map((output) => <p>{output}</p>)}
        </div>

    );
}



export default Horoscope;
