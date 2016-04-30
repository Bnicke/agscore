var data = new Array();
var dynatable;
var competition = "";
var apps = new Array( "floor", "pommelHorse", "rings" ,"vault", "parallelBars", "highBar");
var parts = new Array( "base", "pen", "e1" ,"e2", "e3", "e4", "e", "d", "avgE", "total");
//var apps = new Array( "vault", "unevenBars", "beam", "floor");
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
function sortJSON(tosort, key, way) {
    return tosort.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
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
function agcalculate(part,number,agtable,index) {
    //var post=data[index];
    var post = JSON.parse("{}");
    var post_tmp = JSON.parse("{}");
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
    	$("#" + table + " :input[name='check_"+index+"']").prop('checked', true);
    	$("#" + hidetable + " :input[name='check_"+index+"']").prop('checked', true);
    }
    var double = number.split("_");
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
    post.total = parseFloat(total.toFixed(2));
    var app = agtable.split("_");
    var notify;
    var notifytype;
    if ( double[1] > 0 ) {
	if (double[1] > 1 ) {
		var double2 = 1;
	} else {
		var double2 = 2;
	}
	for (var i = 0; i < parts.length; i++) {
		post[parts[i]+"_"+double[1]] = post[parts[i]];
		post[parts[i]+"_"+double2] = $("#" + table + " :input[name='"+parts[i]+"_"+double[0]+"_"+double2+"']").val();
		$("#" + hidetable + " :input[name='"+parts[i]+"_"+double[0]+"_"+double2+"']").val(post[parts[i]+"_"+double2]);
		post[parts[i]] = null;
       }
       if (!isNumber(post.total_1)) {
		post.total_1 = 0;
	}
       if (!isNumber(post.total_2)) {
		post.total_2 = 0;
	}
	post.total_1=parseFloat(post.total_1);
	post.total_2=parseFloat(post.total_2);
       total= (parseFloat(post.total_1)+parseFloat(post.total_2))/2;
       post.total = parseFloat(total.toFixed(2));
	
       $("#" + table + " :input[name='total_"+double[0]+"']").val(total.toFixed(2));
       $("#" + hidetable + " :input[name='total_"+double[0]+"']").val(total.toFixed(2));
	
    } 
    $.ajax({
	'async': false,
        type: "POST",
        url: "/ES/" + competition + "/" + app[0] + "/" + post.id,
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
    	    $.mobility.notify(notify,notifytype);
}
function inputregD (index,part,agnumber,agvalue1,agvalue2,agtable) {
	var cell = "<div class=\"part1\">" + inputreg (index,part, agnumber + "_1",agvalue1,agtable) + "</div><div class=\"part2\">" + inputreg (index,part, agnumber + "_2",agvalue2,agtable) + "</div>";
	if ( part == 'total' ) { 
		var totalD = (parseFloat(agvalue1)+parseFloat(agvalue2))/2;
		cell = cell + inputreg (index,part, agnumber,totalD.toFixed(2),agtable)	
	} 
	return cell;
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
function startlistedit (action,post,notify) {
if (action == "POST" ) {
                $.ajax({
                        'async': false,
                        type: "POST",
                        url: "/ES/" + competition + "/startList/" + post.id,
                        data: JSON.stringify(post),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function(s){
                                notifytxt = "Gymnast " + post.gymnast + " updated!";
                                notifytype = "success";
                        },
                        error: function(xhr, ajaxOptions, thrownError) {
                                notify = "\"" + xhr.status + " " + thrownError + "\" when updating " + post.gymnast;
                                notifytype = "error";
                        }
                });
} else if (action == "DELETE" ) {
                $.ajax({
                    'async': false,
                    type: "DELETE",
                    url: "/ES/" + competition + "/startList/" + post.id,
                    success: function(s){
                                notifytxt = "Gymnast " + post.gymnast + " deleted!";
                                notifytype = "success";
                    },
                        error: function(xhr, ajaxOptions, thrownError) {
                                notifytxt = "\"" + xhr.status + " " + thrownError + "\" when deleting " + post.gymnast;
                                notifytype = "error";
                        }

                });
}
if (notify) {
        $.mobility.notify(notifytxt,notifytype);
}

}
function draweditable(table,type) {
	var datalocal = [];
	for (var n = 0; n < data.length; n++) {
		data[n].checked = false;
		datalocal.push(JSON.parse('{"id":' + n + ', "values":' + JSON.stringify(data[n]) + '}'));
	}
				var metadata = [];
				metadata.push({ name: "number", label: "#*", datatype: "integer", editable: true});
				metadata.push({ name: "gymnast", label: "Gymnast*", datatype: "string", editable: true});
				metadata.push({ name: "id", label: "id", datatype: "string", editable: false});
				metadata.push({ name: "born", label: "Born", datatype: "string", editable: true});
				metadata.push({ name: "team", label: "Team*", datatype: "string", editable: true});
				metadata.push({ name: "class", label: "Class*", datatype: "string", editable: true});
				metadata.push({ name: "rules", label: "Rules", datatype: "string", editable: true});
				metadata.push({ name: "pool", label: "Pool*", datatype: "string", editable: true});
				metadata.push({ name: "about", label: "About", datatype: "textarea", editable: true});
				metadata.push({ name: "checked", label: "Check", datatype: "boolean", editable: true});
				editableGrid = new EditableGrid("DemoGridFull", {
	enableSort: true, 
	editmode: "absolute", // change this to "fixed" to test out editorzone, and to "static" to get the old-school mode
	pageSize: 1000
});
				editableGrid.load({"metadata": metadata, "data": datalocal});
				editableGrid.renderGrid(table, "table table-condensed table-fixed");

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
	if ((!$("#" + table + " :input[name='check_"+index+"']").prop('checked')) || (!$("#" + table + " :input[name='check_"+index+"']").prop('checked'))) {
	var app = table.split("_");    
	for (var i = 0; i < parts.length; i++) {
		$("#" + hidetable + " :input[name='"+parts[i]+"_"+number+"']").val("");
		$("#" + table + " :input[name='"+parts[i]+"_"+number+"']").val("");
		$("#" + hidetable + " :input[name='"+parts[i]+"_"+number+"_1']").val("");
		$("#" + table + " :input[name='"+parts[i]+"_"+number+"_1']").val("");
		$("#" + hidetable + " :input[name='"+parts[i]+"_"+number+"_2']").val("");
		$("#" + table + " :input[name='"+parts[i]+"_"+number+"_2']").val("");
       }
                $.ajax({
                    'async': false,
                    type: "DELETE",
                    url: "/ES/" + competition + "/" + app[0] +"/" + id,
                    success: function(s){
			$.mobility.notify(id + " deleted!","success");
                    }
                });

	} else {
		$("#" + table + " :input[name='check_"+index+"']").prop('checked', false);
		$("#" + hidetable + " :input[name='check_"+index+"']").prop('checked', false);
	}
}
//function draweditable(ESurl) {
//$.ajax({
//  url: ESurl,
//  'async': false,
//  error: function(){
//        $.mobility.notify("No competition or is database down??","error");
//  },
//  success: function(data_tmp){
//     data = [];
//     var data_pre = new Array();
//     for (var i = 0; i < data_tmp.hits.hits.length; i++) {
//        data.push(data_tmp.hits.hits[i]._source)
//     }
//  }
//});
//     	data = sortJSON(data,'number', '123');
//	data.shift();
//}

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
         	url: "/ES/" + competition + "/" + app[0] + "/_search",
         	success: function(s){
			for (var i = 0; i < s.hits.hits.length; i++) {
        			data_pre.push(s.hits.hits[i]._source)
     			}
         	},
         	error: function(xhr, ajaxOptions, thrownError) {
         	}
         });
     	data = sortJSON(data,'number', '123');
	//data.shift();
     	data = sortJSON(data,'pool', '123');
	for (var n = 0; n < data.length; n++) {
		for (var m = 0; m < data_pre.length; m++) {
			if ( data_pre[m].id == data[n].id) {
				if (app[0] == "vault" ){
				data[n].d_1 = data_pre[m].d_1;
                                data[n].e1_1 = data_pre[m].e1_1;
                                data[n].e2_1 = data_pre[m].e2_1;
                                data[n].e3_1 = data_pre[m].e3_1;
                                data[n].e4_1 = data_pre[m].e4_1;
                                data[n].base_1 = data_pre[m].base_1;
                                data[n].avgE_1 = data_pre[m].avgE_1;
                                data[n].e_1 = data_pre[m].e_1;
                                data[n].total_1 = data_pre[m].total_1;
				data[n].d_2 = data_pre[m].d_2;
                                data[n].e1_2 = data_pre[m].e1_2;
                                data[n].e2_2 = data_pre[m].e2_2;
                                data[n].e3_2 = data_pre[m].e3_2;
                                data[n].e4_2 = data_pre[m].e4_2;
                                data[n].base_2 = data_pre[m].base_2;
                                data[n].avgE_2 = data_pre[m].avgE_2;
                                data[n].e_2 = data_pre[m].e_2;
                                data[n].total_2 = data_pre[m].total_2;
				} else {
				data[n].d = data_pre[m].d;
				data[n].e1 = data_pre[m].e1;
				data[n].e2 = data_pre[m].e2;
				data[n].e3 = data_pre[m].e3;
				data[n].e4 = data_pre[m].e4;
				data[n].base = data_pre[m].base;
				data[n].avgE = data_pre[m].avgE;
				data[n].e = data_pre[m].e;
				}
				data[n].total = data_pre[m].total;
			}
		}
		if ( pool != data[n].pool ) {
			Options.push(data[n].pool);
		}
		if (isNumber(data[n].total)) {
			data[n].stored = '<label><span></span><span class="switch switch-6"><input onchange="clearscore(\'' + n + '\',\'' + data[n].number + '\',\'' + table + '\',\'' + data[n].id + '\');" type="checkbox" id="check_' + n + '" name="check_' + n + '" value="PH" checked="checked" /><span></span></span></label>';
		} else {
			data[n].stored = '<label><span></span><span class="switch switch-6"><input onchange="clearscore(\'' + n + '\',\'' + data[n].number + '\',\'' + table + '\',\'' + data[n].id + '\');" type="checkbox" id="check_' + n + '" name="check_' + n + '" value="PH" /><span></span></span></label>';
		}
		if (app[0] == "vault" ){
		data[n].pen = inputregD(n,"pen",data[n].number,data[n].pen_1,data[n].pen_2,table);
                data[n].d = inputregD(n,"d",data[n].number,data[n].d_1,data[n].d_2,table);
                data[n].e1 = inputregD(n,"e1",data[n].number,data[n].e1_1,data[n].e1_2,table);
                data[n].e2 = inputregD(n,"e2",data[n].number,data[n].e2_1,data[n].e2_2,table);
                data[n].e3 = inputregD(n,"e3",data[n].number,data[n].e3_1,data[n].e3_2,table);
                data[n].e4 = inputregD(n,"e4",data[n].number,data[n].e4_1,data[n].e4_2,table);
                data[n].base = inputregD(n,"base",data[n].number,data[n].base_1,data[n].base_2,table);
                data[n].avgE = inputregD(n,"avgE",data[n].number,data[n].avgE_1,data[n].avgE_2,table);
                data[n].e = inputregD(n,"e",data[n].number,data[n].e_1,data[n].e_2,table);
		data[n].total = inputregD(n,"total",data[n].number,data[n].total_1,data[n].total_2,table);
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
		data[n].total = inputreg(n,"total",data[n].number,data[n].total,table);
		}
		pool = data[n].pool;
	}
       var $el = $("#" + table + "-search-pool");
       $('#' + table + '-search-pool option:gt(0)').remove();
     } else {
	if (app[0] == "allaround") {
     		data = sortJSON(data,'number', '321');
		//data.pop();
     		data = sortJSON(data,'id', '123');
		for (var m = 0; m < data.length; m++) {
			data[m]["total"]=0;
		}
		for (var n = 0; n < apps.length; n++) {
		         $.ajax({
                		'async': false,
                		url: "/ES/" + competition + "/" + apps[n] + "/_search",
                		success: function(s){
                        		for (var i = 0; i < s.hits.hits.length; i++) {
						for (var m = 0; m < data.length; m++) {
							if (data[m].id == s.hits.hits[i]._source.id) {
								data[m][apps[n]]=s.hits.hits[i]._source.total;
								data[m]["total"]=parseFloat((parseFloat(data[m]["total"]) + parseFloat(data[m][apps[n]])).toFixed(2));
							}
						}
                        		}
                		},
                		error: function(xhr, ajaxOptions, thrownError) {
                		}
         		});
		}
		console.log(data);
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
	if (app[0] == "vault" ){				
		for (var i = 0; i < parts.length; i++) {
			if ( parts[i] == "total" ) {
				data[n][parts[i]] = data[n][parts[i]+"_1"] + "<br>" + data[n][parts[i]+"_2"] + "<br><b>" + data[n][parts[i]] + "</b>";
			} else {
				data[n][parts[i]] = data[n][parts[i]+"_1"] + "<br>" + data[n][parts[i]+"_2"] ;
			} 
		}
	} else {
		data[n].total =  data[n].total ;
	}
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
     if (type == "edit") {
     (function() {
      draweditable(table,type);
  })();
	} else {
     (function() {
      drawdynatable(table,type);
  })();
	}
  }
});
}
function changecompetition(id) {
	createCookie("competition", id,"30");
	competition = id;
	$.ajax({
                'async': false,
                url: "/ES/global/competition/" + id,
                error: function(){
                        $.mobility.notify("No competitions or is database down??","error");
                },
                success: function(s){
//		$( "div.compname" ).replaceWith('<div class="compname">' + s._source.name + '</div>');
		if (s._source.css) {
		jQuery('<link />').attr({
			rel: 'stylesheet', 
			type: 'text/css',
			href: 'vendor/mobility/mobility-'+s._source.css+'.css' })
		.appendTo('head');
		} else {
		jQuery('<link />').attr({
                        rel: 'stylesheet',
                        type: 'text/css',
                        href: 'vendor/mobility/mobility-default.css' })
                .appendTo('head');
		}
	}
         });
}

function initcompetition() {
       $.ajax({
                'async': false,
                url: "/ES/global/competition/_search",
                error: function(){
                        $.mobility.notify("No competitions or is database down??","error");
                },
                success: function(s){
                        var competitions = new Array();
                        for (var i = 0; i < s.hits.hits.length; i++) {
                                competitions.push(s.hits.hits[i]._source)
                        }
//                        competitions.reverse();
			competitions = sortJSON(competitions,'id', '123');
			competitions = sortJSON(competitions,'created', '123');
                        var $el = $("#select-competition");
                        $('#select-competition option').remove();
			selectedcompetition=readCookie("competition");
                        for (var i = 0; i < competitions.length; i++) {
				if ((selectedcompetition == competitions[i].id ) || ((!selectedcompetition) && ( i == competitions.length-1))) {
                                $el.append($("<option selected></option>")
                                .attr("value", competitions[i].id ).text(competitions[i].name));
				changecompetition(competitions[i].id);	
				} else {
                                $el.append($("<option></option>")
                                .attr("value", competitions[i].id ).text(competitions[i].name));
				}
                        }
			$('#select-competition').change( function(e) {
				var value = $(this).val();
        			changecompetition(value);
			});
                },
                error: function(xhr, ajaxOptions, thrownError) {
                }
         });
}
