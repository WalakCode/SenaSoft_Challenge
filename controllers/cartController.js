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

  graph: (nodos, aristas) => {
    
    class graph {
      constructor() {
        this.nodos = new Set();
        this.aristas = new Map();
      }
      agregarNodo(nodo) {
        this.nodo.add(nodo);
        this.aristas.set(nodo, []);
      }
      agregarArista(nodo1, nodo2, peso) {
        this.aristas.get(nodo1).push({ nodo: nodo2, peso });
        this.aristas.get(nodo2).push({ nodo: nodo1, peso }); // Para grafos no dirigidos
      }
      
    }

    const grafo = new graph();

    nodos.forEach(i => {
        grafo.agregarNodo(i.nombre)
    });

    aristas.forEach(i => {
        grafo.agregarArista(i.ubicacion1,i.ubicacion2,i.peso)
    });
    
  },
};

module.exports = cartController;
