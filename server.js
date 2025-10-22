const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = '082d7bdb42e80c4203b941f0a70a07';
const API_HOST = 'v3.football.api-sports.io';

// Rota PRINCIPAL - COM IMAGENS!
app.get('/teams/brazil', async (req, res) => {
  console.log('🚀 BUSCANDO TIMES BRASILEIROS COM IMAGENS...');
  
  try {
    const response = await fetch(`https://${API_HOST}/teams?country=Brazil`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.response && data.response.length > 0) {
      console.log(`🎉 ${data.response.length} times encontrados!`);
      
      // Processar dados para incluir URLs de imagens
      const timesComImagens = data.response.map(time => {
        return {
          ...time,
          // Adicionar URL da imagem baseada no ID do time
          team: {
            ...time.team,
            logo: `https://media.api-sports.io/football/teams/${time.team.id}.png`
          },
          // URL do estádio também (se disponível)
          venue: time.venue ? {
            ...time.venue,
            image: time.venue.id ? `https://media.api-sports.io/football/venues/${time.venue.id}.png` : null
          } : null
        };
      });

      // Ordenar por nome
      const timesOrdenados = timesComImagens.sort((a, b) => 
        a.team.name.localeCompare(b.team.name)
      );
      
      return res.json(timesOrdenados);
    } else {
      throw new Error('Nenhum time encontrado');
    }

  } catch (error) {
    console.error('❌ Erro na API:', error);
    
    // Fallback com imagens
    const timesMock = [
      { 
        team: { 
          id: 131, 
          name: 'Corintias', 
          country: 'Brazil', 
          founded: 1895,
          logo: 'https://media.api-sports.io/football/teams/131.png'
        },
        venue: { 
          id: 234, 
          name: 'Maracanã', 
          city: 'Rio de Janeiro',
          image: 'https://media.api-sports.io/football/venues/234.png'
        }
      },
      { 
        team: { 
          id: 135, 
          name: 'Cruzeiro', 
          country: 'Brazil', 
          founded: 1930,
          logo: 'https://media.api-sports.io/football/teams/135.png'
        },
        venue: { 
          id: 235, 
          name: 'Morumbi', 
          city: 'São Paulo',
          image: 'https://media.api-sports.io/football/venues/235.png'
        }
      },
      { 
        team: { 
          id: 134, 
          name: 'Ceara', 
          country: 'Brazil', 
          founded: 1914,
          logo: 'https://media.api-sports.io/football/teams/134.png'
        },
        venue: { 
          id: 236, 
          name: 'Allianz Parque', 
          city: 'São Paulo',
          image: 'https://media.api-sports.io/football/venues/236.png'
        }
      }
    ];
    
    res.json(timesMock);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log('\n🎉 SERVIDOR COM IMAGENS DOS TIMES RODANDO!');
  console.log(`📍 Times Brasil: http://localhost:${PORT}/teams/brazil\n`);
});