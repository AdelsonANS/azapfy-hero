import { Grid } from "@mui/material";
import useStore from "../../stores/hero";
import _ from 'lodash'
const CardHero = ({props}) => {
    console.log('PPPPPPPP', props)
    const heros = props

    const storeHeros = useStore((state) => state.heros)
    const addHeroState = useStore((state) => state.addHeroState)

    function addbattle(item) {
        if (_.isEmpty(storeHeros) || storeHeros.length < 2) {
            addHeroState(item)
        }
    }

    return(
        <Grid container >
      { !_.isEmpty(heros) &&( heros.map(item => (
            <Grid xs={2} md={2} style={{ textAlign: 'center' }}>
                <img alt="asd" src={item.images.sm} onClick={() => addbattle(item)} />
            </Grid>
        )))}

    </Grid>
    )
}

export default CardHero;