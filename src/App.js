import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "./stores/hero";
import {Grid,  Modal, Box}  from '@mui/material';
import ContainerCombat from './ContainerCombat';
import _ from 'lodash'
function App() {

  let [heros, setHeros] = useState([])
  let [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const storeHeros = useStore((state) => state.heros)
  const addHeroState = useStore((state)=> state.addHeroState) 
 const resetBattle = useStore((state)=>state.resetBattle)
  useEffect(()=>{
    async function fetchData(){
      let {data} = await axios.get("http://homologacao3.azapfy.com.br/api/ps/metahumans")
      let filter = data.slice(0, 20)
      setHeros(filter)
      console.log("RODOU", filter);
    }
    fetchData()
    console.log('USE REFEF 1')
  },[])

  useEffect(()=>{
    if(!_.isEmpty(searchTerm)){
      console.log('SEARC EFE')
      async function filterHero(){
      
        let {data} = await axios.get("http://homologacao3.azapfy.com.br/api/ps/metahumans")

        let lowerTerm = _.lowerCase(searchTerm);
        let includeTerm = data.filter(item => _.lowerCase(item.name).includes(lowerTerm))
        let filter = includeTerm.slice(0, 12);
        setHeros(filter)
        console.log("RODOU", filter);
    }
    filterHero()
  }else{
    async function fetchData(){
      let {data} = await axios.get("http://homologacao3.azapfy.com.br/api/ps/metahumans")
      let filter = data.slice(0, 20)
      setHeros(filter)
    }
    fetchData()
  }
    console.log('USE REFEF 2')
  }, [searchTerm])

  useEffect(()=>{
    if(!_.isEmpty(storeHeros) && storeHeros.length === 2 ){
      setOpen(true)
    }
  }, [storeHeros])


function addbattle(item) {
  if(_.isEmpty(storeHeros) || storeHeros.length < 2 ){
    addHeroState(item)
  }
  console.log('>><><', storeHeros.length)
}
const handleChange = (event) => {
 setSearchTerm(event.target.value)
 
}

const handleClose = () => {
  setOpen(false);
  resetBattle()
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
  return (
   <>
   <div style={{display: 'flex'}}>
    <div style={{width: '10%'}}>

    </div>
    <div style={{ width: '80%', display: 'flex' }}>
      <Grid container >
        {heros.map(item => (
          <Grid xs={2} md={2} style={{textAlign: 'center'}}>
              <img alt="asd" src={item.images.sm} onClick={()=> addbattle(item)}/>
          </Grid>
        ))}

        </Grid>
    </div>
      <div>
        <input type="text" value={searchTerm} onChange={handleChange}/>
        {storeHeros.map(hero =>(
        <>
          <h2>{hero.name}</h2>
          <p>{hero.powerstats.combate}</p> 
          <p>{hero.powerstats.durability}</p>
          <p>{hero.powerstats.intelligence}</p>
          <p>{hero.powerstats.power}</p>
          <p>{hero.powerstats.speed}</p>
          <p>{hero.powerstats.strength}</p>
          </>
        ))}
          
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: '50%', height: '45%' }}>
              {storeHeros.length === 2 && <ContainerCombat/>}
            </Box>
          </Modal>
      </div>
    </div>

   </> 
   
  );
}

export default App;
