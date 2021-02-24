

$(document).ready();

//Starting with the part of getting information from coingecko's API
let BASE_URL="https://api.coingecko.com/api/v3"
let COIN_LIST_ENDPOINT="/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100"
let PAGE_ENDPOINT="&page="
let COIN_LIST_ENDPOINT_TWO="&sparkline=true&price_change_percentage=24h%2C7d"
var page="1";

let coinsUrl=BASE_URL+COIN_LIST_ENDPOINT+PAGE_ENDPOINT+page+COIN_LIST_ENDPOINT_TWO

//This is the function that will put the data fetched to the list
function printToList(data,list,property){
  var list= $(list);
  var currentUrlData = $(data);
  for (i=0;i<100;i++){
    var currentData = $(currentUrlData)[i];
    var dataValue=currentData[property];
    $("<li class='list-group-item' />").html("<span>"+dataValue+"</span>").appendTo(list);
  }
}

//This is the function that will put the data fetched to the list making the distinction between positive and negative changes by color(green and red respectively)
function printToListColor(data,list,property){
  var list= $(list);
  var currentUrlData = $(data);
  for (i=0;i<100;i++){
    var currentData = $(currentUrlData)[i];
    var dataValue=parseFloat(JSON.stringify(currentData[property]));
    if(dataValue<0){
      $("<li class='list-group-item' />").html( "<span style='color:red'>"+(Math.floor(dataValue*100)/100)+ "% </span>").appendTo(list);
      }
    else{
      $("<li class='list-group-item' />").html( "<span style='color:green'>"+(Math.floor(dataValue*100)/100)+ "% </span>").appendTo(list);
    }
  }
}

//This is the function to print the sparkline chart
function printChartToList(data,list,property){
  var list= $(list);
  var currentUrlData = $(data);
  for (i=0;i<100;i++){
    var currentData = $(currentUrlData)[i];
    var dataValue=currentData[property];
    $("<li class='list-group-item' />").html("<chart type='sparkline' data="+dataValue+">").appendTo(list);
  }
}


  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#rank-list","market_cap_rank");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#name-list","name");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#price-list","current_price");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToListColor(data,"#h24-list","price_change_percentage_24h");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToListColor(data,"#d7-list","price_change_percentage_7d_in_currency");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#marketcap-list","market_cap");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#volume-list","total_volume");
    })
  });

  fetch(coinsUrl)
  .then(res=>{
    res.json().then(data=>{
    printToList(data,"#circulating-sup-list","circulating_supply");
    })
  });
