
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const CardBattle = ({props, invertList}) => {
    console.log('INVERT', props, invertList)
    const {name, images, powerstats } = props;
    const {intelligence, strength, speed, durability, power, combat} = powerstats

    const gainInSkill = (win) => (
        
         win ? (
            <ArrowUpwardIcon/>
            ) : (
                <ArrowDownwardIcon/>
                    )
           
    )

    return (
        <>
        {invertList && (
            <div>
            <ul style={{listStyleType: 'none'}}>
                <li>{intelligence.value}{gainInSkill(intelligence.win)}</li>
                <li>{strength.value}{gainInSkill(strength.win)}</li>
                <li>{speed.value}{gainInSkill(speed.win)}</li>
                <li>{durability.value}{gainInSkill(durability.win)}</li>
                <li>{power.value}{gainInSkill(power.win)}</li>
                <li>{combat.value}{gainInSkill(combat.win)}</li>
            </ul>
            </div>
        )}
         <div>
                <img alt="img" src={images.sm}/>
                <h2>{name}</h2>
            </div>
        {!invertList && (
            <div>
            <ul style={{listStyleType: 'none'}}>
                <li>{gainInSkill(intelligence.win)}{intelligence.value}</li>
                <li>{gainInSkill(strength.win)}{strength.value}</li>
                <li>{gainInSkill(speed.win)}{speed.value}</li>
                <li>{gainInSkill(durability.win)}{durability.value}</li>
                <li>{gainInSkill(power.win)}{power.value}</li>
                <li>{gainInSkill(combat.win)}{combat.value}</li>
            </ul>
            </div>
)}


 
        </>

    );
}

export default CardBattle;