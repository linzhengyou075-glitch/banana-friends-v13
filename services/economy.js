function addBanana(user,amount){

    user.banana+=amount;

    return user;

}

function useBanana(user,amount){

    if(user.banana<amount){

        return false;

    }

    user.banana-=amount;

    return true;

}

module.exports={

    addBanana,

    useBanana

}
