import { BrowserRouter as Router } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
import React from 'react';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Block,getBlocks } from './blocks';

import { Header } from './components/Header/Header';
import { ImageGrid } from './components/ImageGrid/ImageGrid';
import { InfoPanel } from './components/InfoPanel/InfoPanel';


export const App = () => {
  const [blocks, setBlocks] = React.useState<Block | undefined>(undefined);
  const [info, setInfo] = React.useState<Block|undefined>(undefined);
 
  //Load the blocks 
  React.useEffect(()=>{
    let abortController: AbortController = new AbortController();
    let aborted = abortController.signal.aborted;

    (async ()=>{
      const resp = await getBlocks();
      aborted = abortController.signal.aborted;
      if (aborted === false) {
        setBlocks(resp);
      }
    })();

    return () => abortController.abort();
  },[])  

  // function handleClick(event: React.MouseEvent<HTMLElement>): void{
  //   // setInfo(img);
  //   console.log('handleClick:',event);
  //  }

  function handleClick(img: Block): void{
    setInfo(img);
    console.log('handleClick:',img);
   }
  
  return (
    <Router>
      <Header />
      <main>
      {!blocks? <div><h1>Loading...wait for the response</h1></div>:
        <ImageGrid blocks={blocks} onClick={handleClick}/>
      }
        <InfoPanel 
          id={info?.id} 
          description={info?.data?.description.toString()} 
          dimensions={info?.data?.width.toString()+" x "+info?.data?.height.toString()} 
          createdAt={info?.data?.createdAt.toString()}
          />
      </main>
    </Router>
  );
};
