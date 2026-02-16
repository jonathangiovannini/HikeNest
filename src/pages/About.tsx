import Navbar from "../components/Navbar.tsx";
import type { TeamMember, Mission } from "../types";
import Card from "../components/Card";
import Separator from "../components/Separator.tsx";
import SendIcon from "@mui/icons-material/Send";
import Footer from "../components/Footer.tsx";
import Section from "../components/Section.tsx";
import { motion } from "motion/react";
import useDocumentTitle from "../hooks/useDocumentTitle.ts";

const teamMembers: TeamMember[] = [
    {
        name: "Jonathan Giovannini",
        role: "Front-End Developer",
        roleColor: "#007bff",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eos facilis aliquam molestiae tempora doloribus. Consectetur magni consequatur mollitia reprehenderit.",
        image: "/user.png",
        email: "jonathan.giovannini@studenti.unitn.it",
    },
    {
        name: "Alessandro Balasso",
        role: "Back-End Developer",
        roleColor: "#ff6b35",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus nulla atque illo ducimus. Eos labore animi voluptates repellendus reprehenderit perferendis!",
        image: "/user.png",
        email: "alessandro.balasso@studenti.unitn.it",
    },
    {
        name: "Nicolas Ciocozan",
        role: "Full Stack Developer",
        roleColor: "#2ecc71",
        description:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis porro, eaque corporis ex veritatis quaerat nostrum magni et itaque id.",
        image: "/user.png",
        email: "nicolas.ciocozan@studenti.unitn.it",
    },
];

const missions: Mission[] = [
    {
        icon: "area-chart",
        title: "Safety First",
        description:
            "Report sui pericoli in tempo reale, aggiornamenti meteo e funzioni di emergenza per tenere gli escursionisti al sicuro",
        color: "#007bff",
    },
    {
        icon: "users",
        title: "Community Driven",
        description:
            "Creare connessioni tra escursionisti, favorendo le comunità locali, e creando opportunità per avventure condivise e amicizie durature",
        color: "#ff6b35",
    },
    {
        icon: "level-up",
        title: "Innovazione",
        description:
            "Continuo miglioramento della piattaforma attraverso soluzioni creative, feedback degli utenti e miglioramento della tecnologia utilizzata",
        color: "#2ecc71",
    },
];


function About() {

    useDocumentTitle('About Us - HikeNest');

    return (
        <>
            <Navbar />
            <Section>
                <h1 
                    className="justify-self-center text-mine-shaft-950 text-6xl lg:text-8xl p-12 font-bold text-shadow-2xs text-shadow-mine-shaft-50"
                >
                    Incontra il team di HikeNest
                </h1>
                <p className="justify-self-center p-12 text-mine-shaft-950 text-xl">
                    Tre studenti appassionati dell'Università di Trento che credono che
                    l'escursionismo dovrebbe essere più accessibile, più sicuro e più
                    connesso che mai.
                </p>
            </Section>
            <section
                className="grid grid-cols-1 lg:grid-cols-3 m-8 lg:m-20  gap-8  border-t-mine-shaft-300"
            >
                {teamMembers.map((member, index) => (
                    <Card key={index} {...member} />
                ))}
            </section>
            <Separator />
            <motion.section 
                className="grid grid-cols-1 content-center w-10/12 md:w-3/4 rounded-large shadow-md bg-gray-50 ml-auto mr-auto mb-8 "
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: "easeInOut" }} 
                viewport={{ once: true }} 
            >
                <div className="text-center mt-8">
                    <h2 className="font-bold text-2xl">La Nostra Missione</h2>
                    <p className="p-4">
                        Rendere l'escursionismo più sicuro, accessibile e connesso con
                        tutti, ovunque
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 mb-8 ">
                    {missions.map((mission, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-start text-center flex-1 min-w-0 p-4"
                        >
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-white mb-4 shadow-md"
                                style={{ backgroundColor: mission.color }}
                            >
                                <i
                                    className={`fa fa-${mission.icon} text-2xl md:text-3xl`}
                                    aria-hidden="true"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{mission.title}</h3>
                            <p className="text-gray-700 md:text-base p-4">
                                {mission.description}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.section>
            <Separator />
            <motion.section 
                className="grid grid-cols-1 w-full h-48"
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                transition={{ duration: 0.8, ease: "easeInOut" }} 
                viewport={{ once: true }} 
            >
                <div className="text-center ">
                    <h2 className="font-bold  text-3xl lg:text-5xl">Contattaci</h2>
                    <p className="p-4 text-lg">
                        Hai domande, suggerimenti o vuoi collaborare? Facci sapere la tua
                    </p>
                </div>
                <div className="text-center flex justify-center">
                    <a
                        href="mailto:team@hikenest.com"
                        className="w-64 flex border bg-mine-shaft-950 rounded-buttons justify-center items-center gap-5 h-12 transition delay-100 duration-300 ease-in-out hover:translate-y-1"
                    >
                        <SendIcon className="text-white" />
                        <p className="font-bold text-white">SCRIVICI UNA MAIL</p>
                    </a>
                </div>
            </motion.section>
            <Footer />
        </>
    );
}

export default About;
