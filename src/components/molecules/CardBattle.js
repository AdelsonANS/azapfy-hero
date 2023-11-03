
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ViewStreamIcon from '@mui/icons-material/ViewStream';

const CardBattle = ({props, invertList}) => {

    const {name, images, powerstats } = props;
    const {intelligence, strength, speed, durability, power, combat} = powerstats

    const gainInSkill = (win) => {
        return win === 'tie' ? <ViewStreamIcon /> :
        win ? <ArrowUpwardIcon sx={{ color: 'green' }} /> :
        <ArrowDownwardIcon sx={{ color: 'red' }}/>
};

    return (
        <>
        {invertList && (
            <div >
                <ul className='flex flex-col my-10 justify-around'>
                    <li >{gainInSkill(intelligence.win)}{intelligence.value}</li>
                    <li>{gainInSkill(strength.win)}{strength.value}</li>
                    <li >{gainInSkill(speed.win)}{speed.value}</li>
                    <li >{gainInSkill(durability.win)}{durability.value}</li>
                    <li >{gainInSkill(power.win)}{power.value}</li>
                    <li >{gainInSkill(combat.win)}{combat.value}</li>
                </ul>
            </div>
        )}
            <div>
                <img alt="img" src={images.sm}/>
                <h2 className="font-bold text-center">{name}</h2>
            </div>
        {!invertList && (
            <div>
                <ul className='flex flex-col my-10 justify-around'>
                    <li>{intelligence.value}{gainInSkill(intelligence.win)}</li>
                    <li>{strength.value}{gainInSkill(strength.win)}</li>
                    <li >{speed.value}{gainInSkill(speed.win)}</li>
                    <li >{durability.value}{gainInSkill(durability.win)}</li>
                    <li >{power.value}{gainInSkill(power.win)}</li>
                    <li>{combat.value}{gainInSkill(combat.win)}</li>
                </ul>
            </div>
)}


 
        </>

    );
}

export default CardBattle;