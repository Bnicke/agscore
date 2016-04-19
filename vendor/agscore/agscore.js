var data = new Array();
var dynatable;
var apps = new Array( "floor", "pommelHorse", "rings" ,"vault", "parallelBars", "highBar");
//var apps = new Array( "vault", "unevenBars", "beam", "floor");

function sortJSON(tosort, key, way) {
    return tosort.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
}
function camelize(str) {
  str = str.replace(/[^a-zA-Z0-9 ]+/g, "");
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
function processingComplete(table) {
	$(table + " td:contains('undefined')").html('');
	$(table + "-stacktable-small-only").remove();
	$(table).stacktable({headIndex:1});
}
function isNumber(value) {
    if ((undefined === value) || (null === value) || ("" == value)) {
        return false;
    }
    if ((typeof value == 'number') || ("0" == value)){
        return true;
    }
    return !isNaN(value - 0);
}
function agupdate(part,index,agtable) {
    //var post = data[index];
    var post = JSON.parse("{}");
    post.id = data[index].id;
    if ( $(window).width() > 900 ) {
        table = agtable;
        hidetable = agtable + '-stacktable-small-only';
    } else {
        table = agtable + '-stacktable-small-only';
        hidetable = agtable;
    }
	var gymnast = $("#" + table + " :input[id='gymnast_"+index+"']").val();
	var number = $("#" + table + " :input[id='number_"+index+"']").val();
	var born = $("#" + table + " :input[id='born_"+index+"']").val();
	var team = $("#" + table + " :input[id='team_"+index+"']").val();
	var klass = $("#" + table + " :input[id='class_"+index+"']").val();
	var rules = $("#" + table + " :input[id='rules_"+index+"']").val();
	var pool = $("#" + table + " :input[id='pool_"+index+"']").val();
	var about = $("#" + table + " :input[id='about_"+index+"']").val();
	var currvalue = $("#" + table + " :input[id='"+part+"_"+index+"']").val();
	var id = camelize(gymnast + " " + team);
	if (isNumber(number) && (id.length > 6) && (camelize(team).length > 1) && (klass.length > 1) && (pool.length > 0)) {
		post.gymnast = gymnast;
		post.number = number;
		post.born = born;
		post.team = team;
		post.class = klass;
		post.rules = rules;
		post.pool = pool;
		post.about = about;
		post.id = id;
    		var notify;
    		var notifytype;
    		$.ajax({
		        'async': false,
		        type: "POST",
		        url: "/ES/comp1/startList/" + id,
		        data: JSON.stringify(post),
		        contentType: "application/json; charset=utf-8",
		        dataType: "json",
		        success: function(s){
		                notify = "Gymnast " + gymnast + " updated!";
		                notifytype = "success";
                	},
        		error: function(xhr, ajaxOptions, thrownError) {
                		notify = "\"" + xhr.status + " " + thrownError + "\" when updating " + gymnast;
                		notifytype = "error";
        		}
    		});
                post.gymnast = startlistedit(post.id,"gymnast",post.gymnast,table);
                post.number = startlistedit(post.id,"number",post.number,table);
                post.team = startlistedit(post.id,"team",post.team,table);
                post.pool = startlistedit(post.id,"pool",post.pool,table);
                post.born = startlistedit(post.id,"born",post.born,table);
                post.class = startlistedit(post.id,"class",post.class,table);
                post.rules = startlistedit(post.id,"rules",post.rules,table);
                post.about = startlistedit(post.id,"about",post.about,table);
                post.delete = '<label><span></span><span class="switch switch-6"><input onchange="clearscore(\'' + post.id + '\',\'' + post.id + '\',\'' + table + '\',\'' + post.id + '\');" type="checkbox" id="check_' + post.id + '" name="check_' + post.id + '" value="PH" /><span></span></span></label>';

		data.unshift(post);
		var tmp=data[0];
		data[0]=data[1];
		data[1]=tmp;
		setTimeout(function() {processingComplete("#" + table);}, 100);
  		dynatable.records.updateFromJson({records: data});
  		dynatable.records.init();
  		dynatable.process();
		$.mobility.notify(notify,notifytype);	
	}
}
function agcalculate(part,number,agtable,index) {
    //var post=data[index];
    var post = JSON.parse("{}");
    post.id = data[index].id;
    post.gymnast = data[index].gymnast;
    post.pool = data[index].pool;
    post.number = data[index].number;
    post.born = data[index].born;
    post.class = data[index].class;
    post.rules = data[index].rules;
    post.about = data[index].about;
    post.team = data[index].team;
    if ( $(window).width() > 900 ) {
	table = agtable;
	hidetable = agtable + '-stacktable-small-only';
    } else {
	table = agtable + '-stacktable-small-only';
	hidetable = agtable;
    }
    if (part !="all" ) {
    	$("#" + table + " :input[name='check_"+index+"']").prop('checked', false);
    	$("#" + hidetable + " :input[name='check_"+index+"']").prop('checked', false);
    }
    var Base = $("#" + table + " :input[name='base_"+number+"']").val();
    var Pen = $("#" + table + " :input[name='pen_"+number+"']").val();
    var E1 = $("#" + table + " :input[name='e1_"+number+"']").val();
    var E2 = $("#" + table + " :input[name='e2_"+number+"']").val();
    var E3 = $("#" + table + " :input[name='e3_"+number+"']").val();
    var E4 = $("#" + table + " :input[name='e4_"+number+"']").val();
    var D = $("#" + table + " :input[name='d_"+number+"']").val();
    Base = Base.replace(",",".");
    Pen = Pen.replace(",",".");
    E1 = E1.replace(",",".");
    E2 = E2.replace(",",".");
    E3 = E3.replace(",",".");
    E4 = E4.replace(",",".");
    D = D.replace(",",".");
    post.base="&nbsp;";
    post.pen="&nbsp;";
    post.e1="&nbsp;";
    post.e2="&nbsp;"
    post.e3="&nbsp;";
    post.e4="&nbsp;";
    post.d="&nbsp;";
    data[index].base = inputreg(index,"base",number,Base,agtable);
    data[index].pen = inputreg(index,"pen",number,Pen,agtable);
    data[index].e1 = inputreg(index,"e1",number,E1,agtable);
    data[index].e2 = inputreg(index,"e2",number,E2,agtable);
    data[index].e3 = inputreg(index,"e3",number,E3,agtable);
    data[index].e4 = inputreg(index,"e4",number,E4,agtable);
    data[index].d = inputreg(index,"d",number,D,agtable);
    $("#" + hidetable + " :input[name='base_"+number+"']").val(Base);
    $("#" + hidetable + " :input[name='pen_"+number+"']").val(Pen);
    $("#" + hidetable + " :input[name='e1_"+number+"']").val(E1);
    $("#" + hidetable + " :input[name='e2_"+number+"']").val(E2);
    $("#" + hidetable + " :input[name='e3_"+number+"']").val(E3);
    $("#" + hidetable + " :input[name='e4_"+number+"']").val(E4);
    $("#" + hidetable + " :input[name='d_"+number+"']").val(D);
    if (!isNumber(Base)) {
        Base="10";
    } else {
	post.base = parseFloat(Base).toFixed(0);
    }
    if (!isNumber(Pen)) {
        Pen="0";
    } else {
    	post.pen = parseFloat(Pen).toFixed(0);
    }
    if (!isNumber(D)) {
        D="0";
    } else {
    	post.d = parseFloat(D).toFixed(2);
    }
    if (!isNumber(E1)) {
        E1="0";
    } else {
    	post.e1 = parseFloat(E1).toFixed(2);
    }
    if (!isNumber(E2)) {
        E2=E1;
    } else {
        post.e2 = parseFloat(E2).toFixed(2);
    }
    if (!isNumber(E4)) {
	E4=(parseFloat(E1) + parseFloat(E2) + parseFloat(E3))/3;	
    } else {
        post.e4 = parseFloat(E4).toFixed(2);
    }
    if (!isNumber(E3)) {
	E3=(parseFloat(E1) + parseFloat(E2))/2;
	E4=E3;
    } else {
        post.e3 = parseFloat(E3).toFixed(2);
    }
    var avgE = (parseFloat(E1) + parseFloat(E2) + parseFloat(E3) + parseFloat(E4) - parseFloat(Math.max(E1,E2,E3,E4)) - parseFloat(Math.min(E1,E2,E3,E4)))/2;
    $("#" + hidetable + " :input[name='avgE_"+number+"']").val(avgE.toFixed(2));
    $("#" + table + " :input[name='avgE_"+number+"']").val(avgE.toFixed(2));
    data[index].avgE = inputreg(index,"avgE",number,avgE.toFixed(2),agtable);
    post.avgE = avgE.toFixed(2);
    var E = Base-avgE;
    if (D <= 0) {
	E = 0;
    }
    if ( E < 0) {
	E = 0;
	avgE=Base;
    }
    $("#" + hidetable + " :input[name='e_"+number+"']").val(E.toFixed(2));
    $("#" + table + " :input[name='e_"+number+"']").val(E.toFixed(2));
    data[index].e = inputreg(index,"e",number,E.toFixed(2),agtable);
    post.e = E.toFixed(2);
    var total=parseFloat(E)+parseFloat(D)-parseFloat(Pen);
    if (total < 0) {
	total = 0;
    }
    $("#" + hidetable + " :input[name='total_"+number+"']").val(total.toFixed(2));
    $("#" + table + " :input[name='total_"+number+"']").val(total.toFixed(2));
    data[index].total = inputreg(index,"total",number,total.toFixed(2),agtable);
    post.total = total.toFixed(2);
    var app = agtable.split("_");
    var notify;
    var notifytype;
    $.ajax({
	'async': false,
        type: "POST",
        url: "/ES/comp1/" + app[0] + "/" + post.id,
        data: JSON.stringify(post),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(s){
		notify = "Gymnast #" + post.number + " " + app[0] + " updated";
		notifytype = "success";
    		if ((E1 > 10) || (E1 < 0) || (E2 > 10) || (E2 < 0) || (E3 > 10) || (E3 < 0) || (E4 > 10) || (E4 < 0) || (D > 8) || (D < 0) || (Pen > 5) || (Pen < 0) || ( Base > 10 ) || (Base < 3)) {
			notify = notify + " but an abnormally high or low point registered!";
			notifytype = "warning";
        	}
	},
        error: function(xhr, ajaxOptions, thrownError) {
		notify = "\"" + xhr.status + " " + thrownError + "\" when updating " + app[0] + " for " + post.number;
		notifytype = "error";
    	}
    });
//  $.ajax({
//	'async': false,
 //       url: "/ES/comp1/allaround/" + post.id,
//	error: function(){
//		 $.ajax({
 //       		'async': false,
  //      		type: "POST",
//			url: "/ES/comp1/allaround/" + post.id,
//			data: "{}",
 //       		contentType: "application/json; charset=utf-8",
  //      		dataType: "json"
//		});
//	},
//  	success: function(localdata){
//		var js = localdata._source;
//	    	js.id = data[index].id;
//    		js.gymnast = data[index].gymnast;
//    		js.pool = data[index].pool;
//    		js.number = data[index].number;
//    		js.born = data[index].born;
//    		js.class = data[index].class;
//    		js.rules = data[index].rules;
//    		js.about = data[index].about;
//    		js.team = data[index].team;
//		var currappscore = 0;
//		var lastappscore = 0;
//		var currtotal = 0;
//		var lasttotal = 0;
//		currappscore = total;
//		lastappscore = js[app[0]];
//		lasttotal = js["total"];
//		if ((lasttotal === null) || (lasttotal === undefined) || (!isNumber(lasttotal))) {
//			lasttotal = 0;
//		}
//		if ((lastappscore === null) || (lastappscore === undefined)) {
//			lastappscore = 0;
//		}
//		currtotal=(parseFloat(lasttotal)-parseFloat(lastappscore)+parseFloat(currappscore.toFixed(2)));
//		js[app[0]]=currappscore.toFixed(2);
//		js["total"]=currtotal.toFixed(2);
//		
//	        $.ajax({
//		    'async': false,
//	            type: "POST",
//        	    url: "/ES/comp1/allaround/" + post.id,
//	            data: JSON.stringify(js),
//	            contentType: "application/json; charset=utf-8",
//	            dataType: "json",
//	            success: function(s){
//			notify = notify  + " and  allaround  updated";
//	            },
//	            error: function(xhr, ajaxOptions, thrownError) {
//				notify = "Gymnast #" + post.number + " allaround updated.";
//				notify = "\"" + xhr.status + " " + thrownError + "\" when updating " + post.number;
//				notifytype = "error";
//	            }
//	        });
//	}
//    });
    	    $.mobility.notify(notify,notifytype);
}
function inputregD (index,part,agnumber,agvalue1,agvalue2,agtable) {
	return inputreg (index + "_2",part, agnumber + "_2",agvalue1,agtable) + " " + inputreg (index + "_2",part, agnumber + "_2",agvalue2,agtable);
}
function inputreg (index,part,agnumber,agvalue,agtable) {
	if (!isNumber(agvalue)) {
		agvalue = "";
	}
	if ((part == 'base') && (agvalue.length < 1)) {
		agvalue = "10";
	}
	if (( part == 'avgE' ) || (part == 'e' )) {
		return '<input class="form-control" min="0" max="15" readonly onchange="agcalculate(\''+ part + '\',\'' + agnumber + '\',\'' + agtable +'\',\'' + index +'\');" type="number" step="any" id="' + part + '_' + agnumber + '" name="' + part + '_' + agnumber + '" value="' + agvalue + '">';
	} else if ( part == 'total' ) {
		return '<input class="form-control" min="0" max="20" readonly onchange="alert(\''+ part + '\',\'' + agnumber + '\',\'' + agtable +'\',\'' + index +'\');" type="number" step="any" id="' + part + '_' + agnumber + '" name="' + part + '_' + agnumber + '" value="' + agvalue + '">';
	} else {
		return '<input class="form-control" min="0" max="15" onchange="agcalculate(\''+ part + '\',\'' + agnumber + '\',\'' + agtable +'\',\'' + index +'\');" type="number" step="any" id="' + part + '_' + agnumber + '" name="' + part + '_' + agnumber + '" value="' + agvalue + '">';
	}
}

function startlistedit (index,part,agvalue,agtable) {
	 if (agvalue === undefined) {
	 	var value="";
		agvalue="";
	} else {
	 	var value='value="' + agvalue + '"';
	}
	if (part == "gymnast") {
		var placeholder='placeholder="New.."';
	} else if ((part == "team") || (part == "class") || (part == "rules")){
		var placeholder='placeholder="Start typing.."';
	} 
	if (part == "about") {
		return '<textarea onchange="agupdate(\'' + part + '\',\'' + index + '\',\'' + agtable + '\');" id="' + part + '_' + index + '" class="form-control" rows="2" placeholder="Enter Text">' + agvalue + '</textarea>';
	} else {
		return '<input onchange="agupdate(\'' + part + '\',\'' + index + '\',\'' + agtable + '\');" id="' + part + '_' + index + '" type="text" class="form-control" ' + placeholder + '" ' + value + ' autocomplete="off" />';
	}
}

function drawdynatable(table,type) {
      var datalocal = data;
      dynatable = $('#' + table).dynatable({
      dataset: {
        records: datalocal
      },
      inputs: {
         processingText: '<img style="width:100px;height:100px;top=50px;position: relative;top: 2em;left: 25px;" src="images/loading.gif"/>'
      },
features: {
    paginate: false,
    sort: false,
    pushState: true,
    perPageSelect: false
  }
    })
   .bind('dynatable:afterUpdate', processingComplete("#" + table))
   .data('dynatable');
    $('#dynatable-query-search-' + table).keypress( function(e) {
	if(e.which == 13) {
  	dynatable.records.updateFromJson({records: datalocal});
  	dynatable.records.init();
  	dynatable.process();
	processingComplete("#" + table);
	}
    });
    $('#dynatable-query-search-' + table).focusout( function(e) {
	setTimeout(function() {processingComplete("#" + table);}, 100);
        dynatable.records.updateFromJson({records: datalocal});
        dynatable.records.init();
        dynatable.process();
    });

$('#' + table + '-search-pool').change( function(e) {
  var value = $(this).val();
  if (value === "") {
    dynatable.queries.remove("pool");
  } else {
    dynatable.queries.add("pool",value);
  }
  setTimeout(function() {processingComplete("#" + table);}, 100);
  dynatable.records.updateFromJson({records: datalocal});
  dynatable.records.init();
  dynatable.process();
});

$('#' + table + '-search-class').change( function(e) {
  var value = $(this).val();
  if (value === "") {
    dynatable.queries.remove("class");
  } else {
    dynatable.queries.add("class",value);
  }
  setTimeout(function() {processingComplete("#" + table);}, 100);
  dynatable.records.updateFromJson({records: datalocal});
  dynatable.records.init();
  dynatable.process();
});

$('#' + table + '-search-team').change( function(e) {
  var value = $(this).val();
  if (value === "") {
    dynatable.queries.remove("teamhidden");
  } else {
    dynatable.queries.add("teamhidden",value);
  }
  setTimeout(function() {processingComplete("#" + table);}, 100);
  dynatable.records.updateFromJson({records: datalocal});
  dynatable.records.init();
  dynatable.process();
});

  }
function clearscore(index,number,agtable,id) {
    if ( $(window).width() > 900 ) {
        table = agtable;
        hidetable = agtable + '-stacktable-small-only';
    } else {
        table = agtable + '-stacktable-small-only';
        hidetable = agtable;
    }
	if (($("#" + table + " :input[name='check_"+index+"']").prop('checked')) || ($("#" + table + " :input[name='check_"+index+"']").prop('checked'))) {
	var app = table.split("_");
	$("#" + hidetable + " :input[name='pen_"+number+"']").val("");
	$("#" + table + " :input[name='pen_"+number+"']").val("");
	$("#" + hidetable + " :input[name='d_"+number+"']").val("");
	$("#" + table + " :input[name='d_"+number+"']").val("");
	$("#" + hidetable + " :input[name='e_"+number+"']").val("");
	$("#" + table + " :input[name='e_"+number+"']").val("");
	$("#" + hidetable + " :input[name='e1_"+number+"']").val("");
	$("#" + table + " :input[name='e1_"+number+"']").val("-");
	$("#" + hidetable + " :input[name='e2_"+number+"']").val("");
	$("#" + table + " :input[name='e2_"+number+"']").val("");
	$("#" + hidetable + " :input[name='e3_"+number+"']").val("");
	$("#" + table + " :input[name='e3_"+number+"']").val("");
	$("#" + hidetable + " :input[name='e4_"+number+"']").val("");
	$("#" + table + " :input[name='e4_"+number+"']").val("");
	$("#" + hidetable + " :input[name='avgE_"+number+"']").val("");
	$("#" + table + " :input[name='avgE_"+number+"']").val("");
	$("#" + hidetable + " :input[name='base_"+number+"']").val("10");
	$("#" + table + " :input[name='base_"+number+"']").val("10");
	$("#" + hidetable + " :input[name='total_"+number+"']").val("");
	$("#" + table + " :input[name='total_"+number+"']").val("");
//	agcalculate("all",number,agtable,index);
                $.ajax({
                    'async': false,
                    type: "DELETE",
                    url: "/ES/comp1/" + app[0] +"/" + id,
                    success: function(s){
			$.mobility.notify(id + " deleted!","success");
                    }
                });

	} else {
		$("#" + table + " :input[name='check_"+index+"']").prop('checked', true);
		$("#" + hidetable + " :input[name='check_"+index+"']").prop('checked', true);
	}
}
function draweditable(ESurl) {
$.ajax({
  url: ESurl,
  'async': false,
  error: function(){
        $.mobility.notify("No competition or is database down??","error");
  },
  success: function(data_tmp){
     data = [];
     var data_pre = new Array();
     for (var i = 0; i < data_tmp.hits.hits.length; i++) {
        data.push(data_tmp.hits.hits[i]._source)
     }
  }
});
     	data = sortJSON(data,'number', '123');
	data.shift();
}
function drawgymtable(ESurl,table,type) {
var app = table.split("_");
$.ajax({
  url: ESurl,
  'async': false,
  error: function(){
	$.mobility.notify("No competition or is database down??","error");
  },
  success: function(data_tmp){
     data = [];
     var data_pre = new Array();
     for (var i = 0; i < data_tmp.hits.hits.length; i++) {
	data.push(data_tmp.hits.hits[i]._source)
     }
     var rank = 0;
     var last_rank = 0;
     var total = 1000000;
     var klass = 'NONE';
     var pool = 'NONE';
     var team = 'NONE';
     var Options = new Array();
     if (type == "reg") {
         $.ajax({
         	'async': false,
         	url: "/ES/comp1/" + app[0] + "/_search",
         	success: function(s){
			for (var i = 0; i < s.hits.hits.length; i++) {
        			data_pre.push(s.hits.hits[i]._source)
     			}
         	},
         	error: function(xhr, ajaxOptions, thrownError) {
         	}
         });
     	data = sortJSON(data,'number', '123');
	data.shift();
     	data = sortJSON(data,'pool', '123');
	for (var n = 0; n < data.length; n++) {
		for (var m = 0; m < data_pre.length; m++) {
			if ( data_pre[m].id == data[n].id) {
				data[n].d = data_pre[m].d;
				data[n].e1 = data_pre[m].e1;
				data[n].e2 = data_pre[m].e2;
				data[n].e3 = data_pre[m].e3;
				data[n].e4 = data_pre[m].e4;
				data[n].base = data_pre[m].base;
				data[n].avgE = data_pre[m].avgE;
				data[n].e = data_pre[m].e;
				data[n].total = data_pre[m].total;
			}
		}
		if ( pool != data[n].pool ) {
			Options.push(data[n].pool);
		}
		if (app[0] == "vault" ){
		data[n].pen = inputregD(n,"pen",data[n].number,data[n].pen,data[n].pen,table);
                data[n].d = inputregD(n,"d",data[n].number,data[n].d,data[n].d,table);
                data[n].e1 = inputregD(n,"e1",data[n].number,data[n].e1,data[n].e1,table);
                data[n].e2 = inputregD(n,"e2",data[n].number,data[n].e2,data[n].e2,table);
                data[n].e3 = inputregD(n,"e3",data[n].number,data[n].e3,data[n].e3,table);
                data[n].e4 = inputregD(n,"e4",data[n].number,data[n].e4,data[n].e4,table);
                data[n].base = inputregD(n,"base",data[n].number,data[n].base,data[n].base,table);
                data[n].avgE = inputregD(n,"avgE",data[n].number,data[n].avgE,data[n].avgE,table);
                data[n].e = inputregD(n,"e",data[n].number,data[n].e,data[n].e,table);
		} else {
		data[n].pen = inputreg(n,"pen",data[n].number,data[n].pen,table);
		data[n].d = inputreg(n,"d",data[n].number,data[n].d,table);
		data[n].e1 = inputreg(n,"e1",data[n].number,data[n].e1,table);
		data[n].e2 = inputreg(n,"e2",data[n].number,data[n].e2,table);
		data[n].e3 = inputreg(n,"e3",data[n].number,data[n].e3,table);
		data[n].e4 = inputreg(n,"e4",data[n].number,data[n].e4,table);
		data[n].base = inputreg(n,"base",data[n].number,data[n].base,table);
		data[n].avgE = inputreg(n,"avgE",data[n].number,data[n].avgE,table);
		data[n].e = inputreg(n,"e",data[n].number,data[n].e,table);
		}
		//data[n].club = data[n].club.substring(0,8)
		if (isNumber(data[n].total)) {
			data[n].delete = '<label><span></span><span class="switch switch-6"><input onchange="clearscore(\'' + n + '\',\'' + data[n].number + '\',\'' + table + '\',\'' + data[n].id + '\');" type="checkbox" id="check_' + n + '" name="check_' + n + '" value="PH" /><span></span></span></label>';
		} else {
			data[n].delete = '<label><span></span><span class="switch switch-6"><input onchange="clearscore(\'' + n + '\',\'' + data[n].number + '\',\'' + table + '\',\'' + data[n].id + '\');" type="checkbox" id="check_' + n + '" name="check_' + n + '" value="PH" checked="checked" /><span></span></span></label>';
		}
		data[n].total = inputreg(n,"total",data[n].number,data[n].total,table);
		pool = data[n].pool;
	}
       var $el = $("#" + table + "-search-pool");
       $('#' + table + '-search-pool option:gt(0)').remove();
     } else {
	if (app[0] == "allaround") {
     		data = sortJSON(data,'number', '321');
		data.pop();
     		data = sortJSON(data,'id', '123');
		for (var m = 0; m < data.length; m++) {
			data[m]["total"]=0;
		}
		for (var n = 0; n < apps.length; n++) {
		         $.ajax({
                		'async': false,
                		url: "/ES/comp1/" + apps[n] + "/_search",
                		success: function(s){
                        		for (var i = 0; i < s.hits.hits.length; i++) {
						for (var m = 0; m < data.length; m++) {
							if (data[m].id == s.hits.hits[i]._source.id) {
								data[m][apps[n]]=s.hits.hits[i]._source.total;
								data[m]["total"]=(parseFloat(data[m]["total"]) + parseFloat(data[m][apps[n]])).toFixed(2);
							}
						}
                        		}
                		},
                		error: function(xhr, ajaxOptions, thrownError) {
                		}
         		});
		}
	}
     	data = sortJSON(data,'total', '321');
     	data = sortJSON(data,'class', '123');
     	for (var n = 0; n < data.length; n++) {
	  if ( klass != data[n].class ) {
		rank = 1;
     		last_rank = 0;
		Options.push(data[n].class);
	  }
 	  if ( total > data[n].total ) {
 		rank = last_rank + 1; 
 	  }
	  switch ("&nbsp;") {
	  case data[n].e1:
		data[n].e1 = "";
	  case data[n].e2:
                data[n].e2 = "";
          case data[n].e3:
                data[n].e3 = "";
          case data[n].e4:
                data[n].e4 = "";
          case data[n].pen:
                data[n].pen = "";
	  }
 	  total = data[n].total;
          data[n].rank = rank;
	  klass = data[n].class;
	  last_rank = last_rank + 1;
     	}
	for (var n = 0; n < data.length; n++) {
		if (data[n].total == 0) {
			data.splice(n, 1);	
		}
  	}
       var $el = $("#" + table + "-search-class");
       $('#' + table + '-search-class option:gt(0)').remove();
     }
      for (var i = 0; i < Options.length; i++) {
 	$el.append($("<option></option>")
        .attr("value", Options[i] ).text(Options[i]));
      }
     (function() {
      drawdynatable(table,type);
  })();
  }
});
}
function initcompetition() {
       $.ajax({
                'async': false,
                url: "/ES//global/competition/_search",
                error: function(){
                        $.mobility.notify("No competitions or is database down??","error");
                },
                success: function(s){
                        var competitions = new Array();
                        for (var i = 0; i < s.hits.hits.length; i++) {
                                competitions.push(s.hits.hits[i]._source)
                        }
                        competitions.reverse();
                        var $el = $("#select-competition");
                        $('#select-competition option').remove();
                        for (var i = 0; i < competitions.length; i++) {
                                $el.append($("<option></option>")
                                .attr("value", camelize(competitions[i].name) ).text(competitions[i].name));
                        }
                },
                error: function(xhr, ajaxOptions, thrownError) {
                }
         });
}
