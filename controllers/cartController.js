const cache = require("../cache/cache");
const model = require("../models/cartModel");

const cartController = {
  setLocationData: (callback) => {
    model.getLocations((err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        const ubiArr = [];

        results.forEach((i) => {
          let ubiOb = {};
          ubiOb.nombre = i.nombre;
          ubiOb.posX = i.posX;
          ubiOb.posY = i.posY;
          ubiArr.push(ubiOb);
        });
        return callback(ubiArr);
      }
    });
  },
  setConecctionData: (callback) => {
    model.getConnection((err, results) => {
      if (err) {
        console.log(err);
      }
      if (results) {
        const conArr = [];

        results.forEach((i) => {
          let conOb = {};
          conOb.ubicacion1 = i.ubicacion1;
          conOb.ubicacion2 = i.ubicacion2;
          conOb.peso = i.peso;
          conArr.push(conOb);
        });
        return callback(conArr);
      }
    });
  },

  graph: (nodos, aristas,callback) => {
    
    class graph {
      constructor() {
        this.nodos = new Map();
      }
      agregarNodo(nodo) {
        if (!this.nodos.has(nodo)){
            this.nodos.set(nodo,[]);
        }
      }
      agregarArista(nodo1, nodo2, peso) {
        if(this.nodos.has(nodo1)&&this.nodos.has(nodo2)){
            this.nodos.get(nodo1).push({nodo2,peso});
            this.nodos.get(nodo2).push({nodo2:nodo1, peso});
        } 
      }
      
       imprimirGrafo() {
        for (let [nodo, adyacentes] of this.nodos) {
          const adyacentesStr = adyacentes.map(adyacente => `${adyacente.nodo2} (peso: ${adyacente.peso})`).join(", ");
          console.log(`${nodo} -> ${adyacentesStr}`);
        }
      }

      encontrarRutaMasCortaDesde(nodoInicio) {
        const distancias = {};
        const anterior = {};
        const nodosNoVisitados = new Set([...this.nodos.keys()]);

        for (const nodo of nodosNoVisitados) {
          distancias[nodo] = Infinity;
          anterior[nodo] = null;
        }

        distancias[nodoInicio] = 0;

        while (nodosNoVisitados.size > 0) {
          const nodoActual = Array.from(nodosNoVisitados).reduce((minNodo, nodo) => {
            return distancias[nodo] < distancias[minNodo] ? nodo : minNodo;
          });

          nodosNoVisitados.delete(nodoActual);

          for (const vecinoData of this.nodos.get(nodoActual) || []) {
            const vecino = vecinoData.nodo2;
            const peso = vecinoData.peso;
            const distanciaTentativa = distancias[nodoActual] + peso;

            if (distanciaTentativa < distancias[vecino]) {
              distancias[vecino] = distanciaTentativa;
              anterior[vecino] = nodoActual;
            }
          }
        }

        return { distancias, anterior };
      }

    }

    const grafo = new graph();

    nodos.forEach(i => {
        grafo.agregarNodo(i.nombre)
    });

    aristas.forEach(i => {
        grafo.agregarArista(i.ubicacion1,i.ubicacion2,i.peso)
    });
    
    // grafo.imprimirGrafo()

    const nodoInicio = cache.cacheStartPoint(); // Cambia esto al nodo deseado como punto de inicio
    const resultado = grafo.encontrarRutaMasCortaDesde(nodoInicio);
    
    const allObj = {};
    for (const nodo in resultado.distancias) {
      if (resultado.distancias.hasOwnProperty(nodo)) {
        if (resultado.distancias[nodo] == Infinity) {
          allObj[nodo] = {
            distancia: 'inalcanzable',
            ruta: null,
          };
        } else {
          allObj[nodo] = {
            distancia: resultado.distancias[nodo],
            ruta: obtenerRuta(resultado.anterior, nodo),
          };
        }
      }
    }

    callback(allObj);
  },
};


function obtenerRuta(anterior, nodo) {
    const ruta = [];
    while (nodo !== null) {
      ruta.unshift(nodo);
      nodo = anterior[nodo];
    }
    return ruta.join(' -> ');
  }

module.exports = cartController;