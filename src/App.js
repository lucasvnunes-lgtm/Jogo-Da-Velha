import React from 'react';
import './JogoDaVelha.css';


function JogoDaVelha() {

  const empytBoard = Array(9).fill("")
  const [board, setBoard] = useState([""])
  return (

    <main>  
      <h1 className='title'> Jogo Da Velha de Lucas </h1>   

      <div className='board'>
      <div className='cell'>.</div>
      
      </div>
   </main>
  );
}

export default JogoDaVelha;
