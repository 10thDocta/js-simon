$(function () {

    // imposto una variabile per i numeri da ricordare / creare
    let numberToRemember = 5;

    // funzione per generare un array di numeri random
    const genRandomNumbArr = number => {
        const arr = [];

        while (arr.length < number) {
            const randN = Math.floor(Math.random() * 100) + 1;
            arr.push(randN);
        }

        return arr.sort((a, b) => a - b);
    }

    //in questa variabile salvo il risultato della funzione genRandomNumbArr 
    const randNumbArr = genRandomNumbArr(numberToRemember);


    /*  ------------- TEST ---------------- */
    let inner = "";

    for (let i = 0; i < randNumbArr.length; i++) {
        inner += `<li> ${randNumbArr[i]} </li>`
    }

    $("#random_numbers").html(`<ul> ${inner} </ul>`);
    /*  ------------- /TEST ---------------- */


    // codice per generare il messaggio iniziale
    let message = `I numeri da ricordare sono ${randNumbArr.join("  ")} `;
    // console.log(message);
    // alert(message);

    /* test */
    const dialog = $("#dialog-message").dialog({
        modal: true
    });

    $("#dialog-message").html(`<p> ${message} </p>`);

    setTimeout(function () { dialog.dialog('close'); }, 4000);
    /* /test */

    // funzione per chiedere all'utente i numeri pari a numberToRemember
    const userInputArr = number => {
        const arr = [];

        while (arr.length < number) {
            const input = parseInt(prompt("Inserisci i numeri che ti ricordi"), 10);

            // nel caso che l'utente clicchi su "annulla" il gioco finisce
            if (isNaN(input)) {
                return;
            }

            arr.push(input);
        }

        console.log(arr.sort((a, b) => a - b));
        return arr.sort((a, b) => a - b);
    }





    // funzione per verificare quanti numeri l'utente ha ricordato
    const checkUserInput = (randoArr, userArr = []) => {

        const numberCorrectArr = []

        for (let i = 0; i < randoArr.length; i++) {
            // se il numero presente nel userArr è incluso nel randoArr, allora salvo questo numero nell'array numberCorrectArr
            if (randoArr.includes(userArr[i])) {
                numberCorrectArr.push(userArr[i]);
            }
        }

        return numberCorrectArr;
    }


    // codice per ritardare la richiesta dell'input dei numeri
    const delay = setTimeout(function () {
        const inputArr = userInputArr(numberToRemember);
        $("#hide_random").removeClass("hide");
        const rightInput = checkUserInput(randNumbArr, inputArr);

        if (rightInput.length == 0) {
            $("#hide_message").html(`Hai indovinato ${rightInput.length} volte, riprova!`);
        } else {
            $("#hide_message").html(`Hai indovinato ${rightInput.length} volte, ovvero ${rightInput.join(" ")}`);
        }

        $("#hide_message").removeClass("hide");

    }, 5000);

});