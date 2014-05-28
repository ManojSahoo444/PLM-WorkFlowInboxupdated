var itemID;
var abc;
itemID = "I";
var result = [];
var resultdata = [];
var actiontab = [];
var applyrule =[];
var fwduser = [];
var usrlist = [];
var usrdetail = [];
$(document).ready(function () {
    $("#noItems").css("display", "none");

    workItemHeader();
    buttons();
    dropdown(itemID);

}); 

function workItemHeader()  {
 var xml;
 var colPosArray = [1];
 $.ajax({
  url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_CM_FIELD_CATALOG/zplm_dm_field_catalogCollection?$filter=selname%20eq%27TASK_SEL%27%20and%20kind%20eq%27P%27%20and%20option%20eq%27EQ%27%20and%20sign%20eq%27I%27%20and%20low%20eq%274%27",
  type: 'GET',
  contentType: "application/xml; charset=utf-8",
  dataType: "",
  cache:"false",
  success: function (data) {
    $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
     	var colpos = $info.find('colpos').text();
        var header = $info.find('header').text();
        var obj = new Object();
            obj.colpos = colpos;
            obj.header = header;
            colPosArray.push(obj);
        });
       });
      colPosArray.sort(function(a, b) {
      return a.colpos === b.colpos ? 1 : (a.colpos < b.colpos ? 0 : 2);
      });
    var element = '<td style="background:#aac5dd;><input type=;width:20px "text" value="" />';
    for(var i=0;i<colPosArray.length-1;i++)
    {   
     element = element + '<td style="background:#aac5dd;">'+ colPosArray[i].header +'</td>';
    }
    $('#WorkItemsHeader').append(element);
    }, 
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    { createAlertMessage("Alert", "Error" ,"send6", "alert", "e");}
  });
}
//$('tr .checkboxes').each(function() {
//    if(this.checked) {
//        $(this).closest('tr').addClass('checkboxs');
//    }
//});

function buttons()  {
 var xml;
 $.ajax({
  url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_CM_ACTION_DEF/zplm_dm_action_defCollection?$filter=selname%20eq%27TASK_SEL%27%20and%20kind%20eq%27P%27%20and%20option%20eq%27EQ%27%20and%20sign%20eq%27I%27%20and%20low%20eq%274%27",
  type: 'GET',
  contentType: "application/xml; charset=utf-8",
  dataType: "",
  cache:"false",
  success: function (data) {
    $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
     	var actionid = $info.find('actionid').text();
            var obj =new Object();
                obj.actionid = actionid;
                actiontab.push(obj);
       $("<input>").attr("type", "button")
               .attr("name", "mydata").val("bla");
});
       });
         var element = '';
       for(var i = 0;i<actiontab.length;i++)
           {
               element = element +'<input type="button"  class="myclass" onclick=actionhandler'+actiontab[i].actionid+'(); id="'+actiontab[i].actionid+'" value="'+actiontab[i].actionid+'"/>';
                       
           }
           $('#dynamicbuttons').append(element);
//$('#dynamicbuttons').append($('<td id="btn'+actionid+'" class="myclass" ><input type="button" id="btn-'+actionid+'" name="mydata" style="background: #F9F06F"  value="'+ actionid +'"/></td>'));
//$("#actionid").html(actionid);
      }, 
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    { createAlertMessage("Alert", "Error" ,"send6", "alert", "e");}
  });
}
function DateDefine(date)
{
    date = date.split("-");
    date = date[1]+'/'+date[2]+'/'+date[0];
    return date;
}

function dropdown(itemID)  {
     
  $("#WorkItemdetails").empty();
 var xml;
 $.ajax({
  url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_CM_WI_INBOX/zplm_dm_wi_inboxCollection?$filter=selname%20eq%27TASK_SEL%27%20and%20low%20eq%27"+itemID+"%27",
  type: 'GET',
  contentType: "application/xml; charset=utf-8",
  dataType: "",
  cache:"false",
  success: function (data) {
    
    $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
        var WT_ID = $info.find("d\\:wi_id, wi_id").text();
        var Status = $info.find("d\\:wi_stat, wi_stat").text();
        var SentOn = $info.find("d\\:wi_cd, wi_cd").text();
        SentOn = SentOn.replace("T00:00:00","");
        var Priority = $info.find("d\\:prioritytext, prioritytext").text();
        var FwdBy = $info.find("d\\:wi_text, wi_text").text();
        var Wi_Rh_Task = $info.find("d\\:wi_rh_task, wi_rh_task").text();
        var wi_Prio = $info.find("d\\:wi_prio, wi_prio").text();
            var obj =  new Object();
                obj.WT_ID = WT_ID;
                obj.Status = Status;
                obj.SentOn = SentOn;
                obj.Priority = Priority;
                obj.FwdBy = FwdBy;
                obj.Wi_Rh_Task =Wi_Rh_Task;
                obj.wi_Prio = wi_Prio;
                resultdata.push(obj);
              
//        $('#WorkItemdetails').append('<tr ><td align="center"><input type="checkbox" class="case" name="case[]" value=" "/></td><td><u><b>' + WT_ID + '</b></u></a></td> <td>'+FwdBy+'</td><td>'+DateDefine(SentOn)+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Priority+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Status+","+Wi_Rh_Task+","+'</td><td></td></tr>');
//        $("input.case").click(myfunc);
      });
   });
      var element = '';
           for(var i =0;i<resultdata.length;i++)
               {
                   if(itemID === "I")
                                   {
                   element = element +'<tr id="item'+i+'"><td align="center"><input type="checkbox" class="case" name="case[]" value=""/></td><td id="row'+i+'> <a href="javascript:showGRPODetails()"><u><b>' + resultdata[i].WT_ID + '</td><td>'+ resultdata[i].FwdBy +'</td><td >'+DateDefine(resultdata[i].SentOn)+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Priority+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Status+'</td><td></td></tr>';
//                   $('#WorkItemdetails').append('<tr id="test' + ebeln + '" ><td align="center"><input type="checkbox" class="case" name="case[]" value=""/></td><td> <a href="javascript:showGRPODetails(chltd' + ebeln + ',' + i + ',' + ebeln + ',' + toggle + ')"><u><b>' + WT_ID + '</b></u></a></td><td>'+ FwdBy +'</td><td >'+DateDefine(SentOn)+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Status+","+Wi_Rh_Task+","+wi_Prio+'</td></tr>');
                                   }
                                    else 
                                       {
                                           element = element +'<tr id="item'+i+'" ><td align="center"></td><td id="row'+i+'" > <a href="javascript:showGRPODetails()"><u><b>' + resultdata[i].WT_ID + '</b></u></a></td><td>'+ resultdata[i].FwdBy +'</td><td >'+DateDefine(resultdata[i].SentOn)+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Priority+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Status+'</td><td></td></tr>';
                                       }
                }
               
                $('#WorkItemdetails').append(element);
                
                localStorage.setItem("resultdata",JSON.stringify(resultdata));
//    $("[id^=btn]").click(function()
//    {
//        alert(this.id);
//    });
               
 }, 
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    { createAlertMessage("Alert", "Error" ,"send6", "alert", "e");}
  });
  
    $("#DropdownValues").change(function() {
     itemID = $('#DropdownValues').val();
          $("#WorkItemdetails").empty();
          ChangeItem(itemID);
});
}

function ChangeItem(itemID)  {
    localStorage.setItem("ITEM",itemID);
    var resultdata = [];
  $("#WorkItemdetails").empty();
 var xml;
 $.ajax({
  url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_CM_WI_INBOX/zplm_dm_wi_inboxCollection?$filter=selname%20eq%27TASK_SEL%27%20and%20low%20eq%27"+itemID+"%27",
  type: 'GET',
  contentType: "application/xml; charset=utf-8",
  dataType: "",
  cache:"false",
  success: function (data) {
    $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
        var WT_ID = $info.find("d\\:wi_id, wi_id").text();
        var Status = $info.find("d\\:wi_stat, wi_stat").text();
        var SentOn = $info.find("d\\:wi_cd, wi_cd").text();
        SentOn = SentOn.replace("T00:00:00","");
        var Priority = $info.find("d\\:prioritytext, prioritytext").text();
        var FwdBy = $info.find("d\\:wi_text, wi_text").text();
        var Wi_Rh_Task = $info.find("d\\:wi_rh_task, wi_rh_task").text();
        var wi_Prio = $info.find("d\\:wi_prio, wi_prio").text();
            
            var obj =  new Object();
                obj.WT_ID = WT_ID;
                obj.Status = Status;
                obj.SentOn = SentOn;
                obj.Priority = Priority;
                obj.FwdBy = FwdBy;
                obj.Wi_Rh_Task =Wi_Rh_Task;
                obj.wi_Prio = wi_Prio;
                resultdata.push(obj);
                
        $("<input>").attr("type", "checkbox")
               .attr("name", "mydata").val("bla");
       
        
//       $("input.case").click(myfunc);
      });
   });
                var element = '';
                
                        for(var i =0;i<resultdata.length;i++)
                            {
                                   if(itemID === "I")
                                   {                         
                                       element = element +'<tr id="item'+i+'" ><td align="center"><input type="checkbox" class="case" name="case[]" value=""/></td><td id="row'+i+'" > <a href="javascript:showGRPODetails()"><u><b>' + resultdata[i].WT_ID + '</b></u></a></td><td>'+ resultdata[i].FwdBy +'</td><td >'+DateDefine(resultdata[i].SentOn)+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Priority+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Status+'</td><td></td></tr>';
             //                   $('#WorkItemdetails').append('<tr id="test' + ebeln + '" ><td align="center"><input type="checkbox" class="case" name="case[]" value=""/></td><td> <a href="javascript:showGRPODetails(chltd' + ebeln + ',' + i + ',' + ebeln + ',' + toggle + ')"><u><b>' + WT_ID + '</b></u></a></td><td>'+ FwdBy +'</td><td >'+DateDefine(SentOn)+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Status+","+Wi_Rh_Task+","+wi_Prio+'</td></tr>');
                                   }
                                   else 
                                       {
                                           element = element +'<tr id="item'+i+'" ><td align="center"></td><td id="row'+i+'" > <a href="javascript:showGRPODetails()"><u><b>' + resultdata[i].WT_ID + '</b></u></a></td><td>'+ resultdata[i].FwdBy +'</td><td >'+DateDefine(resultdata[i].SentOn)+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Priority+'</td><td>'+DateDefine(resultdata[i].SentOn)+'</td><td>'+resultdata[i].Status+'</td><td></td></tr>';
                                       }
                            }
                    
          $('#WorkItemdetails').append(element);
               
 }, 
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    { createAlertMessage("Alert", "Error" ,"send6", "alert", "e");}
  });
}

//function myfunc() {
// var values = new Array();
//       $.each($("input[name='case[]']:checked").closest("td").siblings("td"),
//              function () {
//                   values.push($(this).text());
//              });
//              
//             abc =  values.join (",");
//   
// }
// $(document).on('click','.myclass', function() {
////     alert($(this).attr('id'));
////alert(abc);
//        OData.request({
//   requestUri: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_ACT_HANDLER_SRV/PlmActions",
//   method: "GET",
//   headers: {
//    "X-Requested-With": "XMLHttpRequest",
//    "Content-Type": "application/atom+xml",
//    "DataServiceVersion": "2.0",
//    "X-CSRF-Token": "Fetch",
//    "Authorization": "Basic QVNJTkdBTkFNQUxBOm1vYmlsZTAx"
//   }
// },
// function(data, response) {
//    var header_xcsrf_token = response.headers['x-csrf-token'];
//    var header_content_type = response.headers['Content-Type'];
//    response.data = response.body;
//    processPO(header_xcsrf_token);
//    },
//    function(err) {
//      alert("Read failed. \nError code " + err.response.statusCode + ". \n" + err.response.message);
//    });
//});

 function GenerateXML() {
 
     applyrule  =   JSON.parse(localStorage.getItem("applyrule"));
 result = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n\
<atom:entry xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\">\n\
<atom:content type=\"application/xml\">\n\
<m:properties>\n\
    <d:ItActionid>"+applyrule[0].btnvalue+"</d:ItActionid>\n\
    <d:WiConfirm>X</d:WiConfirm>\n\
    <d:WiId>"+applyrule[0].WT_ID+"</d:WiId>\n\
    <d:WiAagent>ASINGANAMALA</d:WiAagent>\n\
    <d:Tabix>1</d:Tabix>\n\
    <d:WiText>"+applyrule[0].FwdBy+"</d:WiText>\n\
    <d:WiStat>"+applyrule[0].Status+"</d:WiStat>\n\
    <d:Statustext>"+applyrule[0].Status+"</d:Statustext>\n\
    <d:TsSel>I</d:TsSel>\n\
    <d:Prioritytext>"+applyrule[0].Priority+"</d:Prioritytext>\n\
    <d:WiRhTask>"+applyrule[0].Wi_Rh_Task+"</d:WiRhTask>\n\
    <d:WiPrio>"+applyrule[0].wi_Prio+"</d:WiPrio>\n\
    <d:WiLang>E</d:WiLang>\n\
   </m:properties>\n\
</atom:content>\n\
</atom:entry>\n\
";
   
 createXML = result;
}

function PostProcessButton()
{ 
   $.ajax({
        url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_ACT_HANDLER_SRV/PlmActions",
        data: resultXml,
        type: 'POST',
        headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/atom+xml",
            "Accept": "application/atom+xml,application/atomsvc+xml,application/xml,application/json",
            "Authorization": "Basic QVNJTkdBTkFNQUxBOm1vYmlsZTAx"   
        },
        success: function (xhr,response,a,b,c) {
            $(xhr).find("content").each(function () {
            $(this).find("m\\:properties, properties").each(function () {
            var $info = $(this);
            Matdc = $info.find("d\\:Matdc, Matdc").text();
                });
            });
           createAlertMessage("Success", msg,"btnprocess","processedPO","e");
        },
        error: function (xhr, ajaxOptions, thrownError) {
        $('#section-loaderconf').hide();
         var a =  xhr.responseText;
         var b = $(a).find("message");
         var c = $(b[0]).text();
        createAlertMessage("Error", c,"btnprocess","alert","e");
        }
    });
}

function processPO(token){
    GenerateXML();
    var resultXml = createXML;
    $.ajax({
     url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_ACT_HANDLER_SRV/PlmActions",
     data: resultXml,
     type: 'POST',
     headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/atom+xml",
            "Accept": "application/atom+xml,application/atomsvc+xml,application/xml,application/json",
            "Authorization": "Basic QVNJTkdBTkFNQUxBOm1vYmlsZTAx"
        },
        success:function(data,response){
            
            var message;
            message = "workitem Action Handled Successfully";
            createAlertMessage("Alert", message, "alert", "e");    
       },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        createAlertMessage("Error", "Please try again","alert","e");
        }
    });
}

createAlertMessage = function(header, message, type, e)
{
     $(".model-screen").css("display", "block");
    $("#header").text(header);
    $("#alertMessage").text(message);
    if (message.length > 40) {
        $(".model-container").height("118px");
    } else {
        $(".model-container").removeAttr('style');
    }
    if (type === "alert") {
        $("#ok").val('OK');
        $("#cancelAlert").css("display", "none");
        $("#ok").click(function() {
               location.href = "http://50.194.79.188:8080/PLM-1.0/Inbox.html";

           // $(".model-screen").css("display", "none");

        });

    }
}
function actionhandlerEXECUTE()
{
    var a ;
    var b;
    var c;
    var rownum;
    var btnvalue;
    var dataarray = [];
    btnvalue =     $("#EXECUTE").val();
    resultdata  =   JSON.parse(localStorage.getItem("resultdata"));
    a =    $("input[name='case[]']:checked").closest("td").siblings(":first");
   b = a.attr('id');
   c = b.split('>');
   rownum = c[0];
  dataarray = resultdata[rownum.replace("row","")];
    var obj = new Object();
    obj.btnvalue =  btnvalue;
    obj.FwdBy = dataarray.FwdBy;
    obj.Priority = dataarray.Priority;
    obj.SentOn = dataarray.SentOn;
    obj.Status = dataarray.Status;
    obj.WT_ID = dataarray.WT_ID;
    obj.Wi_Rh_Task = dataarray.Wi_Rh_Task;
    obj.wi_Prio = dataarray.wi_Prio;
    obj.tabix = rownum.replace("row","");
    applyrule.push(obj);
    localStorage.setItem("applyrule",JSON.stringify(applyrule));
    applyData();
}
function actionhandlerCOMPLETE()
{
 var a ;
 var b;
 var c;
 var btnvalue;
 var dataarray = [];
 btnvalue = $("#COMPLETE").val();
   resultdata  =   JSON.parse(localStorage.getItem("resultdata"));
   a =    $("input[name='case[]']:checked").closest("td").siblings(":first");
     b = a.attr('id');
   c = b.split('>');
   rownum = c[0];
 dataarray =   resultdata[rownum.replace("row","")];
   var obj = new Object();
    obj.btnvalue =  btnvalue;
    obj.FwdBy = dataarray.FwdBy;
    obj.Priority = dataarray.Priority;
    obj.SentOn = dataarray.SentOn;
    obj.Status = dataarray.Status;
    obj.WT_ID = dataarray.WT_ID;
    obj.Wi_Rh_Task = dataarray.Wi_Rh_Task;
    obj.wi_Prio = dataarray.wi_Prio;
    obj.tabix = rownum.replace("row","");
    applyrule.push(obj);
    localStorage.setItem("applyrule",JSON.stringify(applyrule));
    applyData();
  
}

function applyData() {
 
    OData.request({
   requestUri: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_ACT_HANDLER_SRV/PlmActions",
   method: "GET",
   headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/atom+xml",
    "DataServiceVersion": "2.0",
    "X-CSRF-Token": "Fetch",
    "Authorization": "Basic QVNJTkdBTkFNQUxBOm1vYmlsZTAx"
   }
 },
 function(data, response) {
    var header_xcsrf_token = response.headers['x-csrf-token'];
    var header_content_type = response.headers['Content-Type'];
    response.data = response.body;
    processPO(header_xcsrf_token);
    },
    function(err) {
      alert("Read failed. \nError code " + err.response.statusCode + ". \n" + err.response.message);
    });
}
function actionhandlerREFRESH()
{
 ChangeItem(localStorage.getItem("ITEM"));   
}

function actionhandlerFORWARD()
{
 var a ;
 var b;
 var c;
 var btnvalue;
 var dataarray = [];
 btnvalue = $("#FORWARD").val();
   resultdata  =   JSON.parse(localStorage.getItem("resultdata"));
   a =    $("input[name='case[]']:checked").closest("td").siblings(":first");
     b = a.attr('id');
   c = b.split('>');
   rownum = c[0]; 
    dataarray = resultdata[rownum.replace("row","")];
    createPopup("Enter Username", "", "alert", "e", dataarray); 
    
//    var obj = new Object();
//    obj.WT_ID = dataarray.WT_ID;
//    obj.CUR_USER = 'ASINGANAMALA';
//    obj.NEW_USER = localStorage.getItem("usrval");
//    fwduser.push(obj);
//    localStorage.setItem("fwduser",JSON.stringify(fwduser));
//    applyForward();
}
function applyForward()
{
    JSON.parse(localStorage.getItem("fwduser"));
    $.ajax({
     url: "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZPLM_CM_WI_FORWARD/zplm_wi_forwardCollection?$filter=wi_id eq'"+fwduser[0].WT_ID+"' and cur_user eq'"+fwduser[0].CUR_USER+"' and new_user eq'"+fwduser[0].NEW_USER+"'",
     type: 'GET',
     contentType: "application/xml; charset=utf-8",
     dataType: "",
     cache:"false",
        success:function(data){
            $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
        var line = $info.find("d\\:line, line").text();
         
        createAlertMessage("Alert", line, "alert", "e");  
//        $('#WorkItemdetails').append('<tr ><td align="center"><input type="checkbox" class="case" name="case[]" value=" "/></td><td><u><b>' + WT_ID + '</b></u></a></td> <td>'+FwdBy+'</td><td>'+DateDefine(SentOn)+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Priority+'</td><td>'+DateDefine(SentOn)+'</td><td>'+Status+","+Wi_Rh_Task+","+'</td><td></td></tr>');
//        $("input.case").click(myfunc);
      });
   });
            
       
       },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
//        createAlertMessage("Error", "Please try again","alert","e");
        }
    });
    
}
function createPopup(header, message, type, e , dataarray)
{
 $(".model-screen").css("display", "block");
    $("#header").text(header);
//    $("#alertMessage").hide();
    $("#alertMessage").append("<input type=text id='usrval' class='ui-autocomplete-input' style='height : 30px' overflow:; autocomplete='off' />");
    if (message.length > 40) {
        $(".model-container").height("118px");
    } else {
        $(".model-container").removeAttr('style');
    }
        
    if (type === "alert") {
        CallUserData();
     
      $("#usrval").unbind("keyup");
    $("#usrval").keyup(function() {
        usrdetail     =   JSON.parse(localStorage.getItem("usrdata"));
        $("#usrval").autocomplete({
            source: usrdetail,
            minLength: 1
        });
         $("#usrval").autocomplete("search");
         $(".ui-autocomplete").css("max-height", $(window).innerHeight() - $("#usrval").offset().top - 150);
         });
        $("#ok").val('OK');
//        $("#cancelAlert").css("display", "none");
        $("#ok").click(function() {
               var usrval = $("#usrval").val();
//                localStorage.setItem("usrval",usrval);
            $(".model-screen").css("display", "none");
            var obj = new Object();
        obj.WT_ID = dataarray.WT_ID;
        obj.CUR_USER = 'ASINGANAMALA';
        obj.NEW_USER = usrval;
    fwduser.push(obj);
    localStorage.setItem("fwduser",JSON.stringify(fwduser));
    applyForward();

        });
        $("#cancelAlert").click(function() 
            {
                $("#alertMessage").empty();
                $(".model-screen").css("display", "none");
            });

    }
}

function CallUserData()
{
var url = "http://50.194.79.188:8080/sap/gyan/opu/odata/sap/ZUSR_CM_SMART_SEARCH/zusr_smart_searchCollection?$filter=i_search%20eq%27U%27";
$.ajax({
  url: url,
  type: 'GET',
  contentType: "application/xml; charset=utf-8",
  dataType: "",
  cache:"false",
  success: function (data) {
    $(data).find("content").each(function () {  
      $(this).find("properties").each(function(){
    	var $info = $(this);
     	var bname = $info.find("d\\:bname, bname").text();
        var nametxt = $info.find("d\\:name_text, name_text").text();
            var obj =new Object();
                obj.bname = bname;
                obj.nametxt = nametxt;
                
                usrlist.push(obj.nametxt + " (" + obj.bname + ")");
    });
     
       });
      localStorage.setItem("usrdata",JSON.stringify(usrlist));
      }, 
    error: function (XMLHttpRequest, textStatus, errorThrown) 
    { createAlertMessage("Alert", "Error" ,"send6", "alert", "e");}
  });
}
function Reset() 
{
   conHeight = $('.content-area').outerHeight() - $('.content-container').height();
   hdrHeight = $('.main-header').outerHeight() + $('.info-bar').outerHeight();
   $('.content-container').height($(window).height() - (hdrHeight + conHeight));
   $('.content-container').css("min-height", $(window).height() - (hdrHeight + conHeight));
    if (navigator.userAgent.match("iPad")) {
        $('.content-container').css("min-height", 568);
        $('.wrapper').css("max-width", 1024);
    }
};