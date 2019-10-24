$(document).ready(function () {

    //build object of character data
    let chars = {
        Name: ["Obiwan Kanobe", "Luke Skywalker", "Darth Sideous", "Darth Maul"],
        Attack: [8, 5, 9, 7],
        Counter: [15, 10, 35, 20],
        bonusAttack: [8, 5, 9, 7],
        health: [120, 100, 150, 180],
        img: ["assets/img/obi.png", "assets/img/luki.png", "assets/img/sidiou.png", "assets/img/maul.png"],
        id: ["0", "1", "2", "3"]
    }
    console.log("array built");

    //track choices made
    let hero = false;
    let opponent = false;


    //build character select
    function buildChars() {
        for (let i = 0; i < chars.Name.length; i++) {
            $('#charBank').append(`<div id="character" value="${chars.id[i]}"><ul><li>${chars.Name[i]}</li><li><img src="${chars.img[i]}"/></li><li>${chars.health[i]}</li></ul>`)
        }
        $('#wrap').prepend(`<h1 id="pick">Pick your hero</h1>`)

    }

    buildChars();

    $('#charBank div').on("click", function () {
        if (hero == false) {
            console.log("clicked" + $(this));
            //move to attacker box
            $(this).appendTo("#attacker");
            $('#pick').remove();
            $('#wrap').prepend(`<h1 id="pick">Pick your opponent</h1>`);
            hero = true;
       
        } else if (opponent == false) {
           //move to defender box
            $(this).appendTo("#defend");
            opponent = true;
           
            //make attack button
            $(`<div id="attack" class="btn">Attack!</div>`).insertBefore($('#attacker'));
           
            let attackHp = chars.health[parseInt($('#attacker #character').attr("value"))]
            console.log(`hp ${attackHp}`)
            let deffendHP = chars.health[parseInt($('#defend #character').attr("value"))]
            console.log(`defend ${deffendHP}`);
        } else {
        }
        $('#attack').on("click", function () {

            console.log(`$('#attacker #character').attr("value")`);

        })



    })

    //let player = "";
    //let enemy = "";

}); 