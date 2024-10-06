import path from 'path'
import fs from 'fs'
import __dirname from '../util/rootpath.js'

const prodsPath = path.join(__dirname, 'data', 'products.json')
const getProductsFromFile = (callbck) => {
    fs.readFile(prodsPath, (err, fileContent) => {
        if (err) {
            callbck([])
        } else {
            callbck(JSON.parse(fileContent))
        }
    })
}

export class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(prodsPath, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(`Write File error: ${err}`)
                }
            })
        })
    }

    static fetchAll(callbck) {
        getProductsFromFile(callbck)
    }
}