function needExp(level){

    return level*100;

}

function addExp(user,amount){

    user.exp+=amount;

    while(user.exp>=needExp(user.level)){

        user.exp-=needExp(user.level);

        user.level++;

    }

    return user;

}

module.exports={

    needExp,

    addExp

}
