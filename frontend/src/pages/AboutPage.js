import React from "react";

export default function AboutPage() {
    return (
        <div className="logsignContainer">
            <div className="aboutHeading">
                <h1>ABOUT:</h1>
                <hr className='largeBreak' />
                <h2>
                    This application was created to provide a way to effortlessly save and access your favorite artwork!
                    As someone who enjoys browsing art on platforms like Twitter and Artstation, I often encounter the problem of endlessly scrolling through my collection of liked posts just to find that one artwork I liked weeks ago.
                </h2>
                <h2>
                    To address this issue, Collaj offers two main methods for finding your saved artwork: searching by artwork name or searching by artist name. If you are unable to recall either of those details, the image gallery is automatically sorted by hue.
                    This means that even if you only remember the most prominent color of a particular artwork, you can easily pinpoint its general location in the gallery!
                </h2>
                <h2>
                    Collaj also uses web-scraping, enabling you to upload images through the artwork's original link instead of manually downloading and uploading a JPG or PNG file!
                </h2>
                <h1>DEMO ACCOUNT:</h1>
                <hr className='largeBreak' />
                <h2>Username: demo</h2>
                <h2>Password: Demo1234!</h2>
                <h1>NOTICE:</h1>
                <hr className='largeBreak' />
                <h2>Apologies for any inconvenience caused by potential slow load times, which may be attributed to utilizing a web hosting service's free tier.</h2>
                <h2>Thank you for your understanding.</h2>
            </div>
        </div>
    )
}