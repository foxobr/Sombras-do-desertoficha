import React, { useState, useEffect, useRef } from 'react';

const CriadorFicha = () => {
  // Referência para a ficha impressa
  const fichaRef = useRef(null);
  
  // Estados para os campos da ficha
  const [nome, setNome] = useState('');
  const [background, setBackground] = useState('');
  
  // Atributos
  const [atributos, setAtributos] = useState({
    FOR: 1, // Força
    AGI: 1, // Agilidade
    INT: 1, // Inteligência
    CAR: 1, // Carisma
    VIG: 1, // Vigor
  });
  
  const [pontosAtributos, setPontosAtributos] = useState(4);
  
  // Calculados a partir dos atributos
  const [pontosVida, setPontosVida] = useState(11); // 10 + VIG
  const [pontosSubpericia, setPontosSubpericia] = useState(1); // 1 + INT
  const [deslocamento, setDeslocamento] = useState(7); // 6 + AGI
  const [esquiva, setEsquiva] = useState(11); // 10 + AGI
  
  // Lista de subpericias disponíveis agrupadas por categoria
  const categorias = {
    'Armas': [
      'Lâminas Curtas', 'Lâminas Longas', 'Arremesso', 'Pistolas', 
      'Espingardas', 'Rifles', 'Armas de Precisão', 'Pistolas de Energia',
      'Rifles de Energia', 'Canhões de Plasma', 'Arcos de Energia', 'Lâminas de Luz'
    ],
    'Combate Corpo a Corpo': [
      'Artes Marciais', 'Luta Livre', 'Uso de Armas Improvisadas', 'Combate com Escudos'
    ],
    'Sobrevivência': [
      'Rastreamento', 'Identificação de Plantas Animais', 'Construção de Abrigos',
      'Purificação de Água', 'Orientação por Estrelas'
    ],
    'Conhecimento': [
      'História', 'Química', 'Ciências Naturais', 'Línguas Antigas'
    ],
    'Engenharia e Tecnologia': [
      'Engenharia Mecânica', 'Engenharia Eletrônica', 'Hacking'
    ],
    'Interação Social': [
      'Intimidação', 'Diplomacia', 'Enganação'
    ],
    'Furtividade': [
      'Furtividade', 'Disfarce', 'Arrombamento'
    ],
    'Medicina': [
      'Primeiros Socorros', 'Cirurgia', 'Farmacologia',
      'Diagnóstico', 'Terapia', 'Medicina Alternativa'
    ],
    'Pilotagem': [
      'Pilotagem de Veículos Terrestres', 'Pilotagem de Aeronaves',
      'Pilotagem de Naves Espaciais', 'Manobras de Evasão', 'Corridas de Alta Velocidade'
    ],
    'Artes e Ofícios': [
      'Pintura', 'Escultura', 'Música', 'Criação'
    ]
  };
  
  // Subpericias selecionadas
  const [subpericiasEscolhidas, setSubpericiasEscolhidas] = useState([]);
  
  // Equipamentos
  const [equipamentos, setEquipamentos] = useState(['']);
  
  // Armadura (VA)
  const [armadura, setArmadura] = useState(0);
  
  // Efeito quando atributos mudam
  useEffect(() => {
    // Atualiza os valores derivados dos atributos
    setPontosVida(10 + atributos.VIG);
    setPontosSubpericia(1 + atributos.INT);
    setDeslocamento(6 + atributos.AGI);
    setEsquiva(10 + atributos.AGI);
  }, [atributos]);
  
  // Função para imprimir ficha
  const imprimirFicha = () => {
    window.print();
  };
  
  // Atualiza atributos
  const aumentarAtributo = (attr) => {
    if (pontosAtributos > 0 && atributos[attr] < 3) {
      setAtributos({ ...atributos, [attr]: atributos[attr] + 1 });
      setPontosAtributos(pontosAtributos - 1);
    }
  };
  
  const diminuirAtributo = (attr) => {
    if (atributos[attr] > 1) {
      setAtributos({ ...atributos, [attr]: atributos[attr] - 1 });
      setPontosAtributos(pontosAtributos + 1);
    }
  };
  
  // Gerencia subpericias
  const adicionarSubpericia = (subpericia) => {
    if (subpericiasEscolhidas.length < pontosSubpericia && !subpericiasEscolhidas.includes(subpericia)) {
      setSubpericiasEscolhidas([...subpericiasEscolhidas, subpericia]);
    }
  };
  
  const removerSubpericia = (subpericia) => {
    setSubpericiasEscolhidas(subpericiasEscolhidas.filter(s => s !== subpericia));
  };
  
  // Gerencia equipamentos
  const adicionarEquipamento = () => {
    setEquipamentos([...equipamentos, '']);
  };
  
  const atualizarEquipamento = (index, valor) => {
    const novosEquipamentos = [...equipamentos];
    novosEquipamentos[index] = valor;
    setEquipamentos(novosEquipamentos);
  };
  
  const removerEquipamento = (index) => {
    const novosEquipamentos = [...equipamentos];
    novosEquipamentos.splice(index, 1);
    setEquipamentos(novosEquipamentos);
  };
  
  // Calcula perícias baseado nos atributos
  const calcularPericias = () => {
    return atributos.FOR + atributos.AGI + atributos.INT + atributos.CAR + atributos.VIG;
  };
  
  // Calcula energia baseado nos atributos
  const calcularEnergia = () => {
    return 6 + atributos.VIG + atributos.INT;
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .printable, .printable * {
              visibility: visible;
            }
            .printable {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      
      {/* Cabeçalho */}
      <div className="bg-black text-white p-6 rounded-lg shadow-lg mb-6 no-print">
        <h1 className="text-3xl font-bold text-center">Criador de Ficha - Sombras do Deserto</h1>
        <p className="text-center text-gray-300 mt-1">Nível 0 - O início da jornada em Teracek</p>
      </div>
      
      {/* Dados básicos */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4 no-print">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Dados Básicos</h2>
        
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-300">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:outline-none"
            placeholder="Nome do personagem"
          />
        </div>
        
        <div className="mb-2">
          <label className="block mb-2 font-bold text-gray-300">História de Vida:</label>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full p-3 border rounded bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:outline-none"
            rows="4"
            placeholder="Escreva uma breve descrição do background, incluindo história de vida e motivações para ir a Teracek."
          />
        </div>
      </div>
      
      {/* Atributos */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4 no-print">
        <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
          <h2 className="text-xl font-bold">Atributos</h2>
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
            Pontos restantes: {pontosAtributos}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 italic">Cada atributo começa com valor 1. Você tem 4 pontos adicionais para distribuir. Máximo de 3 em qualquer atributo no início.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(atributos).map(([attr, valor]) => (
            <div key={attr} className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600 hover:border-blue-400 transition-all">
              <div className="font-bold text-lg mb-1">{attr}</div>
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => diminuirAtributo(attr)} 
                  className={`${valor <= 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white w-8 h-8 rounded-full font-bold transition-colors`}
                  disabled={valor <= 1}
                >
                  -
                </button>
                <span className="text-3xl font-bold">{valor}</span>
                <button 
                  onClick={() => aumentarAtributo(attr)} 
                  className={`${pontosAtributos <= 0 || valor >= 3 ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white w-8 h-8 rounded-full font-bold transition-colors`}
                  disabled={pontosAtributos <= 0 || valor >= 3}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subperícias */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4 no-print">
        <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
          <h2 className="text-xl font-bold">Subperícias</h2>
          <span className={`${subpericiasEscolhidas.length >= pontosSubpericia ? 'bg-green-600' : 'bg-amber-600'} text-white px-3 py-1 rounded-full text-sm transition-colors`}>
            {subpericiasEscolhidas.length}/{pontosSubpericia}
          </span>
        </div>
        
        <p className="text-gray-300 mb-4 italic">Você pode escolher 1 + INT subperícias. Cada uma dá +1 em testes relacionados.</p>
        
        <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600 mb-4">
          <h3 className="font-bold mb-3 text-gray-300">Subperícias Escolhidas:</h3>
          {subpericiasEscolhidas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {subpericiasEscolhidas.map((sub, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-600 p-2 rounded">
                  <span className="text-white">{sub}</span>
                  <button 
                    onClick={() => removerSubpericia(sub)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-full text-xs transition-colors"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nenhuma subperícia escolhida ainda.</p>
          )}
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600 overflow-auto max-h-80">
          {Object.entries(categorias).map(([categoria, subs]) => (
            <div key={categoria} className="mb-4">
              <h3 className="font-bold text-amber-400 mb-2 border-b border-gray-600 pb-1">{categoria}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {subs.map((sub, index) => (
                  <button
                    key={index}
                    onClick={() => adicionarSubpericia(sub)}
                    disabled={subpericiasEscolhidas.includes(sub) || subpericiasEscolhidas.length >= pontosSubpericia}
                    className={`text-left p-2 rounded transition-all ${
                      subpericiasEscolhidas.includes(sub)
                        ? 'bg-green-700 text-white border border-green-500'
                        : subpericiasEscolhidas.length >= pontosSubpericia
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-600 text-white hover:bg-gray-500 hover:border-blue-400 border border-transparent'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Equipamento */}
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-4 no-print">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Equipamentos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600">
            <label className="block mb-2 font-bold text-gray-300">Armadura (VA):</label>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                value={armadura}
                onChange={(e) => setArmadura(parseInt(e.target.value) || 0)}
                className="w-full p-3 border rounded bg-gray-600 text-white border-gray-500 focus:border-blue-400 focus:outline-none"
              />
              <span className="ml-2 text-gray-300">→ Valor de Armadura</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg shadow border border-gray-600">
          <h3 className="font-bold mb-3 text-amber-400">Lista de Equipamentos:</h3>
          
          {equipamentos.map((equip, index) => (
            <div key={index} className="flex mb-3">
              <input
                type="text"
                value={equip}
                onChange={(e) => atualizarEquipamento(index, e.target.value)}
                className="flex-grow p-3 border rounded-l bg-gray-600 text-white border-gray-500 focus:border-blue-400 focus:outline-none"
                placeholder="Descreva o equipamento (arma, item, etc.)"
              />
              <button
                onClick={() => removerEquipamento(index)}
                className={`${equipamentos.length <= 1 && index === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'} text-white px-4 rounded-r transition-colors`}
                disabled={equipamentos.length <= 1 && index === 0}
              >
                X
              </button>
            </div>
          ))}
          
          <button
            onClick={adicionarEquipamento}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded mt-2 transition-colors flex items-center"
          >
            <span className="mr-1">+</span> Adicionar Equipamento
          </button>
        </div>
      </div>
      
      {/* Botão de impressão */}
      <div className="flex justify-center mb-8 no-print">
        <button 
          onClick={imprimirFicha} 
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-bold transition-colors flex items-center"
        >
          Imprimir Ficha
        </button>
      </div>
      
      {/* Instruções de impressão */}
      <div className="bg-gray-800 text-white p-6 rounded-lg mb-8 no-print">
        <h3 className="font-bold text-lg mb-2">Como salvar sua ficha:</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Clique no botão "Imprimir Ficha" acima</li>
          <li>Na janela de impressão, escolha "Salvar como PDF" como destino</li>
          <li>Clique em "Salvar" e escolha onde salvar o arquivo</li>
        </ol>
      </div>
      
      {/* Ficha para impressão */}
      <div className="printable" ref={fichaRef}>
        <div className="bg-white p-6 border-2 border-gray-700 rounded-lg mb-4">
          <div className="bg-black text-white p-4 rounded-lg mb-4">
            <h2 className="text-2xl font-bold mb-1 text-center">SOMBRAS DO DESERTO</h2>
            <h3 className="text-xl font-bold text-center border-t border-gray-700 pt-2">FICHA DE PERSONAGEM</h3>
          </div>
          
          <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
            <h3 className="text-xl font-bold text-center text-amber-400 mb-2">{nome || "_______________"}</h3>
            <p className="text-center text-sm">Nível 0 - Iniciante</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
              <h4 className="font-bold text-lg border-b border-gray-400 pb-1 mb-2">ATRIBUTOS</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">FOR</div>
                  <div className="text-2xl font-bold">{atributos.FOR}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">AGI</div>
                  <div className="text-2xl font-bold">{atributos.AGI}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">INT</div>
                  <div className="text-2xl font-bold">{atributos.INT}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">CAR</div>
                  <div className="text-2xl font-bold">{atributos.CAR}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">VIG</div>
                  <div className="text-2xl font-bold">{atributos.VIG}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">PERÍCIA</div>
                  <div className="text-2xl font-bold">{calcularPericias()}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
              <h4 className="font-bold text-lg border-b border-gray-400 pb-1 mb-2">STATUS</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">PV</div>
                  <div className="text-2xl font-bold">{pontosVida}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">PE</div>
                  <div className="text-2xl font-bold">{calcularEnergia()}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">ESQUIVA</div>
                  <div className="text-2xl font-bold">{esquiva}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center">
                  <div className="text-sm">VA</div>
                  <div className="text-2xl font-bold">{armadura}</div>
                </div>
                <div className="bg-gray-800 text-white p-2 rounded text-center col-span-2">
                  <div className="text-sm">DESLOCAMENTO</div>
                  <div className="text-2xl font-bold">{deslocamento}m/turno</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
              <h4 className="font-bold text-lg border-b border-gray-400 pb-1 mb-2">SUBPERÍCIAS</h4>
              {subpericiasEscolhidas.length > 0 ? (
                <div className="grid grid-cols-1 gap-1">
                  {subpericiasEscolhidas.map((sub, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded border border-gray-300">{sub}</div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhuma subperícia escolhida</p>
              )}
            </div>
            
            <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
              <h4 className="font-bold text-lg border-b border-gray-400 pb-1 mb-2">EQUIPAMENTOS</h4>
              {equipamentos.filter(e => e.trim()).length > 0 ? (
                <div className="grid grid-cols-1 gap-1">
                  {equipamentos.filter(e => e.trim()).map((equip, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded border border-gray-300">{equip}</div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhum equipamento adicionado</p>
              )}
            </div>
          </div>
          
          <div className="bg-gray-200 p-4 rounded-lg border border-gray-300">
            <h4 className="font-bold text-lg border-b border-gray-400 pb-1 mb-2">HISTÓRIA DE VIDA</h4>
            <p className="bg-gray-100 p-2 rounded border border-gray-300 min-h-24">{background || "Sem história definida."}</p>
          </div>
          
          <div className="text-center text-gray-500 text-xs mt-4">
            Sombras do Deserto - Onde as sombras dançam e a sobrevivência é um privilégio
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriadorFicha;