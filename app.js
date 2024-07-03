const contact = require('./contact')




const main = async() =>{
    const nama = await contact.Pertanyaan("Masukkan nama anda : ");
    const noHp = await contact.Pertanyaan("Masukkan noHp anda : ");
    const email = await contact.Pertanyaan("Masukkan email anda : ");

    contact.simpanContact(nama,email,noHp);


    
}

main();


