const fs = require('fs');
// const readline = require('readline');
const { rejects } = require('assert');
const { resolve } = require('path');


//Pengecekan folder dan file data
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const filePath = './data/contacs.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath,'[]','utf-8')
}


// //Making Question interface
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// })

//Menulis Pertanyaan
// const Pertanyaan = (pertanyaan) =>{
//     return new Promise((resolve,rejects)=>{
//         rl.question(pertanyaan, (input) =>{
//             resolve(input);
//         })
//     })
// }

const chalk = require('chalk');
const validator = require('validator');


const loadContact = () =>{
    const fileBuffer = fs.readFileSync(filePath,'utf-8');
    const contacs = JSON.parse(fileBuffer);
    return contacs;
}

const simpanContact = (nama,email,noHp) =>{
    const contact = {nama, noHp, email}
    // const fileBuffer = fs.readFileSync(filePath,'utf-8');
    // const contacs = JSON.parse(fileBuffer);
    const contacs = loadContact();

    //cek Duplikat
    const duplikat = contacs.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contanct sudah pernah terdaftar, gunakan nama lain'));
        return false;
    }


    //Validator Email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email Tidak Valid'));
            return false;
        }

    }

    //Validator Email.
    if(!validator.isMobilePhone(noHp, 'id-ID')){
        console.log(chalk.red.inverse.bold('No HP tidak valid'));
        return false;
    }

    contacs.push(contact)

    fs.writeFileSync(filePath,JSON.stringify(contacs));
    console.log(chalk.green.inverse.bold("Data berhasil dimasukkan"));
}


const listContanct = () =>{
    const contacs = loadContact();
    console.log(chalk.cyan.inverse.bold("Daftar Kontak : "))
    contacs.forEach((contact,i) =>{
        console.log(`${i + 1 }. ${contact.nama} - ${contact.noHp}`)
    })

    
}


//Melihat Detail contact
const detailContact = (nama) =>{
    const contacs = loadContact();
    const contact = contacs.find((contact) =>{
        return contact.nama.toLowerCase() === nama.toLowerCase();
    })

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(chalk.inverse.bold(contact.noHp));

    if(contact.email){
        console.log(chalk.inverse.bold(contact.email));
    }
}


//Menghapus Contact berdasarkan nama
const deleteContact = (nama) =>{
    const contacts = loadContact();
    const newContact = contacts.filter((contact) =>{
        return contact.nama.toLowerCase() !== nama.toLowerCase();
    })

    if(contacts.length === newContact.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`))
        return false;
    }

    fs.writeFileSync(filePath,JSON.stringify(newContact));
    console.log(chalk.green.inverse.bold("Data berhasil dihapus"));
}

module.exports = {simpanContact,listContanct,detailContact,deleteContact}