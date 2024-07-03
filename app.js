




// const main = async() =>{
//     const nama = await contact.Pertanyaan("Masukkan nama anda : ");
//     const noHp = await contact.Pertanyaan("Masukkan noHp anda : ");
//     const email = await contact.Pertanyaan("Masukkan email anda : ");

//     contact.simpanContact(nama,noHp,email);


    
// }

// main();

const contact = require('./contact')

//Menggunakan yargs
const yargs = require('yargs');
yargs.command({
    command: 'add',
    describe: 'Untuk menambahkan Kontak baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {

        contact.simpanContact(argv.nama,argv.email,argv.noHp);
    }
})
.demandCommand();




//menapilkan semua contact nama dan noHp.
yargs.command({
    command: 'list',
    describe : "Untuk menampilkan semua contact nama & noHp",
    handler () {
        contact.listContanct();
    }
})

yargs.parse();
