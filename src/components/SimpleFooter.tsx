
const linkStyle = "text-md text-mine-shaft-700 hover:text-mine-shaft-400";

const SimpleFooter = () => {
    return(
        <footer className = 'flex justify-center items-center h-16 w-full gap-8 lg:bottom-0'>
            <a href="#" className = {`${linkStyle}`}>Terms &amp; Conditions</a>
            <a href="" className = {`${linkStyle}`}>Privacy</a>
        </footer>
    );
}

export default SimpleFooter;