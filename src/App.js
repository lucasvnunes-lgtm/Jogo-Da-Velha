
import './JogoDaVelha.css';
import React, { useState } from 'react';


function JogoDaVelha() {

  const empytBoard = Array(9).fill("");
  const [board, setBoard] = useState(empytBoard);
  const handleCellClick = (index) => {
// o item é o nome do vetor. O index é a posição dele
  setBoard([board.map (item, itemIndex) => ]);
  }
  return (

    <main>  
      <h1 className='title'> Jogo Da Velha de Lucas </h1>   

      <div className='board'>
        {board.map((item,index) =>
        ( <div key={index}
          className={`cell ${item}`}
          onClick={() => handleCellClick(index)}>
            
            {item}</div> )
        
        )}
      </div>
   </main>
  );
}

export default JogoDaVelha;
