/* global $ */

$(function () {

    // imposto una variabile per i numeri da ricordare / creare
    let numberToRemember = 5;

    // funzione per generare un array di numeri random
    const genRandomNumbArr = number => {
        const arr = [];

        while (arr.length < number) {
            const randN = Math.floor(Math.random() * 100) + 1;

            // se arr NON inlcude il numero generato, allora aggiungo il numero nell'array arr
            if (!arr.includes(randN)) {
                arr.push(randN);
            }
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


    /*  ------------- TEST ---------------- */
    const dialog = $("#dialog-message").dialog({
        modal: true
    });

    $("#dialog-message").html(`<p> ${message} </p>`);

    setTimeout(function () { dialog.dialog('close'); }, 4000);
    /*  ------------- /TEST ---------------- */


    // funzione per chiedere all'utente i numeri equivalenti a numberToRemember
    const userInputArr = number => {
        const arr = [];

        while (arr.length < number) {
            const input = parseInt(prompt("Inserisci i numeri che ti ricordi"), 10);

            // nel caso che l'utente clicchi su "annulla" il gioco finisce
            if (isNaN(input)) {
                return;
            }

            if (arr.includes(input)) {
                alert("Numero già immesso");
            } else {
                arr.push(input);
            }
        }

        console.log(arr.sort((a, b) => a - b));
        return arr.sort((a, b) => a - b);
    }



    // funzione per verificare quanti numeri l'utente ha ricordato
    const checkUserInput = (randomArr, userArr = []) => {

        const numberCorrectArr = []

        for (let i = 0; i < randomArr.length; i++) {
            // se il numero presente nel userArr è incluso nel randoArr, allora salvo questo numero nell'array numberCorrectArr
            if (randomArr.includes(userArr[i])) {
                numberCorrectArr.push(userArr[i]);
            }
        }

        return numberCorrectArr;
    }


    // codice per ritardare la richiesta dell'input dei numeri
    const delay = setTimeout(function () {

        // invoco la funzione che chiede all'utente di inserire n "numberToRemember", salvando il risultato in questa variabile
        const inputArr = userInputArr(numberToRemember);

        // dopo che l'utente ha inseirito i numeri, mostro nel html i numeri che erano da ricordare
        $("#hide_random").removeClass("hide");

        // invoco la funzione che verifica quali numeri l'utente ha indovinato, presenti nel randNumbArr e salvo il risultato in questa variabile
        const rightInput = checkUserInput(randNumbArr, inputArr);

        if (rightInput.length == 0) {
            $("#hide_message").html(`Hai indovinato ${rightInput.length} volte, riprova!`);
        } else {
            $("#hide_message").html(`Hai indovinato ${rightInput.length} volte, ovvero ${rightInput.join(" ")}`);
        }

        // mostro il risultato del gioco nel html
        $("#hide_message").removeClass("hide");

    }, 5000);

});