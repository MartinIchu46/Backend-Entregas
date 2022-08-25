const express = require('express')
const { Router } = express;


const socket = io.connect();

socket.on('messages', data => {
    console.log(data);
});

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}


socket.on('messages', data  => render(data));

class Productos {
    constructor(products=[]) {
         this.products = products;
    }
    save(obj) {
        if(this.products.length>=1){
            const ids = this.products.map(object => {
                return object.id;
            });
            
            const max = Math.max(ids);
            obj.id= max+1 
            
            this.products.push(obj)
        } else{
            obj.id=1
            this.products.push(obj) 
        }
    }
    getById(id) {
        let product = this.products.find(p => p.id===id) 
        return product 
    }
    deleteById(id) {
        let index = this.products.findIndex((p) =>p.id===id) 
        this.products.splice(index,1) 
    }
    updateById(id,obj) {
        let index = this.products.findIndex((p) =>p.id===id)
        obj[id] = parseInt(id)
        this.products.splice(index,1) 
        this.products.push(obj)
        
        return obj 
        }

}

// router.get('/', (req, res) => {
//     res.send(productos)
// });


// router.post('/', (req, res) => {
//     const productosGuardar = req.body;
//     productos.push(productosGuardar);
//     res.status(201).send({status: 'ok'})
// });
 

module.exports = Productos;