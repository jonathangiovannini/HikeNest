import Navbar from "../components/Navbar";
import SimpleFooter from "../components/SimpleFooter";
import StatGrid from "../components/StatGrid";

const Profile = () => {

    return(
        <>
            <Navbar/>
            <div className = 'flex flex-col items-center justify-center'>
                <div className = 'flex flex-col lg:flex-row w-11/12 lg:w-3/4 justify-between items-center'>
                    <div className = 'flex flex-col gap-4 items-center'>
                        <div className = 'w-48 h-48 rounded-full border-2 overflow-hidden flex items-center justify-center justify-self-start'>
                            <img src="images/goku.png" alt="" />
                        </div>
                    </div>
                    <div className = 'w-11/12 lg:w-3/4'>
                        <div className = 'fle'>

                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quos similique, voluptate eligendi aut sapiente assumenda quod non vel obcaecati dolores minus eveniet ea laudantium placeat consectetur veritatis unde alias nemo odit incidunt iste! Similique veritatis sapiente est labore delectus fuga voluptate possimus, tempora quam! Quasi, id sapiente? Aut, natus.</p>
                        </div>
                    </div>
                </div>
                <div className = 'w-11/12 lg:w-3/4'>
                    <StatGrid/>
                </div>
            </div>
            
            <SimpleFooter/>
        </>
    );
}

export default Profile;