import Navbar from "../components/Navbar.tsx";
import type {TeamMember, Mission} from "../types";
import Card from "../components/Card";

function About(){

    const teamMembers: TeamMember[] = [
        {
            name: 'Jonathan Giovannini',
            role: 'Front-End Developer',
            roleColor: '#007bff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eos facilis aliquam molestiae tempora doloribus. Consectetur magni consequatur mollitia reprehenderit.',
            image: '/images/goku.png'
        },
        {
            name: 'Alessandro Balasso',
            role: 'Lead Developer',
            roleColor: '#ff6b35',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus nulla atque illo ducimus. Eos labore animi voluptates repellendus reprehenderit perferendis!',
            image: '/images/goku.png'
        },
        {
            name: 'Nicolas Ciocozan',
            role: 'Multi-Functional Developer',
            roleColor: '#2ecc71',
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis porro, eaque corporis ex veritatis quaerat nostrum magni et itaque id.',
            image: "images/goku.png"
        }
    ];

    const missions: Mission[] = [
        {
            icon: 'area-chart',
            title: 'Safety First',
            description: 'Report sui pericoli in tempo reale, aggiornamenti meteo e funzioni di emergenza per tenere gli escursionisti al sicuro',
            color: '#007bff'
        },
        {
            icon: 'users',
            title: 'Community Driven',
            description: 'Creare connessioni tra escursionisti, favorendo le comunità locali, e creando opportunità per avventure condivise e amicizie durature',
            color: '#ff6b35'
        },
        {
            icon: 'level-up',
            title: 'Innovazione',
            description: 'Continuo miglioramento della piattaforma attraverso soluzioni creative, feedback degli utenti e miglioramento della tecnologia utilizzata',
            color: '#2ecc71'
        }
    ];

    return(
        <>
            <Navbar />
            <section className = "grid grid-cols-1 w-full h-144 md:h-96 lg:h-72 items-center sezione-iniziale">
                <div className = "absolute items-center w-full">
                    <h1 className = "justify-self-center text-mine-shaft-950 text-6xl lg:text-8xl p-12 font-bold">Incontra il team di HikeNest</h1>
                    <p className = "justify-self-center p-12 text-mine-shaft-950 text-xl">
                        Tre studenti appassionati dell'Università di Trento che credono che
                        l'escursionismo dovrebbe essere più accessibile, più sicuro e più
                        connesso che mai.
                    </p>
                </div>
            </section>
            <section className = "flex flex-col lg:flex-row m-8 md:m-20 lg:m-24 gap-4">
                {
                    teamMembers.map((member, index)=>(
                        <Card key = {index} {...member}/>
                    ))
                }
            </section>
            <section className = "grid grid-cols-1 content-center w-96 m-auto">
                <div className = "text-center">
                    <h2 className = "font-bold text-2xl">La Nostra Missione</h2>
                    <p>Rendere l'escursionismo più sicuro, accessibile e connesso con tutti, ovunque</p>
                </div>
                <div className = "grid grid-cols-1 lg:grid-cols-3">

                </div>
            </section>
        </>
    );
}

export default About;