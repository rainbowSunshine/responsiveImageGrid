import styles from './ImageGrid.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Block } from '../../blocks';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

type ImageGridProps = {
  data?: Block;
  info?: Block;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  //padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: theme.spacing(40)
}));


export const ImageGridO = (props: ImageGridProps) => {
  const { data,info,onClick } = props;
  const navigate = useNavigate();
  
  
  React.useEffect(()=>{
    if (info?.id) {
      navigate('/'+info?.id);
    }
  },[info])
   
  if(!data?.options?.url){
    return <div className={styles.imageGrid}></div>;
  }
  if (data?.id===info?.id) {
    return <div >
      <Item sx={{borderColor: 'green', borderStyle: 'solid', borderWidth: '0.2em'}}>
        <img src={data?.options?.url} alt={data?.data?.description?.toString()} width="100%" height="100%" onClick={onClick}/>
      </Item> 
    </div>
  }
  else
    return <div >
      <Item >
        <img src={data?.options?.url} alt={data?.data?.description?.toString()} width="100%" height="100%" onClick={onClick}/>
      </Item> 
    </div>
;
};
