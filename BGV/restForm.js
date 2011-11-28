BGV.holdMe.restForm=function(){
  var form;

  var process=function(e){
    e.preventDefault();
    var kv={};

    form.find(".field:enabled").each(
      function(i,t){
	var tag=$(t);
	var val=tag.val();

	if (typeof val=="string"){
	  val=val.trim();
	} else if (null==val){
	  val='';
	}else{
	  val=val.join("|");
	}

	kv[$(tag).attr('name')]=val;
      }
    );
//    console.log(kv);
    BGV.plugins.rest.start(kv);
  };

  var toggleFields=function(e){
    var tog = $(e.currentTarget);
    var fields = tog.parents("fieldset").find(".field");
    fields.attr("disabled", !tog.is(":checked"));
  };

  var initForm=function(data){
    $(BGV.e.source).append(data);
    form=$("form[name=rest]");

    var togs = form.find(".toggle");
    togs.bind("change", toggleFields);
    togs.trigger("change");

    form.find("[name=taxId]").html(BGV.taxa.optionTags(4932));

    $("optgroup").click(
      function(e){
	var o=$(e.currentTarget).find("option");
//	console.log(o, o.is(":selected"));

	if($(e.currentTarget.parentNode).is(':enabled')){
	  o.attr('selected','selected');
	}
      }
    );


    form.bind("submit",process);
  };

  this.load=function(){
    $.get("BGV/restForm.html",initForm);
  };

};
BGV.plugins.restForm=new BGV.holdMe.restForm();

