import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../../stores/hero";
import {  Modal, Box } from '@mui/material';
import ContainerCombat from './ContainerCombat';
import CardHero from "../molecules/CardHero";
import _ from 'lodash'

function Page() {

    let [filtedHeros, setFiltedHeros] = useState([])

    let [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const storeHeros = useStore((state) => state.heros)
    const listHeros = useStore((state) => state.listHeros)


    const resetBattle = useStore((state) => state.resetBattle)
    const addListHeroState = useStore((state) => state.addListHeroState)
    useEffect(() => {
        async function fetchData() {
            let { data } = await axios.get("http://homologacao3.azapfy.com.br/api/ps/metahumans")
            addListHeroState(data)
            setFiltedHeros(data)
        }
        fetchData()
    }, [addListHeroState])

    useEffect(() => {
        if (!_.isEmpty(storeHeros) && storeHeros.length === 2) {
            setOpen(true)
        }
    }, [storeHeros])


    const handleChange = (event) => {
        setSearchTerm(event.target.value)
        if (!_.isEmpty(event.target.value)) {
                let lowerTerm = _.lowerCase(event.target.value);
                let includeTerm = listHeros.filter(item => {
                    return _.lowerCase(item.name).includes(lowerTerm)
                })
                setFiltedHeros(includeTerm)
        } else {
                setFiltedHeros(listHeros)
        }

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
        bgcolor: '#120907',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    return (
        
        <>

            <div className='flex bg-zinc-900'>
                <div style={{ width: '10%'}}>
                   
                </div>
                
                <div className='w-4/5 '>
                   {!_.isEmpty(filtedHeros) && (<CardHero props={filtedHeros}/>)}
                </div>
                <div style={{marginTop: '50px'}}>
                    
                    <label className='text-white' >Filtro</label>
                    <input  type="text" value={searchTerm} onChange={handleChange} />
                    

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: '50%', height: '45%' }}>

                            {storeHeros.length === 2 && <ContainerCombat />}
                        </Box>
                    </Modal>
                </div>
            </div>

        </>

    );
}

export default Page;
