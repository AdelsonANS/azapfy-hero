import React from "react";
import useStore from "../../stores/hero";
import CardBattle from "../molecules/CardBattle";
const ContainerCombat = () => {

    const storeHeros = useStore((state) => state.heros);

    let first = storeHeros[0];
    let second = storeHeros[1];

    function compareHero(){
 
        const {powerstats} = first
        for (const key in powerstats) {

          if (first['powerstats'][key] > second['powerstats'][key]) {
            first.powerstats[key] = { value: first['powerstats'][key], win: true };
            second.powerstats[key] = { value: second['powerstats'][key], win: false };
          } else if (first['powerstats'][key] < second['powerstats'][key]) {
            second['powerstats'][key] = { value: second['powerstats'][key], win: true };
            first['powerstats'][key] = { value: first['powerstats'][key], win: false };
          } else if (first['powerstats'][key] === second['powerstats'][key]){
            second['powerstats'][key] = { value: second['powerstats'][key], win: 'tie' };
            first['powerstats'][key] = { value: first['powerstats'][key], win: 'tie' };
          }
        }

        const sumObj1 = Object.values(first.powerstats).reduce((acc, {value}) => acc + value, 0);
        const sumObj2 = Object.values(second.powerstats).reduce((acc, {value}) => acc + value, 0);
console.log('asdasd',first.powerstats)
        if (sumObj1 > sumObj2) {
            return first.name;
        } else if (sumObj2 > sumObj1) {
            return second.name;
        } 
} 
    return (
        <div className='text-white '>
            <div>
               <h1 className="font-bold text-center" >Winnner {compareHero()}</h1> 
            </div>
            <div className='flex w-full justify-around'>
                <CardBattle props={first}/>
                <ul className='text-white flex flex-col my-10 uppercase' style={{listStyleType: 'none'}}>
                    <li>Intelligence</li>
                    <li>strength</li>
                    <li>speed</li>
                    <li>durability</li>
                    <li>power</li>
                    <li>combat</li>
                </ul>
                <CardBattle props={second} invertList={true}/>
            </div>
        </div>

    )
}

export default ContainerCombat;