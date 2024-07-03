
const chalk = require('chalk');
const validator = require('validator');const fs = require('fs');
const readline = require('readline');
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
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

//Menulis Pertanyaan
const Pertanyaan = (pertanyaan) =>{
    return new Promise((resolve,rejects)=>{
        rl.question(pertanyaan, (input) =>{
            resolve(input);
        })
    })
}



//Untuk mendapatkan file contact
const loadContact = () =>{
    const fileBuffer = fs.readFileSync(filePath,'utf-8');
    const contacs = JSON.parse(fileBuffer);
    return contacs;
}

const simpanContact = (nama,email,noHp) =>{
    const contact = {nama, email, noHp}
    const contacs = loadContact();

    //cek Duplikat
    const duplikat = contacs.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contanct sudah pernah terdaftar, gunakan nama lain'));
        rl.close();
        return false;
    }


    //Validator Email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email Tidak Valid'));
            rl.close();
            return false;
        }

    }

    //Validator Email.
    if(!validator.isMobilePhone(noHp, 'id-ID')){
        console.log(chalk.red.inverse.bold('No HP tidak valid'));
        rl.close();
        return false;

    }

    contacs.push(contact)

    fs.writeFileSync(filePath,JSON.stringify(contacs));
    console.log(chalk.green.inverse.bold("Data berhasil dimasukkan"));
    rl.close();
}


const listContanct = () =>{
    const contacs = loadContact();
    console.log(chalk.cyan.inverse.bold("Daftar Kontak : "))
    contacs.forEach((contact,i) =>{
        console.log(`${i + 1 }. ${contact.nama} - ${contact.noHp}`)
    })

}

module.exports = {Pertanyaan,simpanContact,listContanct}