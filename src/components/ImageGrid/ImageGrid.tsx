import React from 'react';

import styles from './ImageGrid.module.css';
import { Block } from '../../blocks';

type ImageGridProps = {
    blocks?: Block;
//   onClick?: (event: React.MouseEvent<HTMLElement>) => void
    onClick?: (img: Block) => void
};

export const ImageGrid = (props: ImageGridProps) => {

    const { blocks, onClick } = props;;
    
    //Iterate the blocks and put the blocks of type Image into an array and return the array
    function SelectImg(rootblock:Block|null): Block[]{
        let imgarr:Block[] = [];
        if(rootblock){
        if(rootblock?.type==='Image') imgarr.push(rootblock);      
        else if(rootblock?.type==='Column'&&rootblock?.children) 
            rootblock?.children.map((el)=> {
            if(el.type==='Image') {
                imgarr.push(el);
            }
            else if(el.type==='Column'&& el.children) imgarr=imgarr.concat(SelectImg(el));
            })
        }
        // console.log("return imgarr", imgarr)
        return imgarr;
    }
    var imgArr:Block[] = [];

    if(blocks) imgArr = SelectImg(blocks);
    console.log("imgArr ",imgArr)

    function handleClick(e:Block){
        console.log(e?.data?.description.toString());
    }

    return(
        <div className={styles.imageGrid}>
            {
                imgArr?imgArr.map((img,index)=>{return(
                    <div key={index} onClick={()=>{
                            return props.onClick?props.onClick(img):null
                        }}>
                        <img
                        src={img?.options?.url} 
                        alt={img?.data?.description?.toString()} 
                        width="100%" height="100%" 
                        />
                    </div>
                )            
                }):(<div></div>)    
            }
        </div>
    )
}