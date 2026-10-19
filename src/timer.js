export function createtimer ( onTick, interval = 1000) {

    let id = null ;
    let second = 0;

    function start ()  {
        if (id !== null) return;
        id = setInterval(() => {
            second++;
            onTick(second);
        }, interval);
    }

    function stop ()  {
        clearInterval(id);
        id = null;
    }

    function reset (){
        stop();
        second = 0;
        onTick(second);
    }


      return { start, stop, reset };
} ;