import React from "react";

import "../../assets/css/layouts.css";

class ContactPageDe extends React.Component {

    render() {
        return (<div className="contentColumn" style={{width: "60%"}}>
                <h1>Über uns</h1>
                <p>
                    Hallo! Wir sind Lukas (Coding, Design und Artwork) und Theresa (Design, Artwork und seelisch-moralische
                    Unterstützung), sind beide große Brettspielfans und haben zusammen Diximus als online-Version eines unserer
                    Lieblingsspiele entwickelt.
                </p>
                <p>
                    Falls ihr Fragen, Anregungen oder Wünsche habt, schreibt uns gerne eine Mail:&nbsp;
                    <a href="mailto:diximus.team@gmail.com">diximus.team@gmail.com</a>
                </p>
                <p>
                    Falls ihr selbst Künstler seid und selbst Karten für dieses Spiel gestalten wollt, würden wir uns
                    natürlich sehr freuen! Nehmt gerne per Mail zu uns Kontakt auf.
                </p>
                <p>
                    Weitere Projekte, an denen wir beteiligt waren oder sind, könnt ihr unter anderem hier finden: <br/>
                    <a href="https://lukaswho.itch.io/" target="_blank" rel="noreferrer">
                        https://lukaswho.itch.io/
                    </a><br/>
                    <a href="https://soundcloud.com/lukas-who-892512337" target="_blank" rel="noreferrer">
                        https://soundcloud.com/lukas-who-892512337
                    </a>
                </p>
                <div className="copyrightInfo">Copyright © 2022 Gute LuThe Games</div>
        </div>)
    }
}


export default ContactPageDe;