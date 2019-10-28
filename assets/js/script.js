$(document).ready(function () {

    //build object of character data
    let chars = {
        Name: ["Obiwan Kanobe", "Luke Skywalker", "Darth Sideous", "Darth Maul"],
        Attack: [8, 5, 9, 7],
        Counter: [15, 10, 35, 20],
        bonusAttack: [8, 5, 9, 7],
        health: [120, 100, 150, 180],
        img: ["assets/img/obicrop.png", "assets/img/lukecrop.png", "assets/img/sidiouscrop.png", "assets/img/maulcrop.png"],
        id: ["0", "1", "2", "3"]
    }
    console.log("array built");

    //track choices made
    let hero = false;
    let opponent = false;

    let attackerIndex;
    let deffenderIndex;

    let bonusdmg = 0;


    //hp for attacking
    let attackHp
    let deffendHp


    //build character select
    function buildChars() {
        for (let i = 0; i < chars.Name.length; i++) {
            $('#charBank').append(`<div id="character" value="${chars.id[i]}"><ul><li>${chars.Name[i]}</li><li><img src="${chars.img[i]}"/></li><li>${chars.health[i]}</li></ul>`)
        }
        $('#wrap').prepend(`<h1 id="pick">Pick your hero</h1>`)

    }

    buildChars();

    $('#charBank>#character').on("click", function () {
        if (hero == false) {
            //move to attacker box
            $(this).appendTo("#attacker");
            $('#pick').remove();
            $('#wrap').prepend(`<h1 id="pick">Pick your opponent</h1>`);
            hero = true;
            $('#attacker > #character').off();
            attackHp = chars.health[parseInt($('#attacker > #character').attr("value"))]
            let charboxafter = $('#charBank:after').width() -150;
            $('#charBank:after').css("width","200px");

        } else if (opponent == false) {
            //move to defender box
            $(this).appendTo("#defend");
            opponent = true;

            //remove pick defender message
            $('#wrap > h1').remove();

            //make attack button
            $(`<button id="attack" class="btn">Attack!</button>`).insertBefore($('#attacker'));

            // message to pick a new opponent for round 2 and 3
            $('#defend + h1').remove();
            //store hp values
//possible bug            attackHp = chars.health[parseInt($('#attacker > #character').attr("value"))]
            deffendHp = chars.health[parseInt($('#defend > #character').attr("value"))]

            attackerIndex = parseInt($('#attacker #character').attr("value"));
            deffenderIndex = parseInt($('#defend #character').attr("value"));
            console.log(`attack ${attackerIndex} deffend ${deffenderIndex}`);

            //scope issue expected
            /*            let attackHp = chars.health[parseInt($('#attacker #character').attr("value"))]
                       console.log(`hp ${attackHp}`)
                       let deffendHp = chars.health[parseInt($('#defend #character').attr("value"))]
                       console.log(`defend ${deffendHp}`); */
        } else {
        }


        $('#attack').on("click", function () {
            console.log(`after attack hero ${hero}`)
            console.log(`$('#attacker #character').attr("value")`);

            if (attackHp > 0 && deffendHp > 0) {

                deffendHp = deffendHp - chars.Attack[attackerIndex] - bonusdmg;
                bonusdmg = bonusdmg + chars.bonusAttack[attackerIndex];
                console.log(bonusdmg + " bonus damage")
                if (deffendHp <= 0) {
                    deffendHp = 0;
                    $(`#defend > #character`).remove();
                    $('#attack').remove();

                    if ($('#charBank > #character').length > 0) {
                        $(`<h1> One down! Pick a new opponent!</h1>`).insertAfter($('#defend'))
                        opponent = false;
                        return // hero = true , opponent = true;
                    } else {
                        $('#wrap').prepend(`<div class="gameover">You Win!</div>`);
                    }
                }

                console.log("counter" + chars.Counter[deffenderIndex]);
                $('#defend #character li:nth-child(3)').html(deffendHp);
                attackHp = attackHp - chars.Counter[deffenderIndex];
                $('#attacker #character li:nth-child(3)').html(attackHp);
                console.log(`def hp ${deffendHp}`);
                console.log(`attacker hp ${attackHp}`)
                $('#attacker #character li:nth-child(3)').html(attackHp);
                if (attackHp <= 0) {
                    attackHp = 0;
                    $('#attacker #character li:nth-child(3)').html(attackHp);

                    $('#wrap').prepend(`<div class="gameover">Better luck next time</div>`);
                }


            }

        })



    })

    //let player = "";
    //let enemy = "";

}); 